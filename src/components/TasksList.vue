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
                    <tr>
                        <th></th>
                        <th>title</th>
                        <th>client</th>
                        <th>progress</th>
                        <th>status</th>
                    </tr>
                    <tr class="tr" v-for="(task,index) of tasksList" :key="index">
                        <td class="dots">
                            <router-link :to='{name:"edit_task", state: {taskId: task.taskId}}'>
                                <img src="../assets/icons/dots-icon.png" alt="" class="dots">
                            </router-link>
                        </td>
                        <td>{{task.taskTitle}}</td>
                        <td>{{task.taskClient}}</td>
                        <td>
                            <tasks-progress />
                        </td>
                        <td>{{task.taskStatus}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
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
    components: { TasksProgress }
}
</script>

<style scoped>
    .tr:hover .dots img {
        display: inline !important;
    }
</style>