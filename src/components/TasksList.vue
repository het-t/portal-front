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
                    <div></div>
                    <th>title</th>
                    <th>description</th>
                    <th>client</th>
                    <th>progress</th>
                    <th>status</th>
                </tr>
            </template>

            <template #tbody>
                <div v-for="(task, index) of tasksList" :key="task.taskId">
                    <tr class="tr edit-task-tr" @click="editTask('row'+index)">
                        <div class="dots">
                            <img @click="editTask('row'+index)" src="../assets/icons/dots-icon.png" alt="" class="dots-img">
                        </div>
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
import { tasks } from '@/api/index.js';
import TableActionPlus from './TableActionPlus.vue';

    export default {
    name: "TasksList",
    data() {
        return {
            tasksList: []
        };
    },
    created() {
        tasks.get()
        .then(res => {
            this.tasksList = res.data.tasksList
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
        visibility: visible !important;
    }
    .tr, .table-heading {
        padding: 0;
        display: grid;
        align-items: center;
        grid-template-columns: 8px 2fr 2fr 1fr 1fr 1fr;    
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