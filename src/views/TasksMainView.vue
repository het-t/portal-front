<template>
    <div class="tasks-main-view-top-bar">
        <div class="tabs-parent">
            <div class='tab active-tab'>
                Details
            </div>

            <div 
                @click="tabsState.subTasks = !tabsState.subTasks"
                :class="tabsState.subTasks === true ? 'active-tab' : ''"
                class='tab'
            >
                Sub-Tasks
            </div>

            <div 
                @click="tabsState.payments = !tabsState.payments"
                :class="tabsState.payments === true ? 'active-tab' : ''"
                class='tab'
            >
                Payments
            </div>

            <div 
                v-if="state.editing === true"
                @click="tabsState.stats = !tabsState.stats"
                :class="tabsState.stats === true ? 'active-tab' : ''"
                class="tab"
            >
                Statistics
            </div>

            <div 
                v-if="state.editing === true"
                @click="tabsState.logs = !tabsState.logs"
                :class="tabsState.logs === true ? 'active-tab' : ''"
                class='tab'
            >
                Logs
            </div>
        </div>

        <div class="actions">
            <button
                @click.prevent="state.save = true"
                class="button green"
            >Save</button>

            <button 
                class="button neutral"
                @click="getToListScreen"
            >Cancel</button>
        </div>
    </div>

    <div class="tasks-main-view-grid mt16">
        <Suspense>
            <TaskDetails
                @taskTemplate="taskTemplateIdFromTaskDetails = $event"
                @save="taskDetailsData = $event, ++dataCounter"
                :editTaskId=parseInt(route.params.taskId)
                :showActionBtns=state.editing
                :save=state.save
                style="flex: 0 0 calc(50% - 5px);"
            ></TaskDetails>
        </Suspense>

        <Suspense>
            <keep-alive>
                <TasksCreateSubTasks 
                    v-if="tabsState.subTasks === true"
                    :editTaskId=parseInt(route.params.taskId)
                    :taskMaster=taskTemplateIdFromTaskDetails
                    :save=state.save
                    @popUpVisibilityChanged="popUpVisibilityChanged($event)"
                    @save="subTasksData = $event, ++dataCounter"
                    style="flex: 0 0 calc(50% - 5px);"
                ></TasksCreateSubTasks>
            </keep-alive>
        </Suspense>

        <Suspense>
            <keep-alive>
                <TaskLogs
                    v-if="tabsState.logs === true"
                    :taskId=parseInt(route.params.taskId)
                    style="flex: 0 0 calc(50% - 7px); max-height: 660px;"
                ></TaskLogs>
            </keep-alive>
        </Suspense>
        
        <Suspense>
            <keep-alive>
                <TaskPayment 
                    v-if="tabsState.payments === true"
                    :taskId=parseInt(route.params.taskId)
                    :save="state.save"
                    @save="paymentsData = $event, ++dataCounter"
                    style="flex: 0 0 calc(50% - 7px); overflow-y: auto; overflow-x: hidden;"
                >
                </TaskPayment>
            </keep-alive>
        </Suspense>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import TaskDetails from "@/components/TaskDetails.vue";
import TaskPayment from "@/components/TaskPayment.vue";
import TaskLogs from "@/components/TaskLogs.vue";
import TasksCreateSubTasks from "@/components/TasksCreateSubTasks.vue";
import { useRoute, useRouter } from "vue-router";
import { tasks } from "../api";

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

const taskTemplateIdFromTaskDetails = ref(0);

onMounted(() => {
    if (route?.params?.taskId) {
        state.editing = true
        state.editTaskId = route.params.taskId
    }
    else tabsState.subTasks = true
})

const taskDetailsData = ref({})
const subTasksData = ref({})
const paymentsData = ref({})
const dataCounter = ref(0)

watch(
    () => dataCounter.value,
    (dataCounter) => {
        console.log(dataCounter)
        if (dataCounter === 3) {
            const {
                taskTemplateId,
                title,
                description,
                cost,
                clientId,
                coordinatorsIds,
                saved
            } = taskDetailsData.value

            let {
                subTasks,
            } = subTasksData.value

            const payments = paymentsData.value

            subTasks = subTasks.map((subTask) => {
                if (subTask.assignedTo?.length) {
                    subTask.assignedTo = subTask?.assignedTo?.map((user) => {
                        if (user?.id) return user.id
                    })
                }
                else subTask.assignedTo = []

                if (subTask.statusId?.id) subTask.statusId = subTask.statusId.id
                else subTask.statusId = 1
                
                return subTask
            })

            const args = {
                taskTemplateId,
                title,
                description,
                cost,
                clientId,
                coordinatorsIds: JSON.stringify(coordinatorsIds),
                saved,
                subTasks: JSON.stringify(subTasks),
                payments: JSON.stringify(payments)
            }

            if (state.editing === false) {
                tasks.create(args)
                .catch((err) => {
                    console.log(err)
                })
            }
            else if (state.editing === true) {
                args.removedSubTasks = JSON.stringify(subTasksData.value.removedSubTasks),
                args.taskId = state.editTaskId

                tasks.edit(args)
                .catch(err => console.log(err))
            }
            
        }
    }
)

const router = useRouter()

function getToListScreen() {
    router.push({name: 'tasks_list'})
}
</script>

<style scoped>
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