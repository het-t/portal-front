<script setup>
import { reactive, ref, defineProps, inject, nextTick, onMounted } from "vue";
import { useStore } from "vuex";
import { tasks } from "@/api/index.js";

const store = useStore()
const toast = inject('toast')

const newSubTaskDescription = ref(null)

const props = defineProps({
    taskId: {
        type: Number
    },
    subTaskId: {
        type: Number
    },
    subTaskDescription: {
        type: String
    }
})

const state = reactive({
    disableButtons: false,
    newSubTaskDescription: '',
    editing: false
})

const emit = defineEmits([
    'done',
    'canceled'
])

onMounted(() => {
    nextTick(() => {
        if (!isNaN(props.subTaskId)) {
            state.editing = true
            newSubTaskDescription.value.innerText = props.subTaskDescription
        }

        newSubTaskDescription.value.focus()
    })  
})

function addSubTask() {
    const subTaskDescription = newSubTaskDescription.value.innerText
    state.disableButtons = true

    tasks.addSubTask({
        taskId: props.taskId,
        description: subTaskDescription
    })
    .then((res) => {
        store.commit('tasks/addNewSubTask', {
            taskId: props.taskId,
            data: {
                id: res.data.createdSubTaskId,
                description: subTaskDescription,
                status: {id: 1, name: 'to do'},
                delegation: []
            }
        })
        toast.success('Success')
        emit('done')
    })
    .catch(() => {
        toast.error(`Oops! We can't perform this action right now`);
    })
    .finally(() => {
        state.disableButtons = false
        state.newSubTaskDescription = ''
    })
}

function cancel() {
    state.newSubTaskDescription = ''
    emit('canceled')
}

function editSubTask() {
    const subTaskDescription = newSubTaskDescription.value.innerText
    state.disableButtons = true

    tasks.editSubTask({
        taskId: props.taskId,
        subTaskId: props.subTaskId,
        description: subTaskDescription
    })
    .then(() => {
        toast.success('Saved')
        store.commit('tasks/editSubTaskDescription', {
            taskId: props.taskId,
            subTaskId: props.subTaskId,
            description: subTaskDescription
        })

        store.commit('myTasks/editSubTaskDescription', {
            subTaskId: props.subTaskId,
            description: subTaskDescription
        })

        emit('done')
    })
    .catch(() => {
        toast.error(`Oops! We can't perform this action right now`);
    })
}
</script>

<template>
    <div 
        class="sub-task-ele"
    >
        <div 
            class="sub-task text" 
            style="display: flex; gap: 6px; align-items: center;"
        >
            <div spellcheck="off" contenteditable="true" ref="newSubTaskDescription"></div>
        </div>

        <div style="margin-top: 13px;">
            <button 
                @click="state.editing === false ? addSubTask() : editSubTask()"
                class="green button"
                :disabled="state.disableButtons === true"
            >save</button>

            <button 
                @click="cancel" 
                class="neutral button"
                style="margin-left: 6px;"
                :disabled="state.disableButtons === true"
            >cancel</button>
        </div>
    </div>
</template>

<style scoped>
div[contenteditable="true"]:empty:after {
    content: 'Type Here';
}
.button {
    padding: 6px !important;
}
</style>