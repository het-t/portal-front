<script setup>
import VueMultiselect from 'vue-multiselect';
import { computed, inject, nextTick, onMounted, reactive, ref } from "vue";
import { tasks } from '../api';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import store from '@/store';

const props = defineProps({
    taskId: {
        type: Number
    },
    type: {
        type: String
    },
    paymentId: {
        type: Number
    },
    title: {
        type: String
    },
    comments: {
        type: String
    },
    receivedAt: {
        type: String
    },
    amount: {
        type: String
    },
    subTaskId: {
        type: Number
    }
})

const paymentAmountRef = ref(null)
const paymentTitleRef = ref(null)
const paymentCommentRef = ref(null)

const emit = defineEmits([
    'canceled',
    'done'
])

const toast = inject('toast')

const state = reactive({
    type: '',
    title: '',
    amount: '',
    receivedAt: '',
    showTypes: false,
    subTaskId: ''
})

const getSubTasksIds = computed(() => {
    return store.getters['tasks/getSubTasks'](props.taskId)
    ?.map((st) => st.id)
})

onMounted(() => {
    nextTick(() => {
        paymentAmountRef.value.focus()
        state.paymentId = props.paymentId
        state.type = props.type
        state.title = props.title
        state.amount = props.amount
        state.receivedAt = (props.receivedAt !== null ? new Date(props.receivedAt) : null)
    })
})

function editPayment() {
    let amount = paymentAmountRef.value.innerText
    const title = paymentTitleRef.value.innerText?.toLowerCase()
    const comments = paymentCommentRef.value.innerText?.toLowerCase()
    const receivedAt = new Date(state.receivedAt)?.toISOString()?.slice(0, 19)?.replace('T', ' ')
    let type= state.type?.toLowerCase()
    console.log(state.amount, props.type, type, amount)

    tasks.editPayment({
        taskId: props.taskId,
        subTaskId: state.subTaskId,
        paymentId: props.paymentId,
        type,
        title,
        comments,
        receivedAt,
        amount
    })
    .then(() => {
        if (type === props.type) {
            emit('done', {
                type,
                amount: amount-state.amount
            })
        }
        else {
            emit('done', {
                type: props.type,
                amount: props.amount * (-1)
            })
            emit('done', {
                type,
                amount
            })
        }
        store.commit('tasksPayments/editPayment', {
            taskId: props.taskId,
            data: {
                id: props.paymentId,
                amount,
                type,
                receivedAt,
                title,
                comments
            }
        })

        toast.success('Success')
    })
    .catch(err => {
        toast.error(`Oops! We can't perform this action right now`)
        console.log(err)
    })
}

function addPayment() {
    let amount = paymentAmountRef.value.innerText
    const title = paymentTitleRef.value.innerText?.toLowerCase()
    const comments = paymentCommentRef.value.innerText?.toLowerCase()
    const receivedAt = new Date(state.receivedAt)?.toISOString()?.slice(0, 19)?.replace('T', ' ')
    let type= state.type?.toLowerCase()

    tasks.addPayment({
        taskId: props.taskId,
        subTaskId: state.subTaskId,
        type,
        amount,
        title,
        comments,
        receivedAt
    })
    .then((res) => {
        emit('done', {
            type,
            amount
        })
        toast.success('Success')
        store.commit('tasksPayments/addPayment', {
            taskId: props.taskId,
            data: {
                id: res.data.createdPaymentId,
                type,
                amount,
                title,
                comments,
                receivedAt
            }
        })
    })
    .catch(err => {
        toast.error(`Oops! We can't perform this action right now`)
        console.log(err)
    })
}

function cancel() {
    state.title = ''
    state.amount = ''
    state.receivedAt = ''
    state.type = ''

    emit('canceled')
}
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 15px;">
        <div class="payment-list-ele">
            <div class="status" :class="state?.type?.toLowerCase()"></div>
                            
            <div contenteditable="true" class="amount" ref="paymentAmountRef">
                {{ state.amount }}
            </div>
        </div>

        <div contenteditable="true" class="title" style="margin-left: 13px;" ref="paymentTitleRef">
            {{ state.title }}
        </div>

        <div style="margin-left: 13px;">
            <div contenteditable="true" class="comment" ref="paymentCommentRef">
                {{ state.comment }}
            </div>
        </div>

        <div style="margin-left: 13px;">
            <vue-multiselect
                v-model="state.type"
                placeholder="Type"
                :options="['Cost', 'Pending', 'Received']"
                style="width: 150px !important;"
                :allowEmpty="false"
            ></vue-multiselect>
        </div>

        <div style="margin-left: 13px;" v-if="state.type?.toLowerCase() === 'cost'">
            <vue-multiselect 
                v-model="state.subTaskId"
                placeholder="Sub-Task"
                :options="getSubTasksIds"
                :custom-label="(subTaskId) => `#${subTaskId}`"
                style="width: 150px !important;"
                :allowEmpty="false"
            />
        </div>

        <div style="margin-left: 13px;">
            <date-picker 
                v-model:value="state.receivedAt"
                type="datetime"
                :show-second="false"
            />
        </div>

        <div style="margin-left: 13px;">
            <button 
                @click.stop="isNaN(props.paymentId) ? addPayment() : editPayment()"
                class="button green"
            >
                save
            </button>

            <button 
                @click="cancel"
                class="button neutral"
                style="margin-left: 6px;"
            >
                cancel
            </button>
        </div>
    </div>
</template>

<style scoped>
div[contenteditable="true"].amount:empty:after {
    content: "amount";
}
div[contenteditable="true"].title:empty:after {
    content: "title";
}
div[contenteditable="true"].comment:empty:after {
    content: "comment";
}
button {
    padding: 6px !important;
}
</style>