<template>
    <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li>
                        <font-awesome-icon class="menu-icons" :icon="['fas', 'trash']"></font-awesome-icon>
                    </li>
                </template>
            </dots-menu>
        </div>
        
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
                    <tr
                        class="tr edit-task-tr" 
                        @click.prevent="editTask('row'+index, task.id)"
                    >
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
                            <dots-img 
                                @openMenu="menu($event, {taskId: task.id, visibility: true})" 
                                @hideMenu="menu($event, {taskId: '', visibility: false})" 
                            />
                        </div>
                    </tr>

                    <tr class="tr tr-hidden hide mb16" :ref="'row'+index">
                        <tasks-create 
                            v-if="(allow[task.id] == true)"
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
import DotsMenu from './DotsMenu.vue'
import TablePagination from './TablePagination.vue';

export default {
    name: "TasksList",
    data() {
        return {
            allow: {},
            tasksList: [],
            menuVisibisility: '',
            selectedTask: ''
        };
    },
    methods: {
        menu(e, {taskId, visibility}) {
            this.menuVisibisility = visibility
            this.selectedTask = taskId
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        },
        editTask(rowIndex, taskId) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')

                //get taskData and subTask to edit if not available in store
                //and after getting data render corresponding taskcreate component
                Promise.all([
                    this.$store.dispatch('tasks/tasksDataSet', {taskId}),
                    this.$store.dispatch('tasks/subTasksDataSet', {taskId})
                ])
                .then(() => {
                    console.log("allowed")
                    this.allow[taskId] = true
                })


            //get subTasks of task to edit if not available in store
        }
    },
    components: { DotsMenu, TasksProgress, TasksCreate, TableMain, TableActionPlus, DotsImg, TablePagination }
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
        grid-template-columns: 2fr 2fr 1fr 1fr 1fr 40px;    
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
    .edit-task-tr {
        cursor: pointer;
    }
</style>