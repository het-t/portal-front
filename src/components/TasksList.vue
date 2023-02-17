<template>
    <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li @click="changeTaskStatus(3)" title="change status to billed">
                        <font-awesome-icon
                            class="menu-icons"
                            :icon="['fas', 'dollar-sign']"
                        ></font-awesome-icon>
                        Billed
                    </li>

                    <li title="change status to unbilled" @click="changeTaskStatus(2)">
                        <div class="fa-stack fa-2x">
                            <font-awesome-icon
                                class="menu-icons fa-stack-2x"
                                :icon="['fas', 'dollar-sign']"
                            ></font-awesome-icon>
                            <font-awesome-icon
                                class="menu-icons fa-stack-1x"
                                :icon="['fas', 'slash']"
                            ></font-awesome-icon>
                        </div>
                        Unbilled
                    </li>

                    <li @click="changeTaskStatus(1)" title="change status to in progress">
                        <font-awesome-icon
                            class="menu-icons"
                            :icon="['fas', 'hand']"
                        ></font-awesome-icon>
                        In Progress
                    </li>

                    <li @click="deleteTask(selectedTaskId, selectedTask)" title="delete task">
                        <font-awesome-icon 
                            class="menu-icons" 
                            :icon="['fas', 'trash']"
                        ></font-awesome-icon>
                        Delete
                    </li>
                </template>
            </dots-menu>
        </div>
        
        <table-main>

            <template #thead>
                <tr class="table-heading">
                    <th>
                        <div class="flex">
                            <!-- l=!l; j=!j; k=!k; p=!p; m=!m;  -->
                            <table-sort @clicked="j=!j; l=!l; k=!k; m=!m; sort()" :key="i" sortBy="title" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="nameH" type="text" class="header p0" required>
                                <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; l=!l; k=!k; m=!m; sort()" :key="j" sortBy="description" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="desH" type="text" class="header p0" required>
                                <span @click="$refs['desH'].focus()" class="floating-label">description</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; l=!l; m=!m; sort()" :key="k" sortBy="client" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[2]" ref="clientH" type="text" class="header p0" required>
                                <span @click="$refs['clientH'].focus()" class="floating-label">client</span>
                            </div>
                        </div>
                    </th>
                    
                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; k=!k; m=!m; sort()" :key="l" sortBy="progress" sortType="number" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[4]" ref="progH" type="text" class="header p0" required>
                                <span @click="$refs['progH'].focus()" class="floating-label">progress</span>
                            </div>
                        </div>
                    </th>
                    
                    <th v-if="rightCheck('see_pricing')" title="cost of all sub-tasks + fees">
                        <div class="flex">
                            total
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; k=!k; l=!l; sort()" :key="m" sortBy="status" sortType="number" storeName="tasks"></table-sort>
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
                    <div style="border: none !important;"></div>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(task, index) of tasks()" :key="task.id">
                        <!-- v-show="task.id" -->

                    <tr
                        class="tr edit-task-tr" 
                        tabindex="0"
                        @keyup.enter="editTask('row'+index, task.id, $event)"
                        @click.prevent="editTask('row'+index, task.id, $event)"
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
                        <td v-if="rightCheck('see_pricing')">
                            {{task?.total}}
                        </td>
                        <td class="dots">
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
                        <td class="p0" colspan="6">
                            <component
                                :is="componentId[task.id]"
                                :editTaskId="task.id"
                                displayHead='false' 
                                :uk="index" 
                                @editingCompleted="editTask('row'+index, task.id, $event)"
                                class="tasks-create" 
                                editing="true"
                                :buttonsIndex="2"
                            >
                            </component>
                        </td>
                    </tr>

                </template>
            </template>

            <table-pagination 
                @tableData="tasksList = $event" 
                :key="$store.getters['tasks/getKey']"
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
            tasksList: [],
            menuVisibisility: '',
            selectedTaskId: '',
            selectedTask: '',

            i:0, j:0, k:0, l:0, m:0,

            filterFor: ['', '', '', '', ''],

            componentId: {},
        };
    },
    methods: {
        rightCheck,
        tasks() {
            if (this.tasksList?.length != 0) {
                return this.tasksList
            }
            return this.$store.getters['tasks/tasksListGet'](1, 'id', 0, this.filterFor)
        },
        menu(e, {taskId, task, visibility}) {
            this.menuVisibisility = visibility
            this.selectedTaskId = taskId
            this.selectedTask = task
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        },
        changeTaskStatus(statusId) {

            tasks.changeStatus({
                taskId: this.selectedTaskId,
                statusId,               
            })
            .then(() => 
                useEditSwal({
                    text: '',
                    context: this,
                    promise: Promise.resolve(),
                    mutationFnName: 'tasks/refetch',
                    mutationArgs: {taskId: this.selectedTaskId}
                })
            )
        },
        deleteTask(taskId, task) {
            useDeleteSwal({
                text: task,
                context: this,
                mutationFn: 'tasks/deleteTask',
                promise: () => tasks.delete({taskId}),
                mutationArgs: {taskId, filters: this.filterFor}
            })
        },
        editTask(rowIndex, taskId, {force}) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')
            //get taskData and subTask to edit if not available in store
            //and after getting data render corresponding taskcreate component
            
            if (rightCheck('edit_task')){

                this.componentId[taskId] = 'SkeletonForm'

                Promise.all([
                    this.$store.dispatch('tasks/tasksDataSet', {taskId, force}),
                    this.$store.dispatch('tasks/subTasksDataSet', {taskId, force})
                ])
                .then(() => {
                    this.componentId[taskId] = 'TasksCreate'
                })
            }
            else this.componentId[taskId] = 'NoAccess'
        },
        sort() {
            this.$store.commit('tasks/paginate')
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
    }
}
</script>

<style scoped>
@import '../assets/stylesheet/task-status-tag.css';
@import '../assets/stylesheet/nth-child-no-border.css';

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
        margin: auto;
    }
</style>