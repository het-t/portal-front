<template>
    <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li title="change status to billed">
                        <font-awesome-icon
                        @click="changeTaskStatus(3)"
                            class="menu-icons"
                            :icon="['fas', 'dollar-sign']"
                        ></font-awesome-icon>
                    </li>

                    <li title="change status to unbilled" @click="changeTaskStatus(2)" class="fa-stack fa-2x">
                        <font-awesome-icon
                            class="menu-icons fa-stack-2x"
                            :icon="['fas', 'dollar-sign']"
                        ></font-awesome-icon>
                        <font-awesome-icon
                            class="menu-icons fa-stack-1x"
                            :icon="['fas', 'slash']"
                        ></font-awesome-icon>
                    </li>

                    <li title="change status to in progress">
                        <font-awesome-icon
                        @click="changeTaskStatus(1)"
                            class="menu-icons"
                            :icon="['fas', 'hand']"
                        ></font-awesome-icon>
                    </li>

                    <li title="delete task">
                        <font-awesome-icon 
                        @click="deleteTask(selectedTaskId, selectedTask)"
                            class="menu-icons" 
                            :icon="['fas', 'trash']"
                        ></font-awesome-icon>
                    </li>
                </template>
            </dots-menu>
        </div>
        
        <table-main>

            <template #thead>
                <tr class="table-heading">
                    <th>
                        <div class="flex">
                            <table-sort @clicked="l=!l; j=!j; k=!k; p=!p; m=!m;" :key="i" sortBy="title" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="nameH" type="text" class="header p0" required>
                                <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; l=!l; k=!k; p=!p; m=!m;" :key="j" sortBy="description" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="desH" type="text" class="header p0" required>
                                <span @click="$refs['desH'].focus()" class="floating-label">description</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; l=!l; p=!p; m=!m;" :key="k" sortBy="client" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[2]" ref="clientH" type="text" class="header p0" required>
                                <span @click="$refs['clientH'].focus()" class="floating-label">client</span>
                            </div>
                        </div>
                    </th>
                    
                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; k=!k; p=!p; m=!m;" :key="l" sortBy="progress" sortType="number" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[4]" ref="progH" type="text" class="header p0" required>
                                <span @click="$refs['progH'].focus()" class="floating-label">progress</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; k=!k; p=!p; l=!l;" :key="m" sortBy="status" sortType="number" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <!-- <input v-debounce:700ms.lock="sort" v-model="filterFor[3]" ref="statusH" type="text" class="header p0" required> -->
                                <select @change="sort" v-model="filterFor[3]" ref="statusH" class="header p0" required>
                                    <option value="1">InProgress</option>
                                    <option value="2">Unbilled</option>
                                    <option value="3">Billed</option>
                                </select>
                                <span @click="$refs['statusH'].focus()" class="floating-label">status</span>
                            </div>
                        </div>
                    </th>
                    <div></div>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(task, index) of tasks" :key="task.id">

                    <tr
                        v-show="task.id"
                        class="tr edit-task-tr" 
                        tabindex="0"
                        @keyup.enter="editTask('row'+index, task.id)"
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
                            <tasks-progress :total="task.totalSubTasks" :completed="task.doneSubTasks"/>
                        </td>
                        <td>
                            <div class="task-status" :class="task.status">{{ task.status }}</div>
                        </td>
                        <div class="dots">
                            <dots-img 
                                @openMenu="menu($event, {task: task.title, taskId: task.id, visibility: true})" 
                                @hideMenu="menu($event, {visibility: false}, '')" 
                            />
                        </div>
                    </tr>

                    <tr class="tr tr-hidden hide mb16" :ref="'row'+index">
                        <td class="p0" colspan="5">
                            <component :is="componentId"
                                :editTaskId="task.id"
                                displayHead='false' 
                                :uk="index" 
                                @editingCompleted="editTask('row'+index, task.id)"
                                class="tasks-create" 
                                editing="true"
                                :buttonsIndex="2"
                            >
                            </component>
                        </td>
                    </tr>

                </template>
            </template>

            <table-pagination @tableData="tasksList = $event" :key="p"
                :filters="filterFor"
                tableName="tasks"                
            />
        </table-main>
    </div>
</template>

<script>
import useDeleteSwal from '@/helpers/swalDelete';
import TasksCreate from './TasksCreate.vue';
import TasksProgress from './TasksProgress.vue';
import TableMain from './TableMain.vue';
import DotsImg from './DotsImg.vue';
import DotsMenu from './DotsMenu.vue'
import TablePagination from './TablePagination.vue';
import SkeletonForm from '../skeletons/SkeletonForm.vue';
import { tasks } from '../api';
import TableSort from './TableSort.vue';
import NoAccess from './NoAccess.vue';
import rightCheck from '@/helpers/RightCheck';
import useEditSwal from '../helpers/swalEdit';

export default {
    name: "TasksList",
    data() {
        return {
            allow: {},
            tasksList: [],
            menuVisibisility: '',
            selectedTaskId: '',
            selectedTask: '',

            i:0, j:0, k:0, l:0, m:0, p:0,

            filterFor: ['', '', '', '', ''],

            componentId: 'NoAccess',
        };
    },
    computed: {
        tasks() {
            if (this.tasksList?.length != 0) return this.tasksList
            return this.$store.getters['tasks/tasksListGet'](1, 'id', 0, this.filterFor)
        },
    },
    methods: {
        menu(e, {taskId, task, visibility}) {
            this.menuVisibisility = visibility
            this.selectedTaskId = taskId
            this.selectedTask = task
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        },
        changeTaskStatus(statusId) {
            let status;
            if (statusId == 1) status = 'In Progress'
            else if (statusId == 2) status = 'Unbilled'
            else status = 'Billed'

            useEditSwal({
                text: `status of task ${this.selectedTask} to ${status}`,
                context: this,
                mutationFnName: 'tasks/RESET_STATE',
                mutationArgs: {is_master: true},
                promise: () => tasks.changeStatus({
                    taskId: this.selectedTaskId,
                    statusId,
                })
            })
        },
        deleteTask(taskId, task) {
            useDeleteSwal({
                text: task,
                promise: () => tasks.delete({taskId}),
                context: this,
                mutationFn: 'tasks/deleteTask',
                mutationArgs: {taskId, filters: this.filterFor}
            })
        },
        editTask(rowIndex, taskId) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')

            //get taskData and subTask to edit if not available in store
            //and after getting data render corresponding taskcreate component
            
            if (rightCheck('edit_task')){

                this.componentId = 'SkeletonForm'

                Promise.all([
                    this.$store.dispatch('tasks/tasksDataSet', {taskId}),
                    this.$store.dispatch('tasks/subTasksDataSet', {taskId})
                ])
                .then(() => {
                    this.componentId = 'TasksCreate'
                    // this.allow[taskId] = true
                })
            }
        },
        sort() {
            this.p = !this.p
        }
    }, 
    components: { 
        DotsMenu, 
        TasksProgress, 
        TasksCreate, 
        TableMain, 
        DotsImg, 
        TablePagination, 
        SkeletonForm, 
        TableSort,
        NoAccess,
        // VueMultiselect
    }
}
</script>

<style scoped>
    .tr:hover .dots img {
        visibility: visible !important;
    }
    .tr, .table-heading {
        padding: 0;
    }
    .hide {
        display: none !important;
    }
    .flex {
        display: flex;
        align-items: center;
    }
    .edit-task-tr {
        cursor: pointer;
    }
    .task-status {
        font-size: 12px;
        border: solid 1px #a0a0a0;
        color: #a0a0a0;
        padding: 4px 12px;
        border-radius: 12px;
        width: fit-content;
    }   
    .Unbilled {
        border-color: red;
        color: red;
    }
    .Billed {
        border-color: green;
        color: green;
    }
</style>