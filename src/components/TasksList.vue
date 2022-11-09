<template>
    <div>
        <div class="card">
            <div class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">Tasks</h5>
                <router-link to="/u/tasks/create-task" class="table-action">
                    create task
                </router-link>
            </div>

            <div class="mr16 ml16 mt16">
                <table>
                    <tr class="table-heading">
                        <th>title</th>
                        <th>client</th>
                        <th>progress</th>
                        <th>status</th>
                    </tr>

                    <div v-for="(task, index) of tasksList" :key="task.taskId">
                        <tr class="tr">
                            <td class="flex">
                                <div class="dots">
                                    <img @click="editTask('row'+index)" src="../assets/icons/dots-icon.png" alt="" class="dots">
                                </div>
                                {{task.taskTitle}}
                            </td>
                            <td>{{task.taskClient}}</td>
                            <td>
                                <tasks-progress/>
                            </td>
                            <td>{{task.taskStatus}}</td>
                        </tr>

                        <tr class="tr tr-hidden hide mb16" :ref="'row'+index">
                            <tasks-create :taskId="task.taskId" displayHead='false' :key="index" class="tasks-create"/>
                        </tr>
                    </div>

                </table>
            </div>
        </div>
    </div>
</template>

<script>
import TasksCreate from './TasksCreate.vue';
import TasksProgress from './TasksProgress.vue';
    export default {
    name: "TasksList",
    data() {
        return {
            tasksList: []
        };
    },
    created() {
        this.tasksList = [{
                taskId: 1,
                taskTitle: "Incorporation of Company",
                taskClient: "TechAvidus",
                taskStatus: "pending"
            }, {
                taskId: 2,
                taskTitle: "Income Tax return",
                taskClient: "TechSome",
                taskStatus: "done"
            }];
    },
    methods: {
        editTask(rowIndex) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')
        }
    },
    components: { TasksProgress, TasksCreate }
}
</script>

<style scoped>
    .tr:hover .dots img {
        display: inline !important;
    }
    .tr, .table-heading {
        padding: 0;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;    
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
    }
</style>