<template>
    <div>
        <TableMain :allowXOverflow="false" class="pb16">
            <template #thead>
                <tr class="table-heading">
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <input
                                    v-model="getFiltersFromStore.details"
                                    class="header p0"
                                    type="text"
                                    required
                                >
                                <span
                                    class="floating-label"
                                >
                                    Details
                                </span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort 
                                sortBy="amount" 
                                sortType="number" 
                                storeName="tasksPayments"
                                :key="sortingState.i"
                                @clicked="sortingState.j = !sortingState.j;"
                            ></table-sort>

                            <div class="floating-container">
                                <input
                                    v-model="getFiltersFromStore.amount"
                                    type="number"
                                    class="header p0"
                                    required
                                >
                                <span
                                    class="floating-label"
                                >
                                    Amount
                                </span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort
                                sortBy="receivedAt"
                                sortType="number"
                                storeName="tasksPayments"
                                :key="sortingState.j"
                                @clicked="sortingState.i = !sortingState.i;"
                            >
                            </table-sort>
                            <div class="floating-container">
                                <input 
                                    v-model="getFiltersFromStore.receivedAt"
                                    type="text"
                                    class="header p0"
                                    required
                                >
                                <span class="floating-label">
                                    Received At
                                </span>
                            </div>
                        </div>
                    </th>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(payment) in getPaymentsFromStore">
                    <TaskPaymentCreate
                        v-if="state.editingPaymentId === payment.id"
                        @refetchList="refetchPayments"
                        @changeVisibility="state.editingPaymentId = '', paymentState.visible = false"
                        :amount="paymentState.amount"
                        :receivedAt="paymentState.receivedAt"
                        :details="paymentState.details"
                        :id="state.editingPaymentId"
                        :taskId="props.taskId"
                        :key="payment.id"
                    ></TaskPaymentCreate>

                    <tr  
                        v-else
                        @click="
                            state.editingPaymentId = payment.id,
                            paymentState.amount = payment.amount,
                            paymentState.details = payment.details,
                            paymentState.receivedAt = payment.receivedAt !== null ? new Date(payment.receivedAt) : ''
                        "
                        :key="payment.id"
                        class="tr"
                        style="cursor: pointer;"
                    >
                        <td>
                            {{ payment.details }}
                        </td>

                        <td>
                            {{ payment.amount }}
                        </td>

                        <td>
                            {{ 
                                payment.receivedAt !== null ?
                                new Date(payment.receivedAt).toLocaleDateString() 
                                + " " 
                                + new Date(payment.receivedAt).toLocaleTimeString() 
                                :
                                "N/A"
                            }}
                        </td>

                        <td
                            @click.capture.stop="removePayment(payment.id)"
                            class="trash-icon"
                        >
                            <font-awesome-icon :icon="['fas', 'trash']"></font-awesome-icon>
                        </td>       
                    </tr>
                </template>

                <div 
                    v-if="paymentState.visible === false"
                    class="inline-add-button mt16" 
                    style="display: flex; gap: 16px;"
                    @click.prevent="paymentState.visible = true"
                >
                    <font-awesome-icon :icon="['fas', 'plus']"
                        style="scale: 1.25; color: #c2c2c2; margin-top: 2px;"
                    ></font-awesome-icon>

                    add new payment
                </div>

                <TaskPaymentCreate v-else-if="paymentState.visible === true"
                    :taskId="props.taskId"
                    @newPayment="paymentState.list.push($event)"
                    @changeVisibility="paymentState.visible = false"
                ></TaskPaymentCreate>
            </template>


            <table-pagination
                storeName="tasksPayments"
                :handleCounts=false
                :makeApiReq=state.editing
            ></table-pagination>
        </TableMain>
    </div>
</template>

<script setup>
import { reactive, onMounted, defineProps, computed, watch, inject } from "vue";
import { useStore } from "vuex";
import TableMain from "./TableMain.vue";
import TableSort from "./TableSort.vue";
import TablePagination from "./TablePagination.vue";
import TaskPaymentCreate from "./TaskPaymentCreate.vue";
import { tasks } from '@/api';

const props = defineProps({
    taskId: {
        type: Number,
        default: null
    },
    save: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([
    'save'
])

watch(
    () => props.save,
    (value) => {
        if (value === true) {
            emits('save', {
                payments: paymentState.list
            })
        }
    }
)

const state = reactive({
    editing: false,
    editingPaymentId: ''
})

const paymentState = reactive({
    visible: false,
    list: [],
    amount: '',
    details: '',
    receivedAt: '',
})

const sortingState = reactive({
    i: 0,
    j: 0,
})

const toast = inject('toast')
const store = useStore()

function removePayment(paymentId) {
    if (isNaN(props.taskId) === false) {
        tasks.deletePayment({ 
            taskId: props.taskId,
            paymentId: paymentId 
        })
        .then(() => {
            store.dispatch('tasksPayments/fetchList', {force: true})
            toast.success('Saved')
        })
        .catch(err => {
            toast.error('Oops')
            console.log(err)
        })
    }
    else {
        const index = paymentState.list.findIndex((payment) => {
            return payment.id === paymentId
        })
        paymentState.list.splice(index, 1)
    }
}

function refetchPayments() {
    store.dispatch('tasksPayments/fetchList', {force: true})
}

const getFiltersFromStore = computed(() => store.getters['tasksPayments/getFilters'])

const getPaymentsFromStore = computed(() => {
    if (state.editing === true) return store.getters['tasksPayments/getList']()
    else return paymentState.list
})

onMounted(() => {
    if (isNaN(props.taskId) === false && props.taskId) {
        state.editing = true
        store.commit('tasksPayments/setCurrentTaskId', props.taskId)
    }
})
</script>

<style scoped>
tr th:not(:nth-last-child(1)),
tr td:not(:nth-last-child(1), :nth-last-child(2)) {
    border-right: solid 1px #eeeeee;
}
.tr:hover .trash-icon,
.trash-icon:hover {
    visibility: visible;
}

.trash-icon {
    padding-right: 4px !important; 
    padding-left: 4px !important; 
    cursor: pointer;
    scale: 1.2;
    visibility: hidden;
}
.flex {
    display: flex;
}
.inline-add-button {
    padding: 8px 24px 8px 24px;
    background-color: #fff;
    cursor: pointer;
    text-transform: capitalize;
    border: solid 1px #e7eaec;
    position: absolute;
    margin-left: -16px;
}
.inline-add-button:hover {
    /* background-color: #dbdbdb; */
    border-color: #c2c2c2;
}
</style>