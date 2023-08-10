<template>
    <div class="card pt24 pb24 pr24 pl24" style="max-width: 500px;">
        <form>
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

            <div class="row mt8" v-if="rightCheck('see_pricing') == true">
                <label for='task-cost' class="labels c1">fees</label>
                <input type="number" v-model="taskState.fees" id='task-cost'>
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
        </form>

        <div class="mt24" style="display: flex; gap: 12px;">
            <button 
                @click.prevent="createTask"
                class="button green"
                :disabled="state.disableButtons === true"
            >save</button>

            <button 
                @click.prevent="cancel"
                class="button neutral"
                :disabled="state.disableButtons === true"
            >cancel</button>
        </div>
    </div>
</template>

<script setup>
    import { computed,  inject,  onMounted, reactive } from 'vue'
    import { useStore } from 'vuex'
    import rightCheck from '@/helpers/RightCheck'
    import VueMultiselect from 'vue-multiselect'
    import { tasks } from '../api'
    import { useRouter } from 'vue-router'

    const state = reactive({
        disableButtons: false
    })

    const taskState = reactive({
        template: '',
        title: '',
        description: '',
        client: '',
        fees: 0,
    })

    const store = useStore()

    const getTaskMasters = computed(() => store.getters['tasksMaster/getList']({
        filters: ['null', 'null']
    }))
    const getClients = computed(() => store.getters['clients/getList']({
        filters: ['null', 'null', 'null', 'null', 1]
    }))

    const router = useRouter()
    const toast = inject('toast')

    function createTask() {
        state.disableButtons = true
        tasks.create({
            title: taskState.title,
            description: taskState.description,
            client: taskState.client?.id ? taskState.client.id : null,
            fees: rightCheck('see_pricing') === true ? taskState.fees : 0,
            templateId: taskState.template?.id ? taskState.template.id : null
        })
        .then((res) => {
            toast.success('created')

            router.push({
                name: 'edit_task',
                params: {
                    taskId: res.data.createdTaskId
                }
            })
        })
        .catch(() => {
            toast.error(`Oops! We can't perform this action right now`)
        })
        .finally(() => {
            state.disableButtons = false
        })
    }

    function cancel() {
        router.push({name: 'tasks_list'})
    }

    onMounted(() => {
        store.dispatch('clients/fetchList', {all: true})
        store.dispatch('tasksMaster/fetchList', {all: true}),
        store.dispatch('users/fetchList', {all: true})

        console.log(state.disableButtons)
    })

    // function createNewTag(newTag, task) {
    //     store.commit('tasks/setNewTag', {newTag, task})
    // }
</script>

<style scoped>
@import "../assets/stylesheet/multiselect.css";
option, select {
    text-transform: capitalize;
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