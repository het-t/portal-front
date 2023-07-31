<template>
    <div>
        <div class="card">
            <form class="pt24 pb24 pr24 pl24">
                <div>
                    <div class="row" style="padding-top: 0;">
                        <label for='task-title' class="labels c1">title</label>
                        <input v-model="taskState.title" type="text" id="task-title">
                    </div>

                    <div class="row mt8">
                        <label for='task-client' class="labels c1">client</label>
                        <VueMultiselect
                            id='task-client'
                            v-model="taskState.client"
                            :options="getClients"
                            :custom-label="({name}) => `${name}`"
                            track-by="id"
                            placeholder=""
                        >
                            <template #noResult>
                                Oops! No client found. Consider creating new client
                            </template>
                        </VueMultiselect>
                    </div>

                    <div class="row mt8">
                        <label for='task-coordinator' class="labels c1">co-ordinator</label>
                        <VueMultiselect
                            multiple
                            class="options-list multiselect__tag_bg"
                            id='task-coordinator'
                            v-model="taskState.coordinators"
                            placeholder=""
                            :options="getUsers"
                            :custom-label="(({firstName, lastName, id}) => `${firstName} ${lastName} (${id})`)"
                            track-by="id"
                        >
                            <template #noResult>
                                Oops! No user found. Consider creating new user
                            </template>

                            <template v-slot:option="props">
                                <span class="p0 m0" style="height: 0 !important; width: 0 !important;" :class="props.option.isActive == 0 ? 'not-active' : ''">
                                    {{props.option.firstName}} {{props.option.lastName}} ({{props.option.id}})
                                </span>
                            </template>
                        </VueMultiselect>
                    </div>

                    <div class="row mt8">
                        <label for='task-tasks' class="labels c1">template</label>
                        <VueMultiselect
                            id='task-tasks'
                            v-model="taskState.template"
                            placeholder=""
                            :options="getTaskMasters"
                            :custom-label="({title}) => `${title}`"
                            track-by="id"
                        >
                            <template #noResult>
                                Oops! No task-master found. Consider creating new task-master
                            </template>
                        </VueMultiselect>
                    </div>

                    <div v-show="state.editing === true">
                        <div class="row mt8">
                            <label for='contactEmail' class="labels c1">Email</label>
                            <input :value="taskState.clientContact?.conEmail" id='contactEmail' disabled>
                        </div>

                        <div class="row mt8">
                            <label for='contactPhone' class="labels c1">Phone</label>
                            <input :value="taskState.clientContact?.conPhone" id='contactPhone' type="text" disabled>
                        </div>

                        <div ref="UsersExtra" style="display: inline;" v-show="popState.visible === true">
                            <div class="row mt8">
                                <label for='extraAssignTo' class="labels c1">Assign To</label>
                                <VueMultiselect
                                    multiple
                                    class="options-list multiselect__tag_bg"
                                    id='extraAssignTo'
                                    v-model="popState.assignTo"
                                    placeholder=""
                                    :options="getUsers"
                                    :custom-label="(({firstName, lastName, id}) => `${firstName} ${lastName} (${id})`)"
                                    track-by="id"
                                >
                                    <template #noResult>
                                        Oops! No user found. Consider creating new user
                                    </template>

                                    <template v-slot:option="props">
                                        <span class="p0 m0" :class="props.option.isActive == 0 ? 'not-active' : ''">
                                            {{props.option.firstName}} {{props.option.lastName}} ({{props.option.id}})
                                        </span>
                                    </template>
                                </VueMultiselect>
                            </div>

                            <div class="row mt8">
                                <label class="labels c1" for='extraStatus'>Status</label>
                                <VueMultiselect
                                    v-model="popState.status"
                                    :options="subTasksStatuses"
                                    :custom-label="({name}) => name"
                                    :multiple="false"
                                    :allowEmpty="false"
                                    track-by="id"
                                    placeholder=""
                                    class="options-list multiselect__tag_bg"
                                >
                                    <template #noResult>
                                        Oops! No client found. Consider creating new client
                                    </template>
                                </VueMultiselect>
                            </div>

                            <div class="row mt8">
                                <label class="labels c1" for='extraCost'>Cost</label>
                                <input id='extraCost' v-model="popState.cost" type="number">
                            </div>

                            <div class="row mt8">
                                <label class="labels c1" for='sub-tasks-tags'>Tags</label>
                                <VueMultiselect
                                    id='sub-tasks-tags'
                                    v-model="popState.tags"
                                    @tag="createNewTag($event, task)"
                                    :options="subTasksTagsInStore"
                                    :custom-label="(obj) => obj"
                                    :taggable="true"
                                    tag-placeholder="Add this as new tag"
                                    :multiple="true"
                                    :allow-empty="true"
                                    track-by="id"
                                    placeholder=""
                                    class="multiselect__tag_bg"
                                >
                                </VueMultiselect>
                            </div>

                            <div class="row mt8">
                                <label class="labels c1" for='extraComments'>Comments</label>
                                <input id='extraComments' v-model="popState.comments" type="text">
                            </div>
                        </div>
                    </div>

                    <div class="row mt8" v-if="rightCheck('see_pricing') == true">
                        <label for='task-cost' class="labels c1">fees</label>
                        <input type="number" v-model="taskState.cost" id='task-cost'>
                    </div>

                    <div class="row mt8">
                        <label for='task-description' class="labels c1">description</label>
                        <textarea
                            v-model="taskState.description"
                            name="task-description"
                            id='task-description'
                            cols="30" rows="5"
                        ></textarea>
                    </div>

                </div>

                <div class="flex mt16">
                    <input v-model="taskState.saveAsTemplate" type="checkbox" id='save-task-template' class="save-task-template">
                    <label for='save-task-template'>save task template for future use </label>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { computed,  onMounted, reactive,  defineProps, defineEmits, watch } from 'vue'
    import { useStore } from 'vuex'
    import rightCheck from '@/helpers/RightCheck'
    import VueMultiselect from 'vue-multiselect'

    const props = defineProps({
        editTaskId: {
            type: Number,
            default: null
        },
        save: {
            type: Boolean,
            default: false
        }
    })

    const state = reactive({
        notifySaveEvent: false,
        editing: false,
        disableButtons: false
    })

    const taskState = reactive({
        template: '',
        title: '',
        description: '',
        client: '',
        cost: 0,
        coordinators: [],
        saveAsTemplate: false,
        clientContact: '',
    })

    const popState = reactive({
        visible: false,
        assignTo: [],
        comments: '',
        cost: 0,
        status: {id: 1, name: 'To Do'},
        tags: []
    })

    const store = useStore()

    const emits = defineEmits([
        'taskTemplate',
        'save'
    ])

    await componentPromiseGenerator()

    watch(
        () => taskState.template,
        (taskTemplate) => {
            if (taskTemplate?.id) {
                taskState.cost = taskTemplate.cost
                emits('taskTemplate', taskTemplate?.id)
            }
        },
        {deep: true}
    )

    watch(
        () => props.save,
        (save) => {
            if (save === true) {
                emits('save', {
                    taskTemplateId: taskState.template?.id,
                    title: taskState.title,
                    description: taskState.description,
                    cost: taskState.cost,
                    clientId: taskState.client?.id,
                    coordinatorsIds: taskState.coordinators?.map((user) => user.id),
                    saved: taskState.saveAsTemplate
                })
            }
        }
    )

    const subTasksStatuses = computed(() => store.getters['tasks/getSubTasksStatuses'])
    const getTaskDataFromStore = computed(() => {
        return store.getters['tasks/getData'](props.editTaskId)
    })

    const getTaskMasters = computed(() => store.getters['tasksMaster/getList']({
        filters: ['null', 'null']
    }))
    const getUsers = computed(() => store.getters['users/getList']({
        filters: ['null', 'null', 'null']
    }))
    const getClients = computed(() => store.getters['clients/getList']({
        filters: ['null', 'null', 'null', 'null', 1]
    }))
    const subTasksTagsInStore = computed(() => store.getters['tasks/getSubTasksTags'])

    onMounted(() => {
        store.dispatch('clients/fetchList', {all: true})
        store.dispatch('tasksMaster/fetchList', {all: true}),
        store.dispatch('users/fetchList', {all: true})

        if (props.editTaskId) {
            const taskData = getTaskDataFromStore.value
            state.editing = true

            if (taskData !== undefined && taskData !== '') {
                let {
                    taskTemplateId,
                    title,
                    description,
                    cost,
                    clientId,
                    coordinatorsIds
                } = taskData

                taskState.title = title
                taskState.description = description
                taskState.cost = cost
                taskState.coordinators = getUsers.value.filter((user) => {
                    return coordinatorsIds.includes(user.id)
                })
                taskState.template = getTaskMasters.value.find(task => task.id === taskTemplateId)
                taskState.client = getClients.value.find(client => client.id === clientId)
            }
        }
    })

    function createNewTag(newTag, task) {
        store.commit('tasks/setNewTag', {newTag, task})
    }

    function componentPromiseGenerator() {
        if (props.editTaskId) return store.dispatch('tasks/fetchData', {taskId: props.editTaskId})
        else return Promise.resolve()
    }
</script>

<style scoped>
@import "../assets/stylesheet/multiselect.css";
option, select {
    text-transform: capitalize;
}
.save-task-template {
    width: fit-content !important;
}
.labels {
    align-self: center;
}
.flex {
    display: flex;
    column-gap: 12px;
    align-items: center;
}
</style>