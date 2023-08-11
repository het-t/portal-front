<script setup>
import { defineProps, computed, reactive, ref, onMounted, onBeforeUnmount, inject } from "vue";
import { useStore } from "vuex";
import {tasks, tags} from '@/api/index.js';
import VueMultiselect from 'vue-multiselect'
import swal from "sweetalert";
import SubTaskCreate from "@/components/SubTaskCreate.vue";

const props = defineProps({
    editTaskId: Number
})

const store = useStore()
const toast = inject('toast')

const subTasksMainWrapper = ref(null)

const state = reactive({
    subTaskDelegationEditing: false,
    subTasksStatusesShow: '',
    subTaskDelegationOption: '',
    subTaskDelegationShow: {},
    subTaskCreate: false,
    delegationCache: {},
    subTaskEdit: '',
    tagsOptions: ''
})

await componentPromise()

const getSubTasks = computed(() => {
    return store.getters['tasks/getSubTasks'](props.editTaskId)
})

const getUsers = computed(() =>     
    store.getters['users/getList']({})
    .filter((user) => user.isActive === 1)
)

const getSubTasksStatuses = computed(() => 
    store.getters['tasks/getSubTasksStatuses']
)

const getTags = computed(() => 
    store.getters['tasks/getSubTasksTags']
)

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});

function handleClickOutside(event) {
    if (!subTasksMainWrapper.value.contains(event.target)) {
        state.subTasksStatusesShow = false;
        state.subTaskDelegationOption = false;
        state.tagsOptions = false;
    }
}

function componentPromise(force = false) {
    return store.dispatch('tasks/fetchSubTasks', {
        taskId: props.editTaskId,
        force
    })
    .catch(err => {
        console.log(err)
    })

}

function changeSubTaskStatus(e, subTaskId) {
    state.subTasksStatusesShow = ''
    tasks.changeSubTaskStatus({
        taskId: props.editTaskId,
        subTaskId,
        statusId: e.id
    })
    .finally(() => {
        return componentPromise(true)
    })
    .catch((err) => {
        console.log(err)
    })
}

function addDelegationLink(user, subTask) {
    tasks.addDelegationLink({
        taskId: props.editTaskId,
        subTaskId: subTask.id,
        childUserId: user.id
    })
    .then(() => {
        if (!state.delegationCache[subTask.id]?.length) state.delegationCache[subTask.id] = []
        subTask.delegation = state.delegationCache[subTask.id].push(user)
    })
    .catch(err => {
        console.log(err)
    })
}

function removeDelegationLink(user, subTask) {
    tasks.removeDelegationLink({
        taskId: props.editTaskId,
        subTaskId: subTask.id,
        userId: user.id
    })
    .then(() => {
        const index = state.delegationCache[subTask.id].indexOf(user)
        state.delegationCache[subTask.id].splice(index, 1)
        subTask.delegation = state.delegationCache[subTask.id]
    })
    .catch(err => {
        console.log(err)
    })
}

function flatOutDelegation(rawDelegation, subTaskId) {
    if (state.delegationCache[subTaskId]?.length) 
        return state.delegationCache[subTaskId]

    let delegation = []
    if (rawDelegation.length === 0) return delegation
    if (rawDelegation.length === 1) {
        delegation = [rawDelegation[0].parentId]

        store.dispatch('images/fetchProfilePic', {
            userId: delegation[0],
            width: 50,
            height: 50
        })
    }
    else if (rawDelegation.length > 1) {
        let delegationMap = {}

        rawDelegation.map((link) => {
            delegationMap[link.childId] = link.parentId
        })

        const result = []
        
        let parent = 'null'
        while (delegationMap[parent] !== undefined) {
            if (parent !== 'null') result.push(parent)
            parent = delegationMap[parent]
        }
        result.push(parent)
        result.reverse()

        delegation = result

        delegation.map((userId) => {
            store.dispatch('images/fetchProfilePic', {
                userId,
                width: 50,
                height: 50
            })
        })
    }

    delegation = delegation.map((userId) => {
        return getUsers.value.filter((user) => {
            return user.id === userId
        })?.[0]
    })

    state.delegationCache[subTaskId] = delegation
console.log(delegation)
    return delegation
}

function subTaskDelete(subTaskId, description) {
    swal({
        icon: 'warning',
        title: 'Alert',
        text: `Do you really want to delete "${description}"`,
        buttons: true,
        dangerMode: true
    })
    .then(value => {
        if (value == null) throw null
        return tasks.deleteSubTask({
            taskId: props.editTaskId,
            subTaskId
        })
    })
    .then(() => {
        toast.success(`Saved`)
        return componentPromise(true)
    })
    .catch(() => {
        toast.error(`Oops! We can't perform this action right now`);
    })
}

function addTag(tag, subTaskId) {
    state.tagsOptions = false
    
    tasks.addTag({
        taskId: props.editTaskId,
        subTaskId,
        tagId: tag.id
    })
    .then(() => {
        toast.success('Saved')
    })
    .catch(() => {
        toast.error(`Oops! We can't perform this action right now`);
    })
}

function removeTag(tag, subTaskId) {
    state.tagsOptions = false

    tasks.removeTag({
        taskId: props.editTaskId,
        subTaskId,
        tagId: tag.id
    })
    .then(() => {
        toast.success('Saved')
    })
    .catch(() => {
        toast.error(`Oops! We can't perform this action right now`);
    })
}

function createTag(tagName, subTaskId) {
    state.tagsOptions = false

    tags.create({
        tableId: 20,
        tagName
    })
    .then((res) => {
        const tag = {
            id: res.data.createdTagId,
            name: tagName
        }
        store.commit('tasks/addTag', {
            data: tag
        })
        toast.success('Saved')
        return addTag(tag, subTaskId)
    })
    .catch(() => {
        toast.error(`Oops! We can't perform this action right now`);
    })
}
</script>

<template>
<div ref="subTasksMainWrapper" style="color: #676a6c; text-transform: capitalize;">
    <div style="display: flex; flex-direction: column; gap: 1px; margin: 13px 0;">
        <div 
            @click.prevent="state.subTaskCreate = true"
            v-if="state.subTaskCreate === false" 
            class="sub-task-add-btn" 
            style="margin-bottom: 6px; margin-left: 13px; min-width: fit-content !important;"
        >
            <font-awesome-icon :icon="['fas', 'plus']" />
            <span class="sub-task-add-btn-text">sub-task</span>
        </div>

        <sub-task-create
            v-else
            :task-id="props.editTaskId"
            @done="state.subTaskCreate = false"
            @canceled="state.subTaskCreate = false"
        />

        
        <div
            v-for="(subTask, index) in getSubTasks"
            :key="index"
            >
            
            <div 
                v-if="state.subTaskEdit !== subTask.id"
                :class="subTask.status?.name?.replaceAll(' ', '')?.toLowerCase()"
                @click.self="state.subTasksStatusesShow === subTask.id ? state.subTasksStatusesShow = '' : state.subTasksStatusesShow = subTask.id"
                class="sub-task-ele"
            >

                <div 
                    v-if="state.subTaskEdit !== subTask.id"
                    style="display: flex; align-items: center; gap: 6px;"
                >
                    <div 
                        style="display: flex; align-items: center;"
                    >
                        <vue-multiselect
                            v-if="state.subTasksStatusesShow === subTask.id"
                            v-model="subTask.status"
                            :options="getSubTasksStatuses"
                            @select="changeSubTaskStatus($event, subTask.id)"
                            style="position: absolute; max-width: 200px;"
                            label="name"
                            class="sub-task-status"
                        >

                            <template v-slot:option="{option}">
                                <div style="display: flex; gap: 13px; align-items: center;">
                                    <div class="sub-task-status indicator" :class="option.name.toLowerCase().replaceAll(' ', '')">
                                    </div>

                                    {{ option.name }}
                                </div>
                            </template>
                        </vue-multiselect >
                    </div>
                    
                    <div 
                        class="sub-task text" 
                        :class="subTask?.status?.name?.replaceAll(' ', '')?.toLowerCase()" 
                        style="display: flex; gap: 6px; align-items: center;"
                    >
                        <div>
                            {{ subTask.description }}
                        </div>

                        <div style="margin-right: 7px;">
                            #{{ subTask.id }}
                        </div>

                        <font-awesome-icon 
                            @click.stop="state.subTaskEdit = subTask.id"
                            class="controls" 
                            :icon="['fas', 'pencil']" 
                        />

                        <font-awesome-icon
                            @click.stop="subTaskDelete(subTask.id, subTask.description)" 
                            class="controls" 
                            :icon="['fas', 'trash']" 
                        />
                    </div>
                </div>
                
                <div 
                    style="margin-left: 6px; margin-bottom: 13px; margin-top: 6px; display: flex; flex-direction: column; gap: 3px;"
                >
                    <!-- sub-task-status -->
                    <div>
                        <div 
                            style="display: flex; gap: 6px; align-items: center; margin-top: 6px; width: fit-content;"
                            @click.prevent="state.subTasksStatusesShow = subTask.id"
                        >
                            <div 
                                class="sub-task-status indicator" 
                                :class="subTask.status?.name?.replaceAll(' ', '')?.toLowerCase()"
                            ></div>

                            <span>{{subTask.status.name}}</span>
                        </div>
                    </div>

                    <!-- sub-task tags -->
                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                        <div
                            v-for="(tag, index) in subTask?.tags"
                            :key="index"
                            class="sub-task-tag"
                        >
                            <div style="text-wrap: nowrap;">
                                <span style="text-transform: capitalize;">#{{ tag.name }}</span>
                            </div>

                        </div>

                        <div v-if="!subTask.tags?.length">
                            Add Tag
                        </div>

                        <div @click="state.tagsOptions = subTask.id" class="sub-task-add-tag">
                            <font-awesome-icon
                                v-show="state.tagsOptions !== subTask.id"
                                :icon="['fas', 'pencil']" 
                            />

                            <vue-multiselect
                                v-model="subTask.tags"
                                @select="addTag($event, subTask.id)"
                                @remove="removeTag($event, subTask.id)"
                                @tag="createTag($event, subTask.id)"
                                :options="getTags"
                                :custom-label="({ name }) => name"
                                :taggable="true"
                                tag-placeholder="Add this as new tag"
                                :multiple="true"
                                :allow-empty="true"
                                track-by="id"
                                placeholder="Tags"
                                style="min-width: 200px; z-index: 999;"
                                v-if="state.tagsOptions === subTask.id"
                            >
                            </vue-multiselect>
                        </div>
                    </div>

                    <!-- sub-task delegation -->
                    <div style="display: flex; align-items: center; gap: 3px; flex-wrap: wrap;">
                        <div 
                            v-for="(user, index) in flatOutDelegation(subTask.delegation, subTask.id)"
                            :key="index"
                            class="delegation-link"
                        >
                            <div v-if="index !== 0" style="width: 26px; border-bottom: 2px dotted rgba(75, 74, 73, 0.5);"></div>

                            <div>
                                <font-awesome-icon 
                                    v-if="store.getters['images/getProfilePic'](`${user.id}_50x50`) == undefined ||
                                        store.getters['images/getProfilePic'](`${user.id}_50x50`) == ''"
                                    :key="index"
                                    class="profile-pic" style="border-radius: 100%; width: 16px; height: 16px;"
                                    :icon="['fas', 'user']"
                                ></font-awesome-icon>

                                <img v-else :src="store.getters['images/getProfilePic'](`${user.id}_50x50`)"
                                    loading="lazy" style="width: 22px; height: 22px; border-radius: 100%;"
                                >
                            </div>

                            <div style="text-wrap: nowrap;">
                                <span>{{ user.firstName?.toLowerCase() }} {{ user.lastName?.toLowerCase() }}</span>
                            </div>
                            
                            <font-awesome-icon class="remove" @click.prevent="removeDelegationLink(user, subTask)" :icon="['fas', 'xmark']" />
                        </div>

                        <div v-if="flatOutDelegation(subTask.delegation, subTask.id)?.length === 0">
                            No Delegation Found
                        </div>

                        
                        <div class="sub-task-delegation-add-arrow" style="width: 26px; border-bottom: 2px dotted rgba(75, 74, 73, 0.5);"></div>

                        <div
                            @click="state.subTaskDelegationOption = subTask.id"
                            class="sub-task-delegation-add"
                        >
                            <div>
                                <font-awesome-icon v-show="state.subTaskDelegationOption != subTask.id" :icon="['fas', 'plus']"/>

                                <vue-multiselect
                                    v-if="state.subTaskDelegationOption === subTask.id"
                                    @select="addDelegationLink($event, subTask)"
                                    :custom-label="(user) => user.firstName + '' + user.lastName"
                                    :options="getUsers.filter((user) => flatOutDelegation(subTask.delegation, subTask.id).includes(user) === false)"
                                    style="min-width: 200px;"
                                >
                                    <template v-slot:option="{option}">
                                        <div style="text-transform: capitalize; display: flex; gap: 13px; text-wrap: nowrap;">
                                            <font-awesome-icon 
                                                v-if="store.getters['images/getProfilePic'](`${option.id}_50x50`) == undefined ||
                                                    store.getters['images/getProfilePic'](`${option.id}_50x50`) == ''"
                                                :key="index"
                                                class="profile-pic" style="border-radius: 100%; width: 16px; height: 16px;"
                                                :icon="['fas', 'user']"
                                            ></font-awesome-icon>

                                            <img v-else :src="store.getters['images/getProfilePic'](`${option.id}_50x50`)"
                                                loading="lazy" style="width: 22px; height: 22px; border-radius: 100%;"
                                            >

                                            {{ option.firstName.toLowerCase() }} {{ option.lastName.toLowerCase() }}
                                        </div>
                                    </template>
                                </vue-multiselect>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <sub-task-create
                v-else
                :task-id=props.editTaskId
                :sub-task-id=subTask.id
                :sub-task-description="subTask.description"
                @done="state.subTaskEdit = ''"
                @canceled="state.subTaskEdit = ''"
            />
        </div>
    </div>
</div>
</template>

<style scoped>
@import '../assets/stylesheet/sub-tasks-status-indicators.css';
.sub-task-ele {
    border: solid 1px #e0e0e0;
    border-left: solid 3px;
    background-color: white;
    padding: 6px;
    border-radius: 6px;
    transition: border-width 200ms;
}
.sub-task-ele:hover {
    border-left: solid 13px;
}
.sub-task-ele .controls,
.sub-task-add-tag {
    color: #676a6c;
    padding: 3px;
    border-radius: 3px;
    cursor: pointer;
    visibility: hidden;
}
.sub-task-ele:hover .controls,
.sub-task-ele:hover .sub-task-add-tag {
    visibility: visible;
}
.sub-task-ele .controls:hover {
    background-color: rgba(73, 74, 75, 0.2);
}
.sub-task-delegation-tree {
    display: flex; 
    align-items: center; 
    gap: 13px;
}
.delegation-link {
    display: flex; 
    align-items: center; 
    gap: 5px;
}
.delegation-link>.remove {
    padding: 1px 3px;
    display: none;
    cursor: pointer;
    border-radius: 3px;
}
.delegation-link:hover>.remove {
    display: inline;
}
.delegation-link>.remove:hover,
.sub-task-delegation-add:hover,
.sub-task-add-tag:hover {
    background-color: rgba(73, 74, 75, 0.2);
}
.sub-task-add-btn:hover {
    padding: 0 6px;
    background-color: white;
}

.sub-task-delegation-add,
.sub-task-add-btn {
    cursor: pointer; 
    text-align: center; 
    display: flex;
    align-items: center; 
    justify-content: center;
    height: 18px;
    width: 18px;
    border: solid 1px #676a6c;
    border-radius: 9px;
}
.sub-task-add-btn-text {
    display: none;
}
.sub-task-add-btn:hover .sub-task-add-btn-text {
    display: inline;
    margin: 0 6px;
}
.sub-task-delegation-add-arrow,
.sub-task-delegation-add {
    visibility: hidden;
}
.sub-task-ele>.remove {
    visibility: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.sub-task-grid:hover>.remove,
.sub-task-ele:hover .sub-task-delegation-add,
.sub-task-ele:hover .sub-task-delegation-add-arrow {
    visibility: visible !important;
}
.sub-task.text.done,
.sub-task.text.cancel {
    text-decoration: line-through;
    color: rgba(73, 74, 75, 0.5);
}
.sub-task.text {
    cursor: pointer;
}
</style>
<style>
.sub-task-status .multiselect {
    max-width: 200px;
}
.sub-task-ele .multiselect__content-wrapper {
    display: block !important;
}
</style>