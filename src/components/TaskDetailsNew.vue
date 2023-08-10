<script setup>
import {defineProps, computed} from 'vue'
import {useStore} from 'vuex';

const props = defineProps({
    editTaskId: {
        type: Number,
        default: null
    }
})

const store = useStore()
componentPromiseGenerator()

const getTaskDataFromStore = computed(() => {
    return store.getters['tasks/getData'](props.editTaskId)
})

function componentPromiseGenerator() {
    return store.dispatch('tasks/fetchData', {taskId: props.editTaskId})
}
</script>

<template>
    <div v-if="getTaskDataFromStore" class="main-color" style="background-color: white; padding: 13px; border: solid 1px #e0e0e0; text-transform: capitalize;">

        <div>
            <div style="display: flex; align-items: center; gap: 13px; margin-bottom: 6px;">
                <span class="f25" style="font-weight: 600;">
                    {{ getTaskDataFromStore.title?.toLowerCase() }}
                </span>

                <div class="task-status" :class="getTaskDataFromStore.status.replace(' ', '')">
                    <div class="indicator"></div>
                    {{ getTaskDataFromStore.status?.toLowerCase() }}
                </div>
            </div>

            <div style="display: flex; gap: 13px;">
                <span style="font-weight: 500;">
                    {{ getTaskDataFromStore.description ? getTaskDataFromStore.description.toLowerCase() : 'N/A'}}
                </span>

                <span>
                    <font-awesome-icon :icon="['fas', 'clipboard-list']"></font-awesome-icon>
                    {{ getTaskDataFromStore.taskTemplate ? getTaskDataFromStore.taskTemplate?.toLowerCase() : 'N/A'}}
                </span>
            </div>
        </div>

        <div class="f13" style="margin-top: 15px;">
            <span>
                <font-awesome-icon :icon="['fas', 'industry']"></font-awesome-icon>
                {{getTaskDataFromStore.client ? getTaskDataFromStore.client.toLowerCase() : 'N/A'}}
            </span>

            <div style="display: flex; gap: 13px; margin-top: 3px;">
                <span>
                    <font-awesome-icon :icon="['fas', 'user-tie']"></font-awesome-icon>
                    {{getTaskDataFromStore.contactPerson ? getTaskDataFromStore.contactPerson?.toLowerCase() : 'N/A'}}
                </span>

                <span style="text-transform: none !important;">
                    <font-awesome-icon :icon="['fas', 'envelope']"></font-awesome-icon>
                    {{ getTaskDataFromStore.contactEmail ? getTaskDataFromStore.contactEmail?.toLowerCase() : 'N/A' }}
                </span>

                <span>
                    <font-awesome-icon :icon="['fas', 'phone']"></font-awesome-icon>
                    {{ getTaskDataFromStore.contactPhone ? getTaskDataFromStore.contactPhone?.toLowerCase() : 'N/A' }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '../assets//stylesheet/task-status-tag.css';

.main-color {
    color: #676a6c;
}
.f25 {
    font-size: 25px;
}
.f13 {
    font-size: 13px;
}
svg {
    color: #aeaeae;
    margin: 0 4px;
}
</style>