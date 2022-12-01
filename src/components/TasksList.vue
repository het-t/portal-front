<template>
    <div>
        <table-main>
            <template #table-heading>
                Tasks
            </template>

            <template #table-action>
                <table-action-plus url="/u/tasks/create-task" />
            </template>

            <template #thead>
                <tr class="table-heading">
                    <th>title</th>
                    <th>description</th>
                    <th>client</th>
                    <th>progress</th>
                    <th>status</th>
                    <div></div>
                </tr>
            </template>

            <template #tbody>
                <div v-for="(task, index) of tasksList" :key="task.id">
                    <tr class="tr edit-task-tr" @click.prevent="editTask('row'+index, task.id)">
                        <td>
                            {{task.title}}
                        </td>
                        <td>
                            {{task.description}}
                        </td>
                        <td>{{task.client}}</td>
                        <td>
                            <tasks-progress/>
                        </td>
                        <td>{{task.status}}</td>
                        <div class="dots">
                            <dots-img @dotsClicked.stop="editTask('row'+index, task.id)"/>
                        </div>
                    </tr>

                    <tr class="tr tr-hidden hide mb16" :ref="'row'+index">
                        <tasks-create 
                            :taskId="task.id" 
                            displayHead='false' 
                            :uk="index" 
                            class="tasks-create" 
                            editing="true" 
                        />
                    </tr>
                </div>
            </template>

            <template #pagination>
                <table-pagination @tableData="tasksList = $event"
                    tableName="tasks"
                />
            </template>
        </table-main>
    </div>
</template>

<script>
import TasksCreate from './TasksCreate.vue';
import TasksProgress from './TasksProgress.vue';
import TableMain from './TableMain.vue';
import TableActionPlus from './TableActionPlus.vue';
import DotsImg from './DotsImg.vue';
import TablePagination from './TablePagination.vue';
import { users, tasks, clients, tasksMaster } from '../api';

    export default {
    name: "TasksList",
    data() {
        return {
            tasksList: []
        };
    },
    methods: {
        editTask(rowIndex, taskId) {
            console.log("editing taskid", taskId)
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')

            if (this.$store.getters['tasks/subTasksData']?.(taskId) == undefined || this.$store.getters['tasks/subTasksData']?.(taskId) == '') {
                tasks.getSubTasks({taskId})
                .then((subTasks) => {
                    this.$store.commit('tasks/subTasksDataSet', {
                        taskId, 
                        data: subTasks.data.subTasksList
                    })
                })
            }

            if (Object.keys(this.$store.getters['users/allUsers']).length == 0) {
                users.get({
                    from: null,
                    recordsPerPage: null,
                })
                .then((res) => {
                    this.$store.commit('users/usersAll', res?.data?.usersList)
                })
            }

            if (Object.keys(this.$store.getters['clients/allClients']).length == 0) {
                clients.get({
                    from: null,
                    recordsPerPage: null,
                })
                .then((res) => {
                    this.$store.commit('clients/clientsAll', res?.data?.clientsList)
                })
            }

            if (Object.keys(this.$store.getters['tasks/tasksMasterListGet']).length == 0) {
                tasksMaster.get()
                .then((res) => {
                    this.$store.commit('tasks/tasksMasterListSet', res?.data?.tasksMasterList)
                })
            }

            if (this.$store.getters['tasks/taskData']?.(taskId) == undefined || this.$store.getters['tasks/taskData']?.(taskId) == '') {
                tasks.getData({taskId})
                .then((res) => {
                    this.$store.commit('tasks/tasksDataSet',{
                        taskId: taskId,
                        taskData: res?.data?.taskData
                    })
                })
            }
        }
    },
    components: { TasksProgress, TasksCreate, TableMain, TableActionPlus, DotsImg, TablePagination }
}
</script>

<style scoped>
    .tr:hover .dots img {
        visibility: visible !important;
    }
    .tr, .table-heading {
        padding: 0;
        display: grid;
        align-items: center;
        grid-template-columns: 2fr 2fr 1fr 1fr 1fr 8px;    
    }
    .tr-hidden {
        grid-template-columns: auto;
        grid-column: 1/-1;
    }
    .hide {
        display: none !important;
    }
    .flex {
        display: flex;
        column-gap: 12px;
    }
    .tr.tr-hidden {
        padding: 0;
        border-top: 0;
        margin-bottom: 58px !important;
    }
    .edit-task-tr {
        cursor: pointer;
    }
</style>