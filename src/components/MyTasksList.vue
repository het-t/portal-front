<template>
    <div>
        <div class="card">
            <div class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">my tasks</h5>
            </div>

            <TableFilter tableData="''" @filtered="''"  class="mr16 ml16 mt16 actions"/>

            <div class="mr16 ml16 mt16">
                <table>
                    <tr>
                        <th>
                            task
                        </th>
                        <th>description</th>
                        <th>deadline</th>
                        <th>status</th>
                    </tr>
                    <tr class="tr" v-for="(task, index) in myTaskList" :key="index">
                        <td>
                            {{task.title}}
                        </td>
                        <td>{{task.description}}</td>
                        <td>
                            {{task.deadline}}
                        </td>
                        <td>
                            <select v-model="task.statusId" name="" id="">
                                <option v-for="status in subTaskStatuses" :value="status.id" :key="status.id">{{status.status}}</option>
                            </select>
                        </td>
                    </tr>                
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { tasks } from '../api'
// import TableSort from './TableSort.vue';
// import TableFilter from './TableFilter.vue';
    export default {
    name: "MyTasksList",
    data() {
        return {
            subTaskStatuses: [{id: 1, status: "hold"}, {id: 2, status: "to do"}, {id: 3, status: "in progress"}, {id: 4, status: "pending for approval"}, {id: 5, status: "done"}, {id: 6, status: "cancel"}, {id: 7, status: "pending with client"}, {id: 8, status: "pending with signed documents"}, {id: 9, status: "pending with DSC"}],
            myTaskList: [{
                title: 'Incorporation of Company',
                task: 'Check Name of Company',
                deadline: 'none',
                status: '5',
            }, {
                title: 'Income Tax return',
                task: 'Collect Documents',
                deadline: 'none',
                status: '2'
            }]
        }
    },
    created() {
        tasks.getMyTasks()
        .then(response => {
            console.log(response.data.myTasksList)
            this.myTaskList = response.data.myTasksList
        })
    }
    // components: { TableSort, TableFilter }
}
</script>

<style scoped>
    select {
        width: fit-content;
        border: none;
        border-bottom: solid 1px #e7eaec;
    }
    select, option {
        text-transform: capitalize;
        padding-right: 0;
        padding-left: 0;
    }
</style>