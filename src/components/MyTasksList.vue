<template>
    <div>
        <table-main>
            <template #thead>
                <tr class="table-heading">
                    <th>
                        <div class="flex">
                            <table-sort :key="i" @clicked="j=!j; k=!k; l=!l;" sortType="string" sortBy="title" storeName="myTasks"></table-sort>

                            <div class="floating-container">
                                <input v-model="filters.name" ref="taskH" class="header p0" type="text" required>
                                <span @click="$refs['taskH'].focus()" class="floating-label">task</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort :key="l" @clicked="i=!i; j=!j; k=!k;" sortType="string" sortBy="client" storeName="myTasks"></table-sort>
                            
                            <div class="floating-container">
                                <input v-model="filters.client" ref="clientH" class="header p0" type="text" required>
                                <span @click="$refs['clientH'].focus()" class="floating-label">client</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort :key="j" @clicked="i=!i; k=!k; l=!l;" sortType="string" sortBy="desc" storeName="myTasks"></table-sort>

                            <div class="floating-container">
                                <input v-model="filters.description" ref="descH" class="header p0" type="text" required>
                                <span @click="$refs['descH'].focus()" class="floating-label">description</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort :key="k" @clicked="i=!i; j=!k; l=!l;" sortType="string" sortBy="deadline" storeName="myTasks"></table-sort>

                            <div class="floating-container">
                                <input v-model="filters.deadline" ref="deadlineH" class="header p0" type="text" required>
                                <span @click="$refs['deadlineH'].focus()" class="floating-label">deadline</span>
                            </div>
                        </div>              
                    </th>

                    <th>status</th>
                </tr>
            </template>

            <template #tbody>
                <tr class="tr" v-for="(task, index) in myTasksList" :key="index">
                    <td>
                        {{task.title}}
                    </td>
                    <td>
                        {{task.client }}
                    </td>
                    <td v-if="task.description != '_#_*&^'">{{task.description}}</td>
                    <td v-else></td>
                    <td>
                        {{task.deadline}}
                    </td>
                    <td>
                        <select @change="changeStatus(task.costSaved, task.taskId, task.id, task.statusId)" v-model="task.statusId" name="" id="">
                            <option v-for="status in subTaskStatuses" :value="status.id" :key="status.id">{{status.status}}</option>
                        </select>
                    </td>
                </tr>  
            </template>

                <table-pagination
                    storeName="myTasks"
                ></table-pagination>

        </table-main>
    </div>
</template>

<script>
import swal from 'sweetalert'
import { myTasks } from '../api'
import TableMain from './TableMain.vue'
import TablePagination from './TablePagination.vue'
import TableSort from './TableSort.vue'

export default {
    components: { TableMain, TablePagination, TableSort },
    name: "MyTasksList",
    data() {
        return {
            subTaskStatuses: [{id: 1, status: "hold"}, {id: 2, status: "to do"}, {id: 3, status: "in progress"}, {id: 4, status: "pending for approval"}, {id: 5, status: "done"}, {id: 6, status: "cancel"}, {id: 7, status: "pending with client"}, {id: 8, status: "signed documents awaited"}, {id: 9, status: "pending for DSC"}, {id: 10, status: 'reassigned'}, {id: 11, status: 'approved'}, {id: 12, status: "Pending before authority"}],

            i:0, j:0, k:0, l:0, p:0,

            polling: false
        }
    },
    computed: {
        myTasksList() {
            return this.$store.getters['myTasks/getList']()
        },
        filters() {
            return this.$store.getters['myTasks/getFilters']
        }
    },
    methods: {
        changeStatus(costSaved, taskId, subTaskId, statusId) {
            if (costSaved == 0 && statusId == 5) {

                swal({
                    text: "Provide the cost of sub-task before marking it done",
                    content: "input",
                    buttons: true
                })
                .then((cost) => {
                    if (!cost) throw null
                    return myTasks.changeStatus({taskId, subTaskId, statusId, cost, costSaved})
                })
                .then(() => {
                    this.$store.commit('tasks/flush', {taskId})
                    return this.$store.dispatch('myTasks/fetchList')
                })
                .then(() => {
                    return this.$store.dispatch('tasks/fetchList', {
                        force: true
                    })
                })
                .catch(err => console.log(err))
                .finally(() => {
                    this.$toast.success(`Saved`)
                    this.polling = true
                })
            }
            else {
                this.polling = false
                myTasks.changeStatus({taskId, subTaskId, statusId, costSaved})
                .then(() => {
                    this.$store.commit('tasks/flush', {taskId})
                    return this.$store.dispatch('myTasks/fetchList')
                })
                .then(() => {
                    return this.$store.dispatch('tasks/fetchList', {
                        force: true
                    })
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    this.$toast.success(`Saved`)
                    this.polling = true
                })
            }
        }
    },
    mounted() {
        var polling = (context) => {
            setTimeout(() => {
                this.$store.dispatch('myTasks/fetchList')
                if (context?.polling) polling(context)
            }, 600000) 
        }
        polling(this)
        this.polling = true
    }
}
</script>

<style scoped>
    .tr th:not(:nth-last-child(1)), 
    .tr td:not(:nth-last-child(1)), 
    .table-heading th:not(:nth-last-child(1)) {
        border-right: solid 1px #e7eaec !important;
    }
    .flex { 
        display: flex;
    }
    select {
        width: fit-content;
        border: none;
    }
    select, option {
        text-transform: capitalize;
        padding: 0;
    }
</style>