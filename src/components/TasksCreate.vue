<template>
    <div>
        <div class="card">
            <div class="table-tabs">
                <button @click="openTab($event, 'details')" :ref='"defaultTab"+uk' class="button neutral tab">details</button>
                <button @click="openTab($event, 'logs')" class="button neutral tab">logs</button>
            </div>

            <div class="fg-wrapper mt16 pb16 pr16 pl16 hide" :ref='"details"+uk'>
                <div class="fg pl16">
                    <form class="mb16">
                        <div>
                            <div class="row">
                                <label :ref="('details'+uk+'focus')" :for="'task-title'+uk" class="labels c1">title</label>
                                <input v-model="taskTitle" type="text" :id='"task-title"+uk'>
                            </div>
                            
                            <div class="row mt8">
                                <label :for="'task-client'+uk" class="labels c1">client</label>
                                <vue-multiselect 
                                    :id="'task-client'+uk" 
                                    v-model="taskClient" 
                                    :options="getClients" 
                                    :custom-label="labelForClient" 
                                    track-by="id" 
                                    placeholder="Select Client"
                                >
                                    <template #noResult>
                                        Oops! No client found. Consider creating new client
                                    </template>
                                </vue-multiselect>
                            </div>

                            <div class="row mt8">
                                <label :for="'task-coordinator'+uk" class="labels c1">co-ordinator</label>

                                <vue-multiselect 
                                    multiple 
                                    class="options-list multiselect__tag_bg" 
                                    :id="'task-coordinator'+uk" 
                                    v-model="taskCoordinator" 
                                    placeholder="Select Coordinator" 
                                    :options="getUsers" 
                                    :custom-label="labelForCoordinator" 
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
                                </vue-multiselect>
                            </div>

                            <div class="row mt8">
                                <label :for="'task-tasks'+uk" class="labels c1">task</label>
                                <vue-multiselect 
                                    :id="'task-tasks'+uk" 
                                    v-model="taskMasterId" 
                                    placeholder="Select Task-Master" 
                                    :options="getTaskMasters" 
                                    :custom-label="labelForTaskMaster" 
                                    track-by="id"
                                >
                                    <template #noResult>
                                        Oops! No task-master found. Consider creating new task-master
                                    </template>
                                </vue-multiselect>
                            </div>

                            
                            <div v-show="editing">
                                <div class="row mt8">
                                    <label :for="'contactEmail'+uk" class="labels c1">Email</label>
                                    <input :value="clientContact?.conEmail" :id="'contactEmail'+uk" disabled>
                                </div>

                                <div class="row mt8">
                                    <label :for="'contactPhone'+uk" class="labels c1">Phone</label>
                                    <input :value="clientContact?.conPhone" :id="'contactPhone'+uk" type="text" disabled>
                                </div>    
                                
                                <div ref="UsersExtra" style="display: inline;" v-show="popupVisible">
                                    <div class="row mt8">
                                        <label :for="'extraAssignTo'+uk" class="labels c1">Assign To</label>
                                        <vue-multiselect 
                                            multiple 
                                            class="options-list multiselect__tag_bg" 
                                            :id="'extraAssignTo'+uk" 
                                            v-model="popAssignTo" 
                                            placeholder="Select user to assign" 
                                            :options="getUsers" 
                                            :custom-label="labelForCoordinator" 
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
                                        </vue-multiselect>
                                    </div>

                                    <div class="row mt8">
                                        <label class="labels c1" :for="'extraStatus'+uk">Status</label>
                                        <select :id="'extraStatus'+uk" v-model="popStatusId">
                                            <option v-for="(status) in subTaskStatuses" :value="status.id" :key="status.id">
                                                {{status.status}}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="row mt8">
                                        <label class="labels c1" :for="'extraCost'+uk">Cost</label>
                                        <input :id="'extraCost'+uk" v-model="popCost" type="number" placeholder="Cost">
                                    </div>

                                    <div class="row mt8">
                                        <label class="labels c1" :for="'extraComments'+uk">Comments</label>
                                        <input :id="'extraComments'+uk" v-model="popComments" type="text" placeholder="Comments">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row mt8" v-if="rightCheck('see_pricing') == true">
                                <label :for="'task-cost'+uk" class="labels c1">fees</label>
                                <input type="number" v-model="taskCost" :id="'task-cost'+uk">
                            </div>

                            <div class="row mt8">
                                <label :for="'task-description'+uk" class="labels c1">description</label>
                                <textarea v-model="taskDescription" name="task-description" :id="'task-description'+uk" cols="30" rows="5" placeholder="Description"></textarea>
                            </div>

                        </div>

                        <div class="flex mt16">
                            <input v-model="repeat" type="checkbox" :id='"recurring"+uk' class="recurring">
                            <label :for="'recurring'+uk">recurring</label>
                            <select v-if="repeat" v-model="taskRepeat" :id='"task-repeat"+uk' class="task-repeat p0 ml8">
                                <option value="year">every year</option>
                                <option value="month">every month</option>
                                <option value="day">every day</option>
                            </select>
                            <input v-if="repeat" v-model="taskRepeatOn" type="date" :id='"task-repeat-on"+uk' class="task-repeat p0 pl8 ml8">
                        </div>

                        <div class="flex mt16">
                            <input v-model="save" type="checkbox" :id="'save-task-template'+uk" class="save-task-template">
                            <label :for="'save-task-template'+uk">save task template for future use </label>
                        </div>

                        <button :disabled="disabled === true" @click.prevent="changeFlag()" class="green mt16 button">save</button>
                        <button :disabled="disabled === true" @click.prevent="canceled()" class="neutral ml8 mt16 button">cancel</button>
                    </form>
                </div>
                <div class="vr"></div>

                <TasksCreateSubTasks 
                    :uk="uk"
                    :flag="flag"
                    :editTaskId="editTaskId"
                    :taskMaster="taskMasterId"
                    @dataToSave="proceed($event)"
                    @popUpVisibilityChanged="popUpVisibilityChanged($event)"
                ></TasksCreateSubTasks>

            </div>
        </div>

        <div class="card hide" :ref="'logs'+uk">            
            <div class="mr16 ml16 mt16">
                <table>
                    <tr>
                        <th>user</th>
                        <th>action</th>
                        <th style="border-right: solid 1px #eeeeee;">sub-task</th>
                        <th>date</th>
                    </tr>

                    <tr v-for="(logObj, index) in taskLogs" :key="index"
                        class="tr">
                        <td>{{logObj.user}}</td>
                        <td>
                            {{(logObj.action + ' ' + logObj.key)}}
                            <span v-if="logObj.after != null">
                                to {{logObj.after}}
                            </span>
                            <span v-if="(logObj.before != null)">
                                from {{logObj.before}}
                            </span>
                        </td>
                        <td style="border-right: solid 1px #eeeeee;">{{logObj?.subTask != '_#_*&^' && logObj?.subTask ? logObj.subTask : "Not Available"}}</td>
                        <td>{{ new Date(logObj.timestamp).toLocaleString() }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert'
    import { tasks } from '@/api/index.js'
    import VueMultiselect from 'vue-multiselect'
    import rightCheck from '@/helpers/RightCheck'
    import TasksCreateSubTasks from './TasksCreateSubTasks.vue'

    export default {
        name: 'TasksCreate',
        props: ['editTaskId', 'uk'],
        components: {
            VueMultiselect,
            TasksCreateSubTasks
        },
        data() {
            return {
                flag: false,
                editing: false,
                taskMasterId: '',
                repeat: false,
                taskTitle: '',
                taskDescription: '',
                taskClient: '',
                taskCost: '',
                taskCoordinator: [],
                save: false,
                taskRepeat: '',
                taskRepeatOn: '',
                clientContact: '',

                taskLogs: [],
                disabled: false,

                popupVisible: false,
                popAssignTo: [],
                popComments: '',
                popCost: '',
                popStatusId: '',

                subTaskStatuses: [{id: 1, status: "hold"}, {id: 2, status: "to do"}, {id: 3, status: "in progress"}, {id: 4, status: "pending for approval"}, {id: 5, status: "done"}, {id: 6, status: "cancel"}, {id: 7, status: "pending with client"}, {id: 8, status: "signed documents awaited"}, {id: 9, status: "pending for DSC"}, {id: 10, status: 'reassigned'}, {id: 11, status: 'approved'}, {id: 12, status: "Pending before authority"}],
            }
        },
        computed: {
            taskData() {
                return this.$store.getters['tasks/getData'](this.editTaskId)
            },
            getTaskMasters() {
                return this.$store.getters['tasksMaster/getList']({
                    filters: ['null', 'null']
                })
            },
            getUsers() {
                return this.$store.getters['users/getList']({
                    filters: ['null', 'null', 'null']
                })
            },
            getClients() {
                return this.$store.getters['clients/getList']({
                    filters: ['null', 'null', 'null', 'null', 1]
                })
            }
        },
        methods: {
            rightCheck,
            labelForCoordinator({firstName, lastName, id}) {
                return `${firstName} ${lastName} (${id})`
            },
            labelForClient({name, id}) {
                return `${name} (${id})`
            },
            labelForTaskMaster({title, id}) {
                return `${title} (${id})`
            },
            openTab(e, newTab) {
                var tabs = e.target.parentElement.getElementsByClassName('tab')
                let curTab = [...tabs].find(tab => tab?.classList?.contains('tab-open') == true)
                curTab?.classList?.remove('tab-open')
                e?.target?.classList?.add('tab-open')
                this.$refs['details'+this.uk]?.classList?.add('hide')
                this.$refs['logs'+this.uk]?.classList?.add('hide')
                this.$refs[newTab+this.uk]?.classList?.remove('hide')
                this.$refs['details'+this.uk+'focus'].focus()
            },
            populateDataProperties(data) {
                const {
                    taskMasterId,
                    title,
                    description,
                    cost,
                    clientId,
                } = data

                const coordinatorIds = JSON.parse(data.coordinatorIds)
                const clientData = this.getClients.find(client => client.id == clientId)
                this.taskTitle = title
                this.taskDescription = description
                this.taskCost = cost
                
                if(coordinatorIds?.[0] !== null) {
                    this.taskCoordinator = coordinatorIds?.map((coordinatorId) => {
                        return this.getUsers.find(user => user.id == coordinatorId)
                    })
                }

                this.taskClient = clientData
                this.taskMasterId = this.getTaskMasters.find(task => task.id == taskMasterId)
                this.clientContact = clientData
            },
            changeFlag() {
                this.flag = true
            },
            popUpVisibilityChanged({visibility, subTask}) {
                this.popupVisible = visibility
                this.popAssignTo = subTask.assignedTo,
                this.popComments = subTask.comments
                this.popCost = subTask.cost
                this.popStatusId = subTask.statusId
            },
            proceed({subTasks, removedSubTasks}) {
                this.disabled = true

                subTasks?.map((subTask) => {
                    if(subTask.assignedTo?.length > 0) {
                        subTask.assignedTo = subTask.assignedTo.map((user) => {
                            if (user?.id) return user.id
                            else return user
                        })
                    }
                })

                this.taskCoordinator = 
                    this.taskCoordinator?.length > 0 ?
                    
                    this.taskCoordinator?.map((userObj) => {
                        if (userObj?.id) return userObj.id
                    })
                    :
                    []
                
                let args = {
                    saved: new Number(this.save),
                    taskId: this.editTaskId,
                    taskMasterId: this.taskMasterId,
                    title: this.taskTitle,
                    description: this.taskDescription,
                    cost: this.taskCost,
                    clientId: this.taskClient,
                    coordinatorIds: JSON.stringify(this.taskCoordinator),
                    subTasks: JSON.stringify(subTasks),
                    removedSubTasks: JSON.stringify(removedSubTasks),
                }

                let p

                if (subTasks?.length == 0 && this.popAssignTo.length === 0 && this.popComments == '' && this.popCost == '' && this.popStatusId == '') {
                    this.popupVisible = true

                    p = swal({
                        content: this.$refs['UsersExtra'],
                        buttons: true
                    })
                    .then((value) => {
                        if (value == null) throw null
                        else {
                            return {
                                assignedTo: this.popAssignTo.map(user => {
                                    if(user?.id) return user.id
                                }),
                                cost: this.popCost,
                                comments: this.popComments,
                                statusId: this.popStatusId
                            }
                        }
                    })
                    .then((value) => {
                        const subTasks = [{
                            description: '_#_*&^',
                            assignedTo: value.assignedTo,
                            statusId: value.statusId || 2,
                            comments: value.comments,
                            cost: value.cost,
                        }]
                        args.subTasks = JSON.stringify(subTasks)
                    })
                }
                else if (subTasks?.length == 1 && subTasks[0]?.description == '_#_*&^') {
                    subTasks[0].assignedTo = this.popAssignTo.map((user) => {
                        if(user?.id) return user.id
                    })
                    subTasks[0].comments = this.popComments
                    subTasks[0].statusId = this.popStatusId || 2
                    subTasks[0].cost = this.popCost
                        //check usability of this line
                    args.subTasks = JSON.stringify(this.subTasks)

                    p = Promise.resolve()
                }
                else {
                    p = Promise.resolve()
                }
                
                if (args.clientId?.id) {
                    args.clientId = args.clientId?.id
                }
                if (args.taskMasterId?.id) {
                    args.taskMasterId = args.taskMasterId.id
                }

                p.then(() => {
                    if (this.editing == true ) {
                        tasks.edit(args)
                        .then(() => {
                            this.$emit('editingCompleted', 1)
                            this.$toast.success(`Saved #${args.taskId}`)
                        })
                        .catch(err => {
                            this.$toast.error(`Oops! We can't perform this action right now`)
                            console.log(err)  
                        })
                        .finally(() => {
                            this.disabled = false
                        })
                    }
                    else {
                        tasks.create(args)
                        .then(() => {
                            this.$toast.success(`Saved`)
                            return this.$store.dispatch('tasks/fetchList', {
                                force: true
                            })
                        })
                        .then(() => {
                            this.$router.push({name: 'tasks_list'})
                         })
                        .catch(() => {
                            this.$toast.error(`Oops! We can't perform this action right now`)
                        })
                        .finally(() => {
                            this.disabled = false
                        })
                    } 
                })
                .catch(err => {
                    if (err == null) this.canceled()
                })
                this.$store.commit('myTasks/refetch')
            },
            canceled() {
                if (this.editing == true) this.$emit("editingCompleted", {force: true})
                else this.$router.push('/u/tasks/list')
            }
        },
        created() {

            //get all clients if not in store
            this.$store.dispatch('clients/fetchList', {all: true}),
            
            //get all tasksMaster if not in store
            this.$store.dispatch('tasksMaster/fetchList', {all: true}),
            
            //get all users if not in store 
            this.$store.dispatch('users/fetchList', {all: true})

            if (window.history.state.taskId != undefined || this.editTaskId != undefined){ 
                this.editing = true  
            }
        },
        mounted() {
            if (this.editing == true) {
                const taskData = (this['taskData'])?.taskData?.[0]
                const taskLogs = (this['taskData'])?.taskLogs

                if (taskData !== undefined && taskData !== '') {
                    this.populateDataProperties(taskData)
                    this.taskLogs = taskLogs
                }
            }

            this.$refs['defaultTab'+this.uk].click()
        },
    }
</script>

<style scoped>
@import "../assets/stylesheet/multiselect.css";

option, select {
    text-transform: capitalize;
}
.table-tabs {
    display: flex;
}
.tab {
    padding: auto;
    width: 50%;
    background-color: white;
    border-radius: 0;
}
.tab-open {
    border: solid 1px #d2d2d2;
    color:  #e7eaec;
    background-color: #2F4050;
}
.save-task-template, .recurring {
    width: fit-content !important;
}
.hide {display: none;}
.show {
    display: block !important;
}
.labels {
    align-self: center;
}
.flex {
    display: flex;
    column-gap: 12px;
    align-items: center;
}
.task-repeat {
    width: fit-content;
    border: none;
    border-bottom: solid 1px #e7eaec;
}
</style>