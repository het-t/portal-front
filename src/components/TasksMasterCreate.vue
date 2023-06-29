<template>
    <div>
        <div class="card">
            <div class="fg-wrapper mt16 pb16 pr16 pl16">
                <div class="fg pl16">
                    <form class="mb16">
                        <div>
                            <div class="row">
                                <label :for="'task-title'+props.taskMaster.id" class="labels c1">title</label>
                                <input v-model="state.title" type="text" :id='"task-title"+props.taskMaster.id'>
                            </div>

                            <div class="row mt8">
                                <label 
                                    :for="'task-master-cost'+props.taskMaster.id" 
                                    class="labels c1"
                                >cost</label>

                                <input 
                                    type="number" 
                                    :id="'task-master-cost'+props.taskMaster.id"
                                    v-model="state.cost"
                                >
                            </div>

                            <div class="row mt8">
                                <label 
                                    :for="'task-master-desc'+props.taskMaster.id" 
                                    class="labels c1"
                                >description</label>

                                <textarea 
                                    :name="'task-master-description'+props.taskMaster.id"
                                    :id="'task-master-description'+props.taskMaster.id"
                                    cols="30" 
                                    rows="5" 
                                    placeholder="Description"
                                    v-model="state.description"
                                ></textarea>
                            </div>

                            <div class="row mt8">
                                <label 
                                    :for="'task-master-task-status'+props.taskMaster.id"
                                    class="labels c1"
                                >modify tasks</label>
                                <VueMultiselect
                                    multiple
                                    class="options-list multiselect__tag_bg"
                                    :id="'task-master-task-status'+props.taskMaster.id"
                                    v-model="state.taskStatus"
                                    placeholder="Select Task-Statuses"
                                    :options="[{id: 1, status: 'In Progress'}, {id: 2, status: 'Unbilled'}, {id: 3, status: 'Billed'}]"
                                    track-by="id"
                                    label="status"
                                ></VueMultiselect>
                            </div>
                        </div>

                        <button 
                            :disabled="state.disabled === true" 
                            @click.prevent="changeFlag()" 
                            class="green mt16 button"
                        >save</button>

                        <button 
                            :disabled="state.disabled === true" 
                            @click.prevent="canceled()" 
                            class="neutral ml8 mt16 button"
                        >cancel</button>
                    </form>
                </div>

                <div class="vr"></div>

                <TasksCreateSubTasks 
                    :flag="state.flag"
                    rendering="sub_tasks_master"
                    :editTaskId="taskMaster.id"
                    :taskMaster="taskMaster"
                    @dataToSave="proceed($event)"
                    :uk="taskMaster.id"
                ></TasksCreateSubTasks>        
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, reactive, defineEmits } from 'vue';
import { tasksMaster } from '../api';
import TasksCreateSubTasks from './TasksCreateSubTasks.vue';
import VueMultiselect from 'vue-multiselect'

const emits = defineEmits(['editingCompleted'])
const props = defineProps({
    taskMaster: {
        type: Object
    }
})

const state = reactive({
    flag: false,
    disabled: false,
    cost: props.taskMaster.cost,
    description: props.taskMaster.description,
    title: props.taskMaster.title,
    taskStatus: []
})

function proceed({subTasks, removedSubTasks}) {
    state.disabled = true

    tasksMaster.edit({
        taskMasterId: props.taskMaster.id,
        title: state.title,
        description: state.description,
        cost: state.cost,
        subTasks: JSON.stringify(subTasks),
        removedSubTasks: JSON.stringify(removedSubTasks),
        taskStatus: JSON.stringify(state.taskStatus?.map((status) => status.id.toString()))
    })
    .then(() => {
        emits("editingCompleted", 2)
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => state.disabled = false)
}

function canceled() {
    emits("editingCompleted", 1)
}

function changeFlag() {
    state.flag = true
}
</script>