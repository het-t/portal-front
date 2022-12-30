<template>
    <div>
        <table-main>

            <template #thead>
                <tr class="table-heading">
                    <th>
                        <div class="flex">
                            <table-sort :key="i" @clicked="j=!j; k=!k; l=!l; p=!p;" sortType="string" sortBy="title" storeName="myTasks"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="taskH" class="header p0" type="text" required>
                                <span @click="$refs['taskH'].focus()" class="floating-label">task</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort :key="l" @clicked="i=!i; j=!j; k=!k; p=!p;" sortType="string" sortBy="client" storeName="myTasks"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[2]" ref="clientH" class="header p0" type="text" required>
                                <span @click="$refs['clientH'].focus()" class="floating-label">client</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort :key="j" @clicked="i=!i; k=!k; l=!l; p=!p;" sortType="string" sortBy="desc" storeName="myTasks"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="descH" class="header p0" type="text" required>
                                <span @click="$refs['descH'].focus()" class="floating-label">description</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort :key="k" @clicked="i=!i; j=!k; l=!l; p=!p;" sortType="string" sortBy="deadline" storeName="myTasks"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[3]" ref="deadlineH" class="header p0" type="text" required>
                                <span @click="$refs['deadlineH'].focus()" class="floating-label">deadline</span>
                            </div>
                        </div>              
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
                    <td>
                        {{task.client }}
                    </td>
                    <td>{{task.description}}</td>
                    <td>
                        {{task.deadline}}
                    </td>
                    <td>
                        <select @change="changeStatus(task.taskId, task.id, task.statusId, task.title)" v-model="task.statusId" name="" id="">
                            <option v-for="status in subTaskStatuses" :value="status.id" :key="status.id">{{status.status}}</option>
                        </select>
                    </td>
                </tr>  
            </template>

                <table-pagination :key="p"
                    :filters="filterFor"
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

export default {
    components: { TableMain, TablePagination, TableSort },
    name: "MyTasksList",
    data() {
        return {
            subTaskStatuses: [{id: 1, status: "hold"}, {id: 2, status: "to do"}, {id: 3, status: "in progress"}, {id: 4, status: "pending for approval"}, {id: 5, status: "done"}, {id: 6, status: "cancel"}, {id: 7, status: "pending with client"}, {id: 8, status: "pending with signed documents"}, {id: 9, status: "pending with DSC"}],
            myTasksList: [],

            i:0, j:0, k:0, l:0, p:0,

            filterFor: ['', '', '']
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
        },
        sort() {
            this.p = !this.p
        }
    }
}
</script>

<style scoped>
    .flex { 
        display: flex;
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