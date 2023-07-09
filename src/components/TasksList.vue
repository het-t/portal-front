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
                            <table-sort @clicked="j=!j; l=!l; k=!k; m=!m;" :key="i" sortBy="title" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-model="filters.name" ref="nameH" type="text" class="header p0" required>
                                <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; l=!l; k=!k; m=!m;" :key="j" sortBy="description" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-model="filters.description" ref="desH" type="text" class="header p0" required>
                                <span @click="$refs['desH'].focus()" class="floating-label">description</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; l=!l; m=!m;" :key="k" sortBy="client" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-model="filters.client" ref="clientH" type="text" class="header p0" required>
                                <span @click="$refs['clientH'].focus()" class="floating-label">client</span>
                            </div>
                        </div>
                    </th>
                    
                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; k=!k; m=!m;" :key="l" sortBy="progress" sortType="number" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <input v-model="filters.progress" ref="progH" type="text" class="header p0" required>
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
                            <table-sort @clicked="i=!i; j=!j; k=!k; l=!l;" :key="m" sortBy="status" sortType="number" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <select @change="sort" v-model="filters.status" ref="statusH" class="header p0" required>
                                    <option value="1">In Progress</option>
                                    <option value="2">Unbilled</option>
                                    <option value="3">Billed</option>
                                </select>
                                <span @click="$refs['statusH'].focus()" class="floating-label">status</span>
                            </div>
                        </div>
                    </th>

                    <!-- <th>
                        <div class="flex">
                            <table-sort :key="n" sortBy="tag" sortType="string" storeName="tasks"></table-sort>
                            <div class="floating-container">
                                <vue-multiselect 
                                    id="task-tag"   
                                    class="header p0" 
                                    v-model="filters.tags"
                                    :options="getTags"
                                    track-by="id"
                                >

                                </vue-multiselect>
                                <span class="floating-label">tag</span>
                            </div>
                        </div>
                    </th> -->

                    <div style="border: none !important;"></div>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(task, index) of tasks" :key="task.id">
                    <tr
                        class="tr edit-task-tr" 
                        tabindex="0"
                        @keyup.enter="editTask('row'+index, task.id, 0)"
                        @click.prevent="editTask('row'+index, task.id, 0)"
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
<!-- 
                        <td>
                            {{ task.tag }}
                        </td> -->
                        
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
                storeName="tasks"                
            />
        </table-main>
    </div>
</template>

<script>
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
import swal from 'sweetalert';
// import VueMultiselect from 'vue-multiselect';

export default {
    name: "TasksList",
    data() {
        return {
            menuVisibisility: '',
            selectedTaskId: '',
            selectedTask: '',

            i:0, j:0, k:0, l:0, m:0,

            componentId: {},
        };
    },
    computed: {
        tasks() {
            const currentPage = this.$store.getters['tasks/getCurrentPage']
            const recordsPerPage = this.$store.getters['tasks/getRecordsPerPage']
            const from = (currentPage-1)*(recordsPerPage)

            return this.$store.getters['tasks/getList']({
                from,
                to: from + recordsPerPage
            })
        },
        // getTags() {
        //     return this.$store.getters['tasks/getTags']
        // },
        filters() {
            return this.$store.getters['tasks/getFilters']
        }
    },
    methods: {
        rightCheck,
        menu(e, {taskId, task, visibility}) {
            this.menuVisibisility = visibility
            this.selectedTaskId = taskId
            this.selectedTask = task
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        },
        changeTaskStatus(statusId) {
            const taskId = this.selectedTaskId
            tasks.changeStatus({
                taskId,
                statusId,               
            })
            .then(() => {
                this.$toast.success(`Saved`)
                this.$store.commit('tasks/flush', {taskId})
                return this.$store.dispatch('tasks/fetchList', {
                    force: true
                })
            })
            .catch(err => console.log(err))
        },
        deleteTask(taskId, taskTitle) {
            swal({
                icon: 'warning',
                title: 'Alert',
                text: `Do you really want to delete "${taskTitle}"`,
                buttons: true,
                dangerMode: true
            })
            .then(value => {
                if (value == null) throw null
                return tasks.delete({taskId})
            })
            .then(() => {
                this.$toast.success(`Saved`)
                this.$store.commit('tasks/flush', {taskId})
                return this.$store.dispatch('tasks/fetchList', {
                    force: true
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        editTask(rowIndex, taskId, editingStatus) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')

            if (editingStatus === 0) {
                if (rightCheck('edit_task')){

                    this.componentId[taskId] = 'SkeletonForm'

                    Promise.all([
                        this.$store.dispatch('tasks/fetchData', {taskId}),
                        this.$store.dispatch('tasks/fetchSubTasks', {taskId})
                    ])
                    .then(() => {
                        this.componentId[taskId] = 'TasksCreate'
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
                else this.componentId[taskId] = 'NoAccess'
            }
            else {
                this.$store.dispatch('tasks/fetchList', {
                    force: true
                })
                if(editingStatus === 1) {
                    this.$store.dispatch('tasks/fetchData', {
                        taskId,
                        force: true
                    })
                    this.$store.dispatch('tasks/fetchSubTasks', {
                        taskId,
                        force: true
                    })
                }
            }
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