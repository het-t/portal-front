<script setup>
import { defineProps, inject, reactive, computed, onMounted, nextTick } from 'vue';
import {tasks, tags} from '@/api/index.js';
import VueMultiselect from 'vue-multiselect'
import swal from "sweetalert";
import flatOutDelegation from "@/helpers/flatOutSubTaskDelegation";
import { useStore } from 'vuex';
import SubTaskCreate from "@/components/SubTaskCreate.vue";
import { useRouter } from 'vue-router';

const toast = inject('toast')
const store = useStore()
const route = useRouter()

const props = defineProps({
    subTask: {
        type: Object
    },
    showPin: {
        type: Boolean
    }
})

const state = reactive({
    subTask: '',
    delegationCache: {},
    subTaskEdit: '',
})

const emits = defineEmits([
    'statusChanged',
    'deleted',
    'tagAdded',
    'tagRemoved',
    'delegationAdded',
    'delegationRemoved',
    'pinChanged'
])

const getVisibility = computed(() => 
    store.getters['visibility/getSubTasksOptionsVisibility']
)

const getUsers = computed(() =>
    store.getters['users/getList']({})
)

const getSubTasksStatuses = computed(() =>
    store.getters['tasks/getSubTasksStatuses']
)

const getTags = computed(() =>
    store.getters['tasks/getSubTasksTags']
)

onMounted(() => {
    nextTick(() => {
        state.subTask = props.subTask
    })
})

function componentPromise(force = false) {
    return store.dispatch('tasks/fetchSubTasks', {
        taskId: state.subTask.taskId,
        force
    })
    .catch(err => {
        console.log(err)
    })

}

function removeTag(tag, subTaskId) {
    state.tagsOptions = false

    tasks.removeTag({
        taskId: state.subTask.taskId,
        subTaskId,
        tagId: tag.id
    })
    .then(() => {
        emits('tagRemoved')
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

function addTag(tag, subTaskId) {
    state.tagsOptions = false

    tasks.addTag({
        taskId: state.subTask.taskId,
        subTaskId,
        tagId: tag.id
    })
    .then(() => {
        emits('tagAdded')
        toast.success('Saved')
    })
    .catch(() => {
        toast.error(`Oops! We can't perform this action right now`);
    })
}

function changeSubTaskStatus(e, subTaskId) {
    state.subTasksStatusesShow = ''
    tasks.changeSubTaskStatus({
        taskId: state.subTask.taskId,
        subTaskId,
        statusId: e.id
    })
    .then(() => {
        emits('statusChanged')
        setVisibility({status: false})
        return refetchTasks({
            taskId: state.subTask.taskId,
            list: true,
            details: true
        })
    })
    .finally(() => {
        return componentPromise(true)
    })
    .catch((err) => {
        console.log(err)
    })
}

function addDelegationLink(user, subTask) {
    state.subTaskDelegationOption = ''

    tasks.addDelegationLink({
        taskId: subTask.taskId,
        subTaskId: subTask.id,
        childUserId: user.id
    })
    .then(() => {
        emits('delegationAdded')
        if (!state.delegationCache[subTask.id]?.length) state.delegationCache[subTask.id] = []
        subTask.delegation = state.delegationCache[subTask.id].push(user)
    })
    .then(() => {
        state.subTaskDelegationOption = subTask.id
        return refetchTasks({
            taskId: subTask.taskId,
            list: true,
        })
    })
    .catch(err => {
        console.log(err)
    })
}

function removeDelegationLink(user, subTask) {
    swal({
        icon: 'warning',
        title: 'Alert',
        text: `Do you really want to remove "${user.firstName} ${user.lastName}"`,
        buttons: true,
        dangerMode: true
    })
    .then(value => {
        if (value == null) throw null
        emits('delegationRemoved')
        return tasks.removeDelegationLink({
            taskId: subTask.taskId,
            subTaskId: subTask.id,
            userId: user.id
        })
    })
    .then(() => {
        const index = state.delegationCache[subTask.id].indexOf(user)
        state.delegationCache[subTask.id].splice(index, 1)
        subTask.delegation = state.delegationCache[subTask.id]
    })
    .then(() => {
        return refetchTasks({
            taskId: subTask.taskId,
            list: true,
        })
    })
    .catch(err => {
        console.log(err)
    })
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
        emits('deleted')
        return tasks.deleteSubTask({
            taskId: state.subTask.taskId,
            subTaskId
        })
    })
    .then(() => {
        toast.success(`Saved`)
        return componentPromise(true)
    })
    .then(() => {
        return refetchTasks({
            taskId: state.subTask.taskId,
            list: true,
        })
    })
    .catch((err) => {
        if (err !== null) 
        toast.error(`Oops! We can't perform this action right now`);
    })
}

function refetchTasks(options) {
    if (options.details === true) {
        store.dispatch('tasks/fetchData', {
            taskId: state.subTask.taskId,
            force: true
        })
    }

    options.details = false
    store.commit('tasks/flush', options)
}

function setVisibility(option) {
    store.commit('visibility/setSubTasksOptionsVisibility', option)
}

function changeSubTaskPinStatus(subTask) {
    tasks.changeSubTaskPinStatus({
        taskId: subTask.taskId,
        subTaskId: subTask.id,
        isPinned: (subTask.isPinned == false) ? true : false
    })
    .then(() => {
        subTask.isPinned = (subTask.isPinned == false) ? true : false
        toast.success('Success')
        emits('pinChanged')
    })
    .catch((err) => {
        console.log(err)
        toast.error(`Oops! We can't perform this action right now`)
    })
}
</script>

<template>
<div 
    v-if="state.subTaskEdit !== subTask.id"
    @click.stop.self="setVisibility({status: subTask.id})"
    :class="subTask.status?.name?.replaceAll(' ', '')?.toLowerCase()"
    class="sub-task-ele"
    style="display: flex; align-items: center; gap: 6px;"
>
    <div
        style="margin-left: 6px; margin-bottom: 13px; margin-top: 6px; display: flex; flex-direction: column; gap: 3px;"
        v-if="state.subTask !== ''"
    >
        <div>
            <!-- sub-task status options -->
            <div
                style="display: flex; align-items: center;"
            >
                <vue-multiselect
                    v-if="getVisibility.status == state.subTask.id"
                    v-model="state.subTask.status"
                    :options="getSubTasksStatuses"
                    @select="changeSubTaskStatus($event, state.subTask.id)"
                    style="position: absolute; max-width: 200px;"
                    :allow-empty="false"
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

            <!-- sub-task title and controls-->
            <div
                class="sub-task text"
                :class="state.subTask?.status?.name?.replaceAll(' ', '')?.toLowerCase()"
                style="display: flex; gap: 6px; align-items: center;"
            >
                <div>
                    {{ state.subTask.description }}
                </div>
              
                <div class="secondary-text" style="margin-right: 7px;">
                    #{{ state.subTask.id }}
                </div>
                
                <span 
                    @click.self.stop="route.push({name: 'edit_task', params: {taskId: subTask.taskId}})" 
                    class="secondary-text" v-if="state.subTask.task !== ''"
                    style="cursor: pointer;"
                >
                    {{ state.subTask.client ? `${state.subTask.client}'s` : '' }} 
                    {{ state.subTask.task }}
                </span>

                <font-awesome-icon
                    @click.stop="state.subTaskEdit = subTask.id"
                    class="controls"
                    :icon="['fas', 'pencil']"
                />

                <div v-if="props.showPin === true">
                    <font-awesome-icon 
                        v-if="subTask.isPinned == false"
                        @click.stop="changeSubTaskPinStatus(subTask)"
                        class="controls"
                        :icon="['far', 'bookmark']"
                    />
    
                    <font-awesome-icon 
                        v-else
                        @click.stop="changeSubTaskPinStatus(subTask)"
                        class="controls"
                        :icon="['fas', 'bookmark']"
                    />
                </div>

                <font-awesome-icon
                    @click.stop="subTaskDelete(state.subTask.id, state.subTask.description)"
                    class="controls"
                    :icon="['fas', 'trash']"
                />
            </div>
        </div>

        <!-- sub-task-status -->
        <div>
            <div
                style="display: flex; gap: 6px; align-items: center; margin-top: 6px; width: fit-content;"
                @click.prevent.stop="setVisibility({status: state.subTask.id})"
            >
                <div
                    class="sub-task-status indicator"
                    :class="state.subTask.status?.name?.replaceAll(' ', '')?.toLowerCase()"
                ></div>

                <span>{{state.subTask.status?.name}}</span>
            </div>
        </div>

        <!-- sub-task tags -->
        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <div
                v-for="(tag, index) in state.subTask?.tags"
                :key="index"
                class="sub-task-tag"
            >
                <div style="text-wrap: nowrap;">
                    <span style="text-transform: capitalize;">#{{ tag.name }}</span>
                </div>

            </div>

            <div v-if="!state.subTask.tags?.length">
                Add Tag
            </div>

            <div @click.stop="setVisibility({tags: state.subTask.id})" class="sub-task-add-tag">
                <font-awesome-icon
                    v-show="getVisibility.tags !== subTask.id"
                    :icon="['fas', 'pencil']"
                />

                <vue-multiselect
                    v-model="state.subTask.tags"
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
                    v-if="getVisibility.tags == subTask.id"
                >
                </vue-multiselect>
            </div>
        </div>

        <!-- sub-task delegation -->
        <div style="display: flex; align-items: center; gap: 3px; flex-wrap: wrap;">
            <div
                v-for="(user, index) in flatOutDelegation(state.subTask.delegation, state.subTask.id, state.delegationCache)"
                :key="index"
                class="delegation-link"
            >
                <div v-if="index !== 0" style="width: 26px; border-bottom: 2px dotted rgba(75, 74, 73, 0.5);"></div>

                <div>
                    <font-awesome-icon
                        v-if="store.getters['images/getProfilePic'](`${user?.id}_50x50`) == undefined ||
                            store.getters['images/getProfilePic'](`${user?.id}_50x50`) == ''"
                        :key="index"
                        class="profile-pic" style="border-radius: 100%; width: 16px; height: 16px;"
                        :icon="['fas', 'user']"
                    ></font-awesome-icon>

                    <img v-else :src="store.getters['images/getProfilePic'](`${user.id}_50x50`)"
                        loading="lazy" style="width: 22px; height: 22px; border-radius: 100%;"
                    >
                </div>

                <div style="text-wrap: nowrap;">
                    <span>{{ user?.firstName?.toLowerCase() }} {{ user?.lastName?.toLowerCase() }}</span>
                </div>

                <font-awesome-icon class="remove" @click.prevent="removeDelegationLink(user, state.subTask)" :icon="['fas', 'xmark']" />
            </div>

            <div v-if="flatOutDelegation(state.subTask.delegation, state.subTask.id, state.delegationCache)?.length === 0">
                No Delegation Found
            </div>


            <div class="sub-task-delegation-add-arrow" style="width: 26px; border-bottom: 2px dotted rgba(75, 74, 73, 0.5);"></div>

            <!-- sub-task delegation options -->
            <div
                @click.stop="setVisibility({delegation: subTask.id})"
                class="sub-task-delegation-add"
            >
                <div>
                    <font-awesome-icon v-show="getVisibility.delegation != subTask.id" :icon="['fas', 'plus']"/>

                    <vue-multiselect
                        v-if="getVisibility.delegation === subTask.id"
                        @select="addDelegationLink($event, subTask)"
                        :custom-label="(user) => user.firstName + '' + user.lastName"
                        :options="getUsers.filter((user) => user.isActive === 1 && flatOutDelegation(subTask.delegation, subTask.id, state.delegationCache).includes(user) === false)"
                        style="min-width: 200px;"
                    >
                        <template v-slot:option="{option}">
                            <div style="text-transform: capitalize; display: flex; gap: 13px; text-wrap: nowrap;">
                                <font-awesome-icon
                                    v-if="store.getters['images/getProfilePic'](`${option.id}_50x50`) == undefined ||
                                        store.getters['images/getProfilePic'](`${option.id}_50x50`) == ''"
                                    :key="option.id+'_profile_pic'"
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
    :task-id=state.subTask.taskId
    :sub-task-id=state.subTask.id
    :sub-task-description="state.subTask.description"
    @done="state.subTaskEdit = ''"
    @canceled="state.subTaskEdit = ''"
/>
</template>

<style scoped>
@import '../assets/stylesheet/sub-tasks-status-indicators.css';

.sub-task-ele .secondary-text {
    color: rgba(73, 74, 75, 0.5);
}
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
    display: flex;
    justify-content: center;
    align-items: center;
}
.sub-task-ele:hover .controls,
.sub-task-ele:hover .sub-task-add-tag {
    min-width: 13px;
    height: 13px;
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
.sub-task-delegation-add {
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
.sub-task-status .multiselect {
    max-width: 200px;
}
.sub-task-ele:hover .sub-task-delegation-add,
.sub-task-ele:hover .sub-task-delegation-add-arrow {
    visibility: visible !important;
}
.sub-task.text.done,
.sub-task.text.cancel {
    text-decoration: line-through;
    color: rgba(73, 74, 75, 0.5);
}
.sub-task-status.indicator {
    width: 9px;
    height: 9px;
    border-radius: 5px;
    border: solid 1px #e0e0e0;
    cursor: pointer;
}
</style>

<style>
.sub-task-ele .multiselect__content-wrapper {
    display: block !important;
}
</style>