<script setup>
import { defineProps, computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import SubTaskCreate from "@/components/SubTaskCreate.vue";
import CardSubTask from "@/util/CardSubTask.vue"

const props = defineProps({
    editTaskId: Number
})

const store = useStore()

const subTasksMainWrapper = ref(null)

const state = reactive({
    subTaskDelegationEditing: false,
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

function componentPromise(force = false) {
    return store.dispatch('tasks/fetchSubTasks', {
        taskId: props.editTaskId,
        force
    })
    .catch(err => {
        console.log(err)
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
            style="border: solid 1px #e0e0e0; border-left: solid 3px; background-color: white; padding: 6px; border-radius: 6px;"
        />

        
        <div
            v-for="(subTask, index) in getSubTasks"
            :key="index"
        >
            <card-sub-task 
                v-if="state.subTaskEdit !== subTask.id"
                :subTask="subTask"
            />
        </div>
    </div>
</div>
</template>


<style scoped>
.sub-task-add-btn-text {
    display: none;
}
.sub-task-add-btn:hover .sub-task-add-btn-text {
    display: inline;
    margin: 0 6px;
}
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
.sub-task-add-btn:hover {
    padding: 0 6px;
    background-color: white;
}
</style>