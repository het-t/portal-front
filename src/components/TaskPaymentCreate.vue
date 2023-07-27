<template>
    <tr class="tr">
        <td style="padding: 0 8px 0 8px;">
            <input v-model="state.details" style="width: 100%;" type="text" name="" id="" placeholder="Details">
        </td>

        <td>
            <input v-model="state.amount" type="number" name="" id="" placeholder="Amount">
        </td>

        <td>
            <date-picker
                v-model:value="state.receivedAt"
                type="datetime"
                :show-second="false"
            ></date-picker>
        </td>
    </tr>

    <div style="display: flex; gap: 8px;" class="mb8 ml8">
        <button class="green button" @click.prevent="savePayment">Save</button>
        <button class="neutral button" @click="cancel">Cancel</button>
    </div>

</template>

<script setup>
import DatePicker from 'vue-datepicker-next';
import { defineProps, defineEmits, onMounted, reactive, inject } from 'vue';
import { tasks } from '@/api';
import 'vue-datepicker-next/index.css';

const emits = defineEmits(['changeVisibility', 'newPayment', 'refetchList'])

const state = reactive({
    details: '',
    amount: '',
    receivedAt: new Date()
})

const props = defineProps({
    taskId: Number,
    id: {
        type: Number,
        default: null
    },
    details: String,
    receivedAt: Date,
    amount: Number
})

const toast = inject('toast')

function savePayment() {
    if (isNaN(props.taskId) === false) {
        const paymentData = {
            details: state.details,
            amount: state.amount,
            receivedAt: state.receivedAt
        }

        if (paymentData?.receivedAt?.toString() === "Invalid Date" || paymentData?.receivedAt === null) paymentData.receivedAt = null 
        else paymentData.receivedAt = new Date(paymentData.receivedAt).toISOString().slice(0, 19).replace('T', ' ')

        if (props.id !== null && isNaN(props.id) === false) {
            paymentData.paymentId = props.id
            paymentData.taskId = props.taskId

            tasks.editPayment(paymentData)
            .then(() => {
                emits('changeVisibility', false)
                toast.success('Saved')
            })
            .catch(() => {
                toast.error('Error')
            })
            .finally(() => {
                emits('refetchList')
            })
        }
        else if (props.id === null) {
            const payments = []
            payments[0] = paymentData

            tasks.createPayment({
                taskId: props.taskId,
                payments
            })
            .then(() => {
                emits('changeVisibility', false)
                toast.success('Saved')
            })
            .catch(() => {
                toast.error('Error')
            })
            .finally(() => {
                emits('refetchList')
            })        
        }
    }
    else {
        emits('newPayment', {
            id: (new Date()) * (-1),
            details: state.details,
            amount: state.amount,
            receivedAt: state.receivedAt
        })
        emits('changeVisibility', false)
    }
}

function cancel() {
    emits("changeVisibility", false)
}

onMounted(() => {
    state.amount = props.amount
    state.details = props.details
    state.receivedAt = new Date(props.receivedAt)
})

</script>

<style scoped>
tr td:not(:nth-last-child(1)) {
    border-right: solid 1px #eeeeee;
}
</style>