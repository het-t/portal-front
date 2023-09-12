<template>
    <div class="task-main-view">
        <div style="min-width: 70%;">
            <task-details-new
                :edit-task-id="parseInt(route.params.taskId)"
            ></task-details-new>

            <suspense>
                <task-team
                    :edit-task-id="parseInt(route.params.taskId)"
                ></task-team>
            </suspense>
        
            <suspense>
                <sub-tasks-list-new
                    :edit-task-id="parseInt(route.params.taskId)"
                ></sub-tasks-list-new>
            </suspense>

            <div class="logs-payments-section">
                <task-logs-new 
                    v-if="rightCheck('see_pricing')"
                    :task-id="parseInt(route.params.taskId)"
                    style="height: 300px; background-color: white; overflow-x: hidden; overflow-y: auto; padding: 13px; border: solid 1px #e0e0e0;;"
                />

                <task-payment
                    :task-id="parseInt(route.params.taskId)"
                    style="background-color: white; border: solid 1px #e0e0e0;"
                />
            </div>
        </div>

        
        <div style="flex-grow: 1;">
            <task-comments
                :task-id="parseInt(route.params.taskId)"
                style="min-width: 300px; padding: 13px; background-color: white; border: solid 1px #e0e0e0;"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import TaskDetailsNew from "@/components/TaskDetailsNew.vue";
import SubTasksListNew from "@/components/SubTasksListNew.vue";
import TaskTeam from "@/components/TaskTeam.vue";
import TaskPayment from "@/components/TaskPayment.vue";
import TaskLogsNew from '@/components/TaskLogsNew.vue';
import TaskComments from "@/components/TaskComments.vue";
import { useRoute } from "vue-router";
import rightCheck from "@/helpers/RightCheck";

const tabsState = reactive({
    payments: false,
    logs: false,
    subTasks: false,
    stats: false
})

const state = reactive({
    editTaskId: '',
    editing: false,
    save: false
})


const route = useRoute()

onMounted(() => {
    if (route?.params?.taskId) {
        state.editing = true
        state.editTaskId = route.params.taskId
    }
    else tabsState.subTasks = true
})
</script>

<style scoped>
.task-main-view {
    width: 100%; 
    display: flex; 
    gap: 13px; 
    position: relative; 
    top: 0; 
    right: 0;
}
.logs-payments-section {
    display: flex; 
    gap: 13px; 
    margin-top: 13px;
}
@media screen and (max-width: 1150px) {
    .task-main-view {
        flex-direction: column;
    }
    .logs-payments-section {
        flex-direction: column-reverse;
    }
}
.tasks-main-view-top-bar {
    color: #676a6c;
    display: grid;
    height: 100%;
    width: 100%;
    display: flex; 
    justify-content: space-between;
}
.tasks-main-view-top-bar .tabs-parent {
    display: flex; 
    gap: 8px; 
    align-items: center;
}
.tasks-main-view-top-bar .actions {
    display: flex; 
    gap: 8px; 
    align-items: center;
}
.tasks-main-view-top-bar .actions .button {
    padding: 6px 18px !important;
}
.tasks-main-view-top-bar .tab {
    cursor: pointer;
    padding: 6px 18px;
    border: solid 1px #d6d9db;
    border-radius: 24px;
    text-align: center;
    background-color: white;
}
.tasks-main-view-top-bar .tab:hover,
.tasks-main-view-top-bar .tab.active-tab {
    border-color: #c2c2c2;
}
.tasks-main-view-top-bar .tab.active-tab {
    font-weight: bold;
}
.tasks-main-view-grid {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    padding-bottom: 36px;
}
.tasks-main-view-grid>div {
    flex: 1 0 calc(50%);
    overflow-x: hidden;
    overflow-y: auto;
    height: 550px;
}
</style>