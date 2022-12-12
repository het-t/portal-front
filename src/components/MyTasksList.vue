<template>
    <div>
        <table-main>

            <template #thead>
                <tr class="table-heading">
                    <th>
                        task
                        <table-sort class="inline" :key="i" @clicked="j=!j; k=!k; p=!p;" sortBy="title" sortType="string" storeName="tasks"></table-sort>
                    </th>
                    <th>
                        description
                        <table-sort class="inline" :key="j" @clicked="i=!i; k=!k; p=!p;" sortBy="description" sortType="string" storeName="tasks"></table-sort>
                    </th>
                    <th>
                        deadline
                    </th>
                    <th>status</th>
                    <div></div>
                </tr>
            </template>

            <template #tbody>
                <tr class="tr" v-for="(task, index) in myTasksList" :key="index">
                    <td>
                        {{task.title}}
                    </td>
                    <td>{{task.description}}</td>
                    <td>
                        {{task.deadline}}
                    </td>
                    <td>
                        <select @change="changeStatus(task.taskId, task.id, task.statusId, task.description)" v-model="task.statusId" name="" id="">
                            <option v-for="status in subTaskStatuses" :value="status.id" :key="status.id">{{status.status}}</option>
                        </select>
                    </td>
                </tr>  
            </template>

                <table-pagination :key="p"
                    @tableData="myTasksList = $event"
                    tableName="myTasks"
                ></table-pagination>

        </table-main>
    </div>
</template>

<script>
import { myTasks } from '../api'
import useEditSwal from '../helpers/swalEdit'
import TableMain from './TableMain.vue'
import TablePagination from './TablePagination.vue'
import TableSort from './TableSort.vue'
// import TableSort from './TableSort.vue';
// import TableFilter from './TableFilter.vue';
export default {
    components: { TableMain, TablePagination, TableSort },
    name: "MyTasksList",
    data() {
        return {
            subTaskStatuses: [{id: 1, status: "hold"}, {id: 2, status: "to do"}, {id: 3, status: "in progress"}, {id: 4, status: "pending for approval"}, {id: 5, status: "done"}, {id: 6, status: "cancel"}, {id: 7, status: "pending with client"}, {id: 8, status: "pending with signed documents"}, {id: 9, status: "pending with DSC"}],
            myTasksList: [],

            i:0, j:0, k:0, p:0,
        }
    },
    methods: {
        changeStatus(taskId, subTaskId, statusId, subTask) {
            useEditSwal({
                text: subTask,
                mutationFnName: 'tasks/RESET_STATE',
                mutationArgs: {isMaster: false},
                promise: () => myTasks.changeStatus({taskId, subTaskId, statusId}),
                context: this
            })
        }
    }
}
</script>

<style scoped>
    .inline {
        display: inline;
    }
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