<template>
    <div>
        <div ref="menu">
            <DotsMenu v-if="state.menuDisplay === true">
                <template #links>
                    <li @click="deleteTasksMaster">
                        <font-awesome-icon 
                            class="menu-icons"
                            :icon="['fas', 'trash']"
                        />
                        Delete
                    </li>
                </template>
            </DotsMenu>
        </div>

        <TableMain>
            <template #thead>
                <tr>
                    <th>
                        <div class="flex">
                            <TableSort
                                sortType="string"
                                sortBy="name"
                                storeName="tasksMaster"
                            ></TableSort>

                            <div class="floating-container">
                                <input v-model="filters.title" type="text" class="header p0" required>
                                <span class="floating-label">name</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <TableSort
                                sortType="string"
                                sortBy="desc"
                                storeName="tasksMaster"
                            ></TableSort>

                            <div class="floating-container">
                                <input v-model="filters.description" type="text" class="header p0" required>
                                <span class="floating-label">description</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <TableSort
                                sortType="number"
                                sortBy="cost"
                                storeName="tasksMaster"
                            ></TableSort>

                            <div class="floating-container">
                                cost
                            </div>
                        </div>
                    </th>
                    <th></th>
                </tr>
            </template>


            <template #tbody>
                <template v-for="(taskMaster, index) of taskMasterList" :key="taskMaster.id">      
              
                    <tr 
                        class="tr"
                        tabindex="0"
                        @click.prevent="editTaskMaster('row'+index, taskMaster.id, 0)"
                        @keyup.enter="editTaskMaster('row'+index, taskMaster.id, 0)"
                        style="cursor: pointer;"
                    >
                        <td>{{ taskMaster.title }}</td> 
                        <td>{{ taskMaster.description }}</td>
                        <td>{{ taskMaster.cost }}</td>
                        <DotsImg
                            :key="taskMaster.id"
                            @openMenu="toggleMenuDisplay($event, taskMaster.id, true)"
                            @hideMenu="toggleMenuDisplay($event, '', false)"
                        ></DotsImg>
                    </tr>
                    <tr class="tr tr-hidden mb16">
                        <td class="p0 m0" colspan="3">
                            <TasksMasterCreate 
                                v-if="state.componentId?.[taskMaster.id] == true" 
                                :class="state.componentId?.[taskMaster.id] == true ? 'show' : 'hide'" 
                                :taskMaster="taskMaster"
                                @editingCompleted="editTaskMaster('row'+index, taskMaster.id, $event)">
                            </TasksMasterCreate>
                        </td>
                    </tr>
                </template>
            </template>

            <TablePagination 
                storeName="tasksMaster"
            />
        </TableMain>
    </div>
</template>

<script setup>
import TableMain from './TableMain.vue'
import TableSort from './TableSort.vue'
import TablePagination from './TablePagination.vue'
import { useStore } from 'vuex'
import { computed, inject, reactive, ref } from 'vue'
import DotsImg from './DotsImg.vue'
import DotsMenu from './DotsMenu.vue'
import rightCheck from '@/helpers/RightCheck.js'
import TasksMasterCreate from './TasksMasterCreate.vue'
import { tasksMaster } from '../api'

const store = useStore()

const state = reactive({
    menuDisplay: false,
    componentId: {},
    selectedTaskMasterId: ''
})
const menu = ref(null)

const taskMasterList = computed(() => {
    const currentPage = store.getters['tasksMaster/getCurrentPage']
    const recordsPerPage = store.getters['tasksMaster/getRecordsPerPage']
    const from = (currentPage-1)*recordsPerPage

    return store.getters['tasksMaster/getList']({
        from,
        to: from + recordsPerPage
    })
})

const filters = computed(() => {
    return store.getters['tasksMaster/getFilters']
})

function toggleMenuDisplay(e, taskMasterId, visibility) {
    state.menuDisplay = visibility
    if(visibility === true) {
        e.target.parentElement.parentElement.appendChild(menu.value)
        state.selectedTaskMasterId = taskMasterId
    }
} 
const toast = inject('toast')

function editTaskMaster(rowIndex, taskMasterId, editingStatus) {
    if (editingStatus === 0) {
        if (rightCheck('edit_tasks_master')){
            store.dispatch('tasksMaster/fetchSubTasks', {taskMasterId})
            .then(() => {
                state.componentId[taskMasterId] = !state.componentId[taskMasterId]
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    else {
        state.componentId[taskMasterId] = false
        store.dispatch('tasksMaster/fetchList', {
            force: true
        })
        store.dispatch('tasksMaster/fetchList', {
            all: true,
            force: true
        })
        if(editingStatus === 2) {
            Promise.all([
                store.dispatch('tasksMaster/fetchData', {
                    taskMasterId,
                    force: true
                }),
                store.dispatch('tasksMaster/fetchSubTasks', {
                    taskMasterId,
                    force: true
                })
            ])
            .then(() => {
                store.commit('tasks/flush', {})
                toast.success('Success')
            })
            .catch(err => {
                toast.error(`Oops! We can't perform this action right now`)
                console.log(err)
            })
        }
    }
}

function deleteTasksMaster() {
    tasksMaster.delete({taskMasterId: state.selectedTaskMasterId})
    .then(() => {
        return Promise.all([
            store.dispatch('tasksMaster/fetchList', {
                all: true,
                force: true
            }),
            store.dispatch('tasksMaster/fetchList', {
                force: true
            })
        ])
    })
    .then(() => {
        toast.success('Success')
    })
    .catch(err => {
        toast.error(`Oops! We can't perform this action right now`)
        console.log(err)
    })
}
</script>

<style scoped>
@import '../assets/stylesheet/nth-child-no-border.css';

.flex { 
    display: flex;
}
.hide {
    display: none !important;
}
.show {
    display: block !important;
}
</style>