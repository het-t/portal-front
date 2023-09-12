<script setup>
import { computed, onMounted, reactive, defineProps, inject } from "vue";
import { tasks } from "../api/index.js";
import TaskPaymentCreate from "./TaskPaymentCreate.vue";
import TransitionNumber from './TransitionNumber.vue';
import { useStore } from "vuex";
import swal from "sweetalert";
import rightCheck from "@/helpers/RightCheck";

const toast = inject('toast')

const state = reactive({
    extendPaymentEle: '',
    received: 0,
    pending: 0,
    totalCost: 0,
    expectedRevenue: 0,
    createPayment: false,
    authorised: false
})

const store = useStore()

const payments = computed(() => {
    return store.getters['tasksPayments/getList'](props.taskId)
})

const props = defineProps({
    taskId: {
        type: Number
    }
})

onMounted(function () {
    store.dispatch('tasksPayments/fetchList', {
        taskId: props.taskId
    })

    state.authorised = rightCheck('see_pricing')

    tasks.getPaymentsGraph({
      taskId: props.taskId
    })
    .then((res) => {
        const {
        received,
        pending,
        totalCost,
        expectedRevenue
      } = res.data[0]

      state.received = received
      state.pending = pending
      state.totalCost = totalCost
      state.expectedRevenue = expectedRevenue
    })
})

function updateRevenue(value) {
    state.expectedRevenue = value
}
function updateReceived(value) {
    state.received = value
}
function updatePending(value) {
    state.pending = value
}
function updateCost(value) {
    state.totalCost = value
}
function upgradePaymentGraph(e, flag = 1) {
    state.createPayment = false

    e.amount = e.amount * flag

    if (e.type === 'cost') {
        updateCost(e.amount)
        updateRevenue(e.amount * -1)
    }
    else if (e.type === 'pending') {
        updatePending(e.amount)
    }
    else if (e.type === 'received') {
        updateReceived(e.amount)
        updateRevenue(e.amount)
    }
}

function editPayment(paymentId, amount, type) {
    state.editPayment = paymentId
    state.createPayment = false
    
    upgradePaymentGraph({
        type,
        amount
    })
}

function removePayment(paymentId, title, type, amount) {
    swal({
        icon: 'warning',
        title: 'Alert',
        text: `Do you really want to delete "${title}-(${amount})"`,
        buttons: true,
        dangerMode: true
    })
    .then(value => {
        if (value == null) throw null
        return tasks.deletePayment({
            taskId: props.taskId,
            paymentId
        })
    })
    .then(() => {
        upgradePaymentGraph({
            type,
            amount
        }, -1)

        store.commit('tasksPayments/removePayment', {
            taskId: props.taskId,
            paymentId
        })
    })
    .then(() => {
        toast.success('Success')
    })
    .catch(() => {
        toast.error(`Oops! We can't perform this action right now`)
    })
}
</script>

<template>
    <div
        class="payment-main"
    >
        <div
            style="display: flex; gap: 6px; flex-wrap: wrap; height: fit-content; padding: 0 13px;"
        >
            <div class="payment-card cost">
                <transition-number
                    :update-value="state.totalCost"
                />
                <span class="title">Cost</span>
            </div>

            <template v-if="state.authorised === true">
                <div class="payment-card pending">
                    <transition-number
                        :update-value="state.pending"
                    />
                    <span class="title">Pending</span>
                </div>

                <div class="payment-card received">
                    <transition-number
                        :update-value="state.received"
                    />
                    <span class="title">Received</span>
                </div>

                <div class="payment-card revenue">
                    <transition-number
                        :update-value="state.expectedRevenue"
                    />
                    <span class="title">Revenue</span>
                </div>
            </template>
        </div>

        <task-payment-create 
            v-if="state.createPayment === true"
            :task-id=props.taskId
            @canceled="state.createPayment = false"
            @done="upgradePaymentGraph"
            style="padding: 0 13px; margin-top: 26px; margin-bottom: 26px;"
        />

        <div v-else class="add-payment-btn" @click="state.createPayment = true">
            <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
        </div>

        <div style="padding: 0 13px; overflow-y: auto; overflow-x: none; display: flex; flex-direction: column; gap: 13px;">
            <div
                v-for="(payment, index) in payments"
                :key="index"
            >

            
                <div v-if="state.editPayment === payment.id">
                    <task-payment-create 
                        :task-id="props.taskId"
                        :payment-id="payment.id"
                        :amount="payment.amount"
                        :title="payment.title"
                        :comments="payment.comments"
                        :received-at="payment.receivedAt"
                        :type="payment.type"
                        :sub-task-id="payment.subTaskId"
                        @done="state.createPayment = false, state.editPayment = '', upgradePaymentGraph($event)"
                        @canceled="state.createPayment = false, state.editPayment = ''"
                    />
                </div>

                <div 
                    v-else-if="state.editPayment !== payment.id"
                    class="payment-list-ele"
                    @click.prevent="state.extendPaymentEle === payment.id ? state.extendPaymentEle = '' : state.extendPaymentEle = payment.id"
                >
                    <div class="status" :class="payment.type"></div>
                    
                    <span>
                        {{ payment.amount < 0 ? payment.amount * -1 : payment.amount }}
                    </span>

                    <span>
                        {{ payment.title }}
                    </span>

                    <span>#{{ payment.id }}</span>
                    
                    <font-awesome-icon 
                        @click.stop="editPayment(payment.id)"
                        class="remove" 
                        :icon="['fas', 'pencil']" 
                    />

                    <font-awesome-icon
                        @click.stop="removePayment(payment.id, payment.title, payment.type, payment.amount)"
                        class="remove" 
                        :icon="['fas', 'trash']" 
                    />
                </div>

                <div v-if="state.extendPaymentEle === payment.id" style="margin-bottom: 13px; margin-left: 14px;">
                    {{ payment.comments }}
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.payment-main {
    display: flex; 
    flex-direction: column; 
    padding: 13px 0; 
    overflow: auto; 
    overflow-x: hidden; 
    width: 100%; 
    color: #676a6c; 
    text-transform: capitalize;
    max-height: 500px;
}
.payment-main:hover .add-payment-btn {
    visibility: visible;
}
.payment-list-ele {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
}
.payment-list-ele .remove,
.payment-list-ele .edit {
    cursor: pointer;
    padding: 3px;
    border-radius: 3px;
    visibility: hidden;
}
.payment-list-ele:hover .remove,
.payment-list-ele:hover .edit {
    visibility: visible;
}
.payment-list-ele .remove:hover,
.payment-list-ele .edit:hover {
    background-color: rgba(74, 73, 72, 0.2);
}
.payment-list-ele .status {
    min-height: 8px;
    min-width: 8px;
    height: 8px;
    width: 8px;
    border-radius: 8px;
    background-color: red;
}
.payment-card .remove {
    flex-grow: 1;
    display: none;
    padding: 3px;
    border-radius: 3px;
    cursor: pointer;
}
.add-payment-btn {
    width: fit-content; 
    cursor: pointer; 
    border: solid 1px rgba(103, 106, 108, 0.5); 
    border-radius: 9px; 
    text-align: center; 
    vertical-align: center; 
    height: 18px;
    width: 18px;
    margin: 13px;
    visibility: hidden;
}
.add-payment-btn:hover {
    background-color: rgba(74, 73, 72, 0.2);
    color: #676a6c;
}


.payment-card {
    width: fit-content;
    display: flex;
    gap: 6px;
    flex-direction: column;
    justify-content: space-between;
    padding: 6px 8px;
    border: solid 1px #e0e0e0;
    border-radius: 6px;
    flex-grow: 1;
}
.payment-card.cost {
    border-left: solid 3px #3498db;
}
.payment-list-ele > .cost {
    background-color: #3498db;
}
.payment-card.pending {
    border-left: solid 3px rgba(230, 126, 34, 0.8);
}
.payment-list-ele > .pending {
    background-color: rgba(230, 126, 34, 0.8);
}
.payment-card.received {
    border-left: solid 3px #2ecc71;
}
.payment-list-ele > .received {
    background-color: #2ecc71;
}
.payment-card.revenue {
    border-left: solid 3px #f1c40f;
}
.payment-card .amount {
    font-size: 25px;
    color: rgba(103, 106, 108, 1);
}
.payment-card .received-at {
    margin-top: 6px;
}
.payment-card .received-at,
.payment-card .comments {
    display: none;
}
.payment-card:hover .received-at,
.payment-card:hover .comments {
    display: block;
}

.payment-card .remove:hover {
    background-color: rgba(74, 73, 72, 0.2);
}
</style>