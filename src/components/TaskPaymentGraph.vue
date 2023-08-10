<template>
  <div style="color: #676a6c;">
    <div style="width: 100%;">
      <Doughnut 
        :data="chartData" 
        :options="chartOptions"
      />
    </div>
    
    <div
      style="margin-top: 26px; text-align: center; font-size: 13px;"
    >
      <div>
        <span style="font-weight: 700;">
          Expected Total Payment:
        </span>
        {{ pending + received }}
      </div>
        
      <div>
        <span style="font-weight: 700;">
          Pending Payments:
        </span>
        {{ (pending * 100 / (pending + received)).toFixed(2) }}%

      </div>
    </div>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { tasks } from '../api'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'TaskPaymentGraph',
  props: {
    taskId: {
      type: Number
    }
  },
  data() {
    return {
      totalCost: 0,
      received: 0,
      pending: 0,
      expectedRevenue: 0
    }
  },
  components: { Doughnut },
  computed: {
    chartData() { 
      return  {
        labels: ['Total Cost', 'Received', 'Pending', 'Expected Revenue'],
        datasets: [
          {
            backgroundColor: ['#3498db', '#2ecc71', '#e67e22', '#f1c40f'],
            data: [this.totalCost, this.received, this.pending, this.expectedRevenue]
          }
        ]
      }
    },
    chartOptions() { 
      return {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    tasks.getPaymentsGraph({
      taskId: this.$props.taskId
    })
    // .then((res) => {
      
    // })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>
  

<style scoped>

</style>
<!-- onMounted(() => {
    if (isNaN(props.taskId) === false && props.taskId) {
        state.editing = true
        store.commit('tasksPayments/setCurrentTaskId', props.taskId)
    }
}) -->
<!-- const props = defineProps({
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
    
    
    // const toast = inject('toast')
    const store = useStore() -->
    // function removePayment(paymentId) {
        //     if (isNaN(props.taskId) === false) {
            //         tasks.deletePayment({ 
                //             taskId: props.taskId,
                //             paymentId: paymentId 
                //         })
                //         .then(() => {
                    //             store.dispatch('tasksPayments/fetchList', {force: true})
                    //             toast.success('Saved')
                    //         })
                    //         .catch(err => {
                        //             toast.error('Oops')
                        //             console.log(err)
                        //         })
                        //     }
                        //     else {
                            //         const index = paymentState.list.findIndex((payment) => {
                                //             return payment.id === paymentId
                                //         })
                                //         paymentState.list.splice(index, 1)
                                //     }
                                // }