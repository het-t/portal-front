<template>
    <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li>
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
                            <table-sort @clicked="l=!l; j=!j; k=!k; p=!p;" :key="i" sortBy="title" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="nameH" type="text" class="header p0" required>
                                <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; l=!l; k=!k; p=!p;" :key="j" sortBy="description" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="desH" type="text" class="header p0" required>
                                <span @click="$refs['desH'].focus()" class="floating-label">description</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; l=!l; p=!p;" :key="k" sortBy="client" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[2]" ref="clientH" type="text" class="header p0" required>
                                <span @click="$refs['clientH'].focus()" class="floating-label">client</span>
                            </div>
                        </div>
                    </th>
                    
                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; k=!k; p=!p;" :key="l" sortBy="progress" sortType="number" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" ref="progH" type="text" class="header p0" required>
                                <span @click="$refs['progH'].focus()" class="floating-label">progress</span>
                            </div>
                        </div>
                    </th>

                    <th>status</th>
                    <div></div>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(task, index) of tasks" :key="task.id">

                    <!-- <div> -->
                        <tr
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
                                <tasks-progress/>
                            </td>
                            <td>{{task.status}}</td>
                            <div class="dots">
                                <dots-img 
                                    @openMenu="menu($event, {task: task.title, taskId: task.id, visibility: true})" 
                                    @hideMenu="menu($event, {visibility: false}, '')" 
                                />
                            </div>
                        </tr>

                        <tr class="tr tr-hidden hide mb16" :ref="'row'+index">
                            <td class="p0" colspan="5">
                                <!-- <tasks-create 
                                    v-if="(allow[task.id] == true)"
                                    :editTaskId="task.id"
                                    displayHead='false' 
                                    :uk="index" 
                                    @editingCompleted="[editTask('row'+index, task.id), showSwal($event)]"
                                    class="tasks-create" 
                                    editing="true" 
                                />
                                <skeleton-form v-else
                                    :buttonsIndex="2"
                                ></skeleton-form> -->

                                <!-- v-if="(allow[task.id] == true)" -->

                                <component :is="componentId"
                                    :editTaskId="task.id"
                                    displayHead='false' 
                                    :uk="index" 
                                    @editingCompleted="[editTask('row'+index, task.id), showSwal($event)]"
                                    class="tasks-create" 
                                    editing="true"
                                    :buttonsIndex="2"
                                >
                                </component>
                            </td>
                        </tr>
                    <!-- </div> -->

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
import swal from 'sweetalert'
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

export default {
    name: "TasksList",
    data() {
        return {
            allow: {},
            tasksList: [],
            menuVisibisility: '',
            selectedTaskId: '',
            selectedTask: '',

            i:0, j:0, k:0, l:0, p:0,

            filterFor: ['', '', ''],

            componentId: 'NoAccess'
        };
    },
    computed: {
        tasks() {
            if (this.tasksList?.length != 0) return this.tasksList
            return this.$store.getters['tasks/tasksListGet'](1, 'id', 0, this.filterFor)
        }
    },
    methods: {
        menu(e, {taskId, task, visibility}) {
            this.menuVisibisility = visibility
            this.selectedTaskId = taskId
            this.selectedTask = task
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
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
        showSwal({editing, task}) {
            if (editing) {
                swal({
                    title: "Success",
                    text: `Edited "${task}"`,
                    icon: "success",
                    button: "Ok"
                })
            }
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
        NoAccess
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
        /* align-items: center; */
    }
    .edit-task-tr {
        cursor: pointer;
    }
</style>