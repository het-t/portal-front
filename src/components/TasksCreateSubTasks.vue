<template>
    <div class="fg pr16 sub-tasks-scroll">
        <div>   
            <div class="row mt8 mb16">
                <label :for="'task-sub-task'+props.uk" class="labels c1">sub task</label>
                <div style="width:80%; display:flex; align-items: center;">
                    <input @keyup.enter="addSubTask()" v-model="state.newSubTask" style="width: 100%" type="text" :id="'task-sub-task'+props.uk">
                    <font-awesome-icon tabindex="0" class="icon pointer add-st ml8" @keyup.enter="addSubTask()" @click.prevent="addSubTask()" icon="fa-solid fa-plus"></font-awesome-icon>
                </div>
            </div>
        </div>

        <div v-if="state.subTasks" class="grid-wrapper">
            <div v-for="(task, index) in state.subTasks" :key="index" class="mb8">
                <div class="grid" v-if="task.description != '_#_*&^'">

                    <font-awesome-icon tabindex="0" icon="fa-solid fa-minus"
                        @keyup.enter="removeSubTask(index)"
                        @click.prevent="removeSubTask(index)" 
                        class="pointer icon rmst"
                    ></font-awesome-icon>

                    <div class="pointer"
                        tabindex="0"
                        @keyup.enter="toggleDisplaySubTask(index)"
                        @click.prevent="toggleDisplaySubTask(index)"
                    >
                        
                        <p contentEditable="true"
                            class="st-description"
                            :class="task.statusId == 5 || task.statusId == 6 ? 'done-st' : ''"
                            @input="updateSubTaskTitle(task, $event)"
                        >{{ task.description }}</p>
                        
                        <span v-if="task?.status != undefined" class="ml8 st_status" :class="task.status">{{ task.status }}</span>
                    </div>
                    
                    <div style="overflow: hidden; display: flex; justify-content: flex-end;">
                        <div 
                            v-for="(user, index) in task.assignedTo" :key="user.id" 
                            :style="getStyle(task.assignedTo.length - index - 1)"
                            style="height: 36px; width: 36px; clip-path: circle(); position: relative; background-color: white;"
                        >
                            <font-awesome-icon 
                                v-if="$store.getters['images/getProfilePic'](`${user.id}_50x50`) == undefined || 
                                $store.getters['images/getProfilePic'](`${user.id}_50x50`) == ''"
                                :key="user.id"
                                class="profile-pic" style="border-radius: 100%; width: 36px; height: 36px;"
                                :icon="['fas', 'user']"
                            ></font-awesome-icon>

                            <img v-else :src="$store.getters['images/getProfilePic'](`${user.id}_50x50`)"
                                loading="lazy" style="width: 36px; height: 36px; border-radius: 100%;"
                            >
                        </div>
                    </div>
                </div>

                <div v-if="task.description != '_#_*&^' && state.show == index"
                    class="hide ml24"
                    :class="state.show == index ? 'show' : 'hide'" 
                >
                    <div class="ml16">
                        <select v-model="task.statusId" class="sub-task-extra">
                            <option v-for="(status, index) in state.subTaskStatuses" :value="status.id" :key="index.toString()+props.uk">
                                {{status.status}}
                            </option>
                        </select>
                    </div>

                    <div class="ml16">
                        <vue-multiselect 
                            multiple 
                            v-model="task.assignedTo" 
                            :options="getUsers" 
                            :custom-label="labelForAssignedTo" 
                            track-by="id" 
                            placeholder="Assigend To" 
                            class="sub-task-extra options-list multiselect__tag_bg"
                        >
                            <template #noResult>
                                Oops! No user found. Consider creating new user
                            </template>

                            <template v-slot:option="props">
                                <span class="p0 m0" style="height: 0 !important; width: 0 !important;" :class="props.option.isActive == 0 ? 'not-active' : ''">
                                    {{props.option.firstName}} {{props.option.lastName}} ({{props.option.id}})
                                </span>
                            </template>
                        </vue-multiselect>
                    </div>
                    
                    <div class="ml16">
                        <input v-model="task.cost" type="number" :id="'sub-task-cost'+props.uk" placeholder="Cost" class="sub-task-extra">
                    </div>

                    <div class="ml16">
                        <input v-model="task.comments" class="sub-task-extra" type="text" placeholder="Comments">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VueMultiselect from 'vue-multiselect'
import {watch, reactive, onMounted, computed, defineProps, defineEmits} from 'vue'
import { useStore } from 'vuex'

const state = reactive({
    i: 0,
    show: -1,
    subTasks: [],
    removedSubTaskId: [],
    unqId: 0,
    newSubTask: '',
    subTaskStatuses: [{id: 1, status: "hold"}, {id: 2, status: "to do"}, {id: 3, status: "in progress"}, {id: 4, status: "pending for approval"}, {id: 5, status: "done"}, {id: 6, status: "cancel"}, {id: 7, status: "pending with client"}, {id: 8, status: "signed documents awaited"}, {id: 9, status: "pending for DSC"}, {id: 10, status: 'reassigned'}, {id: 11, status: 'approved'}, {id: 12, status: "Pending before authority"}],
})

const props = defineProps({
    rendering: {
        type: String,
        default: 'sub_tasks'
    },
    editTaskId: {
        type: Number
    },
    taskMaster: {
        type: Object
    },
    uk: {
        type: Number
    },
    flag: {
        type: Boolean
    }
})

const emits = defineEmits(['dataToSave', 'popUpVisibilityChanged'])

watch(
    () => props.flag,
    (newFlag, oldFlag) => {
        if(oldFlag === false && newFlag === true) {

            emits('dataToSave', {
                subTasks: state.subTasks,
                removedSubTasks: state.removedSubTaskId
            })
        }
    }
)

watch(
    () => props.taskMaster,
    (taskMaster) => {
        if(props.editTaskId == undefined) {
            if(taskMaster?.id) {
                store.dispatch('tasksMaster/fetchSubTasks', {taskMasterId: taskMaster.id})
                .then(() => {
                    state.subTasks = store.getters['tasksMaster/getSubTasks'](taskMaster.id)?.map((subTaskMaster) => {
                        subTaskMaster.saved = 0
                        return subTaskMaster
                    })
                })
                .catch(err => console.log(err))
            }
            else {
                state.subTasks = []
            }
        }
        else {
            if(taskMaster?.id) {
                if (state.i > 0) {                    
                    state.removedSubTaskId.push(...state.subTasks.filter((subTask) => {
                        if(subTask.saved !== 0) return true
                        return false
                    }).map((subTask) => subTask.id))

                    store.dispatch('tasksMaster/fetchSubTasks', {taskMasterId: taskMaster.id})
                    .then(() => {
                        state.subTasks = store.getters['tasksMaster/getSubTasks'](taskMaster.id)?.map((subTaskMaster) => {
                            subTaskMaster.saved = 0
                            return subTaskMaster
                        })
                    })
                    .catch(err => console.log(err))
                }
            }
            else if (!taskMaster?.id && state.i !== 0) {
                state.removedSubTaskId.push(...state.subTasks.filter((subTask) => {
                    if(subTask.saved !== 0) return true
                    return false
                }).map((subTask) => subTask.id))
                state.subTasks = []
            }
            ++state.i
        }
    },
    {deep: true}
)

function labelForAssignedTo({firstName, lastName, id}) {
    return `${firstName} ${lastName} (${id})`
}

function toggleDisplaySubTask(index) {
    if (state.show == index || props.rendering === 'sub_tasks_master') state.show = -1
    else state.show = index
}

function removeSubTask(index) {
    const rmSubTask = state.subTasks.splice(index, 1)
    if (rmSubTask[0]?.id && rmSubTask[0]?.saved !== 0) {
        state.removedSubTaskId.push(rmSubTask[0]?.id)
    }
    if (state.subTasks?.length == 0 || ( state.subTasks.length == 1 && state.subTasks[0].description == '_#_*&^')) {
        emits("popUpVisibilityChanged", {
            visibility: true,
            subTask: state.subTasks[0]
        })
    }
    else {
        emits("popUpVisibilityChanged", {
            visibility: false
        })
    }
}

function updateSubTaskTitle(subTask, e) {
    for(let i = 0; i!=state.subTasks.length; i++) {
        if (((state.subTasks[i]?.id == subTask.id) && subTask.id != undefined) || 
            ((state.subTasks[i]?.unqId == subTask.unqId) && subTask.unqId != undefined)
        ) {
            state.subTasks[i].description = e.target.innerText
            break
        }
    }
}

function addSubTask() {
    ++state.unqId
    state.subTasks.push({
        unqId: state.unqId,
        description: state.newSubTask,
        statusId: 2,
        assignedTo: [],
        comments: '',
        cost: '',
        saved: 0
    })
    document.getElementById('task-sub-task'+props.uk).focus()
    state.newSubTask = ''

    if (state.subTasks?.length == 0 || (state.subTasks.length == 1 && state.subTasks[0].description == '_#_*&^')) {
        emits("popUpVisibilityChanged", {
            visibility: true,
            subTask: state.subTasks[0]
        })
    }
    else {
        emits("popUpVisibilityChanged", {
            visibility: false
        })
    }
}

function getStyle(index) {
    return `left: ${8*(index)}px;`;
}

const store = useStore()

const getSubTasks = computed(() => {
    if (props.rendering === 'sub_tasks_master') return store.getters['tasksMaster/getSubTasks'](props.taskMaster.id)
    return store.getters['tasks/getSubTasks'](props.editTaskId)
})
const getUsers = computed(() => store.getters['users/getList']({}))

onMounted(() => {
    const subTasksData = getSubTasks.value

    if (subTasksData !== undefined && subTasksData !== '') {  
        state.unqId = subTasksData.length    

        for(let i = 0; i<subTasksData.length; i++) {
            if (typeof subTasksData[i].assignedTo?.[0] === "number") {
                subTasksData[i].assignedTo = subTasksData[i].assignedTo.map(userId => {
                    return getUsers.value.find(user => user.id == userId)
                })
            }
            else if (subTasksData[i].assignedTo === null ) subTasksData[i].assignedTo = []
        }
        state.subTasks = subTasksData
    }

    if (state.subTasks?.length === 1) {
        if (state.subTasks[0].description == '_#_*&^') {
            emits("popUpVisibilityChanged", {
                visibility: true,
                subTask: state.subTasks[0]
            })
        }
    }
})
</script>

<style scoped>
@import "../assets/stylesheet/multiselect.css";

.st-description {
    display: inline;
}
.st-description:focus {
    outline: none !important;
    border-bottom: solid 1px #e0e0e0;
}
.st_status {
    border: solid 1px #e0e0e0;
    color:#e0e0e0;
    border-radius: 50px 50px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
}
svg.profile-pic {
    width: 30px;
    height: 26px;
    padding-bottom: 4px;
    color: #e0e0e0;
    border-radius: 100%;
    border: solid 1px #e0e0e0;
}
.done-st {
    color: #a0a0a0;
    text-decoration: line-through;
}
.add-st {
    width: 13px;
    height: 13px;
    padding: 8px;
}
.rmst {
    padding: 4px;
}
.icon {
    border-radius: 100%;
    color: #8888888f;
    border: solid 1px #e0e0e0;
}
.icon:hover {
    border-color: #c2c2c2;
}
.pointer {
    cursor: pointer;
}
option, select {
    text-transform: capitalize;
}
.hide {display: none;}
.show {
    display: block !important;
}
.sub-task-extra {
    width: 80% !important;
    border: none !important;
    border-bottom: solid 1px #e7eaec !important;
}
.sub-task-extra:focus {
    border: none !important;
    outline-color: #e7eaec;
}
.grid-wrapper {
    width: 100%;
    max-height: 700px;
    overflow-y: auto;
}
.grid {
    display: grid;
    grid-template-columns: 25px auto auto;
    grid-template-rows: 2;
    column-gap: 12px;
    align-items: center;
    line-height: 1.5rem;
}
.grid:hover .dots-img {
    visibility: visible !important;
}
.sub-tasks-scroll {

}
</style>