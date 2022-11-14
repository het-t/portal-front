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
                    <th>client</th>
                    <th>progress</th>
                    <th>status</th>
                </tr>
            </template>

            <template #tbody>
                <div v-for="(task, index) of tasksList" :key="task.taskId">
                    <tr class="tr">
                        <td class="flex">
                            <div class="dots">
                                <img @click="editTask('row'+index)" src="../assets/icons/dots-icon.png" alt="" class="dots">
                            </div>
                            {{task.title}}
                        </td>
                        <td>{{task.client}}</td>
                        <td>
                            <tasks-progress/>
                        </td>
                        <td>{{task.status}}</td>
                    </tr>

                    <tr class="tr tr-hidden hide mb16" :ref="'row'+index">
                        <tasks-create :taskId="task.id" displayHead='false' :uk="index" class="tasks-create" editing="true" />
                    </tr>
                </div>
            </template>
        </table-main>
    </div>
</template>

<script>
import TasksCreate from './TasksCreate.vue';
import TasksProgress from './TasksProgress.vue';
import TableMain from './TableMain.vue';
import { getTasks } from '@/api/index.js';
import TableActionPlus from './TableActionPlus.vue';

    export default {
    name: "TasksList",
    data() {
        return {
            tasksList: []
        };
    },
    created() {
        getTasks()
        .then(tasks => {
            this.tasksList = tasks.data
        })
    },
    methods: {
        editTask(rowIndex) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')
        }
    },
    components: { TasksProgress, TasksCreate, TableMain, TableActionPlus }
}
</script>

<style scoped>
    .tr:hover .dots img {
        display: inline !important;
    }
    .tr, .table-heading {
        padding: 0;
        display: grid;
        align-items: center;
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
        margin-bottom: 58px !important;
    }
</style>