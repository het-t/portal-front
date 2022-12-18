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
                                <select v-model="taskClient" :id='"task-client"+uk'>
                                    <option value="/u/clients/create-client">create new client</option>
                                    <option v-for="(client, index) in allClients" :value="client.id" :key="index.toString()+uk">
                                        {{client.name}}
                                    </option>
                                </select>
                            </div>

                            <div class="row mt8">
                                <label :for="'task-status'+uk" class="labels c1">status</label>
                                <input v-model="taskStatus" type="text" :id='"task-status"+uk'>
                            </div>

                            <div class="row mt8">
                                <label :for="'task-coordinator'+uk" class="labels c1">co-ordinator</label>
                                <select v-model="taskCoordinator" name="task-coordinator" :id='"task-coordinator"+uk'>
                                    <option v-for="(user, index) in allUsers" :key="index.toString()+uk" :value="user.id">
                                        {{user.firstName}} {{user.lastName}}
                                    </option>
                                </select>
                            </div>

                            <div class="row mt8">
                                <label :for="'task-tasks'+uk" class="labels c1">task</label>
                                <select @change="taskMasterSelected" v-model="taskMasterId" :id='"task-tasks"+uk'>
                                    <option v-for="taskMaster of tasksMasterListGet" :key="taskMaster.id" :value="taskMaster.id">
                                        {{taskMaster.title}}
                                    </option>
                                </select>
                            </div>

                            
                            <div class="row mt8">
                                <label :for="'task-cost'+uk" class="labels c1">cost</label>
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

                        <button @click.prevent="proceed()" class="green mt16 button">save</button>
                        <button @click.prevent="canceled()" class="neutral ml8 mt16 button">cancel</button>
                    </form>
                </div>
                <div class="vr"></div>

                <div class="fg pr16">
                    <div>
                        <div class="row mt8">
                            <label :for="'task-sub-task'+uk" class="labels c1">sub task</label>
                            <div style="width:80%; display:flex; align-items: center;">
                                <input v-model="newSubTask" style="width: 100%" type="text" :id="'task-sub-task'+uk">
                                <font-awesome-icon tabindex="0" class="icon pointer add-st ml8" @keyup.enter="addSubTask()" @click.prevent="addSubTask()" icon="fa-solid fa-plus"></font-awesome-icon>
                            </div>
                        </div>
                    </div>

                    <div v-if="subTasks" class="grid-wrapper">
                        <div v-for="(task, index) in subTasks" :key="index" class="mb8">
                            <div class="grid">
                                
                                <div>{{index+1}})</div>

                                <div class="pointer"
                                    tabindex="0"
                                    @keyup.enter="toggleDisplaySubTask(index)"
                                    @click.prevent="toggleDisplaySubTask(index)"
                                >
                                    {{task.description}}
                                </div>

                                <font-awesome-icon tabindex="0" icon="fa-solid fa-minus"
                                    @keyup.enter="removeSubTask(index)"
                                    @click.prevent="removeSubTask(index)" 
                                    class="pointer icon rmst"
                                ></font-awesome-icon>
                                
                            </div>

                            <div :ref="'sub-task'+index" class="hide ml24">
                                <div class="ml16">
                                    <select v-model="task.statusId" class="sub-task-extra">
                                        <option v-for="(status, index) in subTaskStatuses" :value="status.id" :key="index.toString()+uk">
                                            {{status.status}}
                                        </option>
                                    </select>
                                </div>

                                <div class="ml16">
                                    <select v-model="task.assignedTo" name="assigned-to" class="sub-task-extra">
                                        <option value="" disabled selected hidden>assign</option>
                                        <option v-for="(user, index) in allUsers" :key="index.toString()+uk" :value="user.id">
                                            {{user.firstName}} {{user.lastName}}
                                        </option>
                                    </select>
                                </div>
                                
                                <div class="ml16">
                                    <input v-model="task.cost" type="number" :id="'sub-task-cost'+uk" placeholder="Cost" class="sub-task-extra">
                                </div>

                                <div class="ml16">
                                    <input v-model="task.comments" class="sub-task-extra" type="text" placeholder="Comments">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="card hide" :ref="'logs'+uk">            
            <div class="mr16 ml16 mt16">
                <table>
                    <tr>
                        <th>user</th>
                        <th>action</th>
                        <th>sub-task</th>
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
                        <td>{{logObj.subTask ? logObj.subTask : "Not Available"}}</td>
                        <td>{{logObj.timestamp}}</td>
                        <!-- new Date(logObj.timestamp).toLocaleDateString() -->
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import { tasks, subTasksMaster } from '@/api/index.js'
    import swal from 'sweetalert'
    import useEditSwal from '../helpers/swalEdit'
    import useCreateSwal from '@/helpers/swalCreate'

    export default {
        name: 'TasksCreate',
        props: ['editTaskId', 'uk'],
        data() {
            return {
                editing: false,
                subTaskStatuses: [{id: 1, status: "hold"}, {id: 2, status: "to do"}, {id: 3, status: "in progress"}, {id: 4, status: "pending for approval"}, {id: 5, status: "done"}, {id: 6, status: "cancel"}, {id: 7, status: "pending with client"}, {id: 8, status: "pending with signed documents"}, {id: 9, status: "pending with DSC"}],
                
                subTasks: [],
                removedSubTasksId: [],

                taskMasterId: '',
                repeat: false,
                newSubTask: '',
                taskStatus: '',
                taskTitle: '',
                taskDescription: '',
                taskClient: '',
                taskCost: '',
                taskCoordinator: '',
                save: false,
                taskRepeat: '',
                taskRepeatOn: '',

                taskLogs: [],

                // disabled: true
            }
        },
        computed: {
            ...mapGetters([
                'tasks/taskData',
                'tasks/subTasksData',
                'tasks/tasksMasterListGet'
            ]),
            ...mapGetters('users', [
                'allUsers'
            ]),
            ...mapGetters('clients', [
                'allClients'
            ]),
        },
        methods: {
            ...mapActions(['promptMessage']),
            taskMasterSelected() {
                const selectedTaskMaster = this['tasks/tasksMasterListGet'].find((o) => o.id == this.taskMasterId)
                subTasksMaster.get({taskMasterId: this.taskMasterId})
                .then((results) => {
                    this.subTasks = (results.data.subTasksMasterList)
                    this.taskCost = selectedTaskMaster.cost
                })
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
            getTaskStatus(subTasks) {
                let o = subTasks?.find(o => o?.subTaskStatus != "done")
                typeof o == 'undefined' ? this.taskStatus = 'unbilled' : this.taskStatus = o?.subTaskStatus 
            },
            addSubTask() {
                console.log("subtasks", this.subTasks)
                this.subTasks.push({
                    description: this.newSubTask,
                    statusId: 2,
                    assignedTo: '',
                    comments: '',
                    cost: '',
                })
                document.getElementById('task-sub-task'+this.uk).focus()
                this.newSubTask = ''
            },
            removeSubTask(index) {
                const rmSubTask = this.subTasks.splice(index, 1)
                if (rmSubTask[0]?.id) {
                    this.removedSubTasksId.push(rmSubTask[0]?.id)
                }
            },
            toggleDisplaySubTask(index) {
                this.$refs['sub-task'+index][0].classList.value.includes('show') ?
                this.$refs['sub-task'+index][0].classList.remove('show') :
                this.$refs['sub-task'+index][0].classList.add('show')
            },
            populateDataProperties(data) {
                const {
                    taskMasterId,
                    title,
                    description,
                    cost,
                    coordinatorId,
                    clientId
                } = data

                this.taskTitle = title
                this.taskDescription = description
                this.taskCost = cost
                this.taskCoordinator = coordinatorId
                this.taskClient = clientId
                this.taskMasterId = taskMasterId
            },
            proceed() {
                // this.disabled = true
                const args = {
                        saved: new Number(this.save),
                        taskId: this.editTaskId,
                        taskMasterId: this.taskMasterId,
                        title: this.taskTitle,
                        description: this.taskDescription,
                        cost: this.taskCost,
                        clientId: this.taskClient,
                        coordinatorId: this.taskCoordinator,
                        subTasks: JSON.stringify(this.subTasks),
                        removedSubTasks: JSON.stringify(this.removedSubTasksId)
                    }
                if (this.editing == true) {
                    useEditSwal({
                        text: args.title,
                        // mutationFnName: 'tasks/RESET_STATE',
                        // mutationFnName: 'tasks/editTask',
                        // mutationArgs: args,
                        context: this,
                        promise: () => tasks.edit(args)
                    })
                }
                else {
                    useCreateSwal({
                        text: args.title,
                        mutationFnName: 'tasks/RESET_STATE',
                        mutationArgs: {isMaster: this.save},
                        promise: () => tasks.create(args),
                        url: '/u/tasks/list',
                        context: this
                    })
                } 
                // this.disabled = false
            },
            canceled() {
                swal({
                    title: "Do you really want to cancel editing?", 
                    text: "All changes will be reverted",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                .then((value) => {
                    if (value != null) throw null
                })
                .catch(() => {
                    if (this.editing == true) this.$emit("editingCompleted", {
                        editing: 0,
                        task: this.taskTitle
                    })
                    else this.$router.push('/u/tasks/list')
                })
            }
        },
        created() {
            ////////////////////////////////////////////////////
                //get all clients if not in store
                this.$store.dispatch('clients/clientsAll'),
                
                //get all tasksMaster if not in store
                this.$store.dispatch('tasks/tasksMasterListSet'),
                
                //get all users if not in store 
                this.$store.dispatch('users/usersAll')
            ////////////////////////////////////////////////////

            if (window.history.state.taskId != undefined){ 
                this.editing = true  
                this.getTaskStatus(this.subTasks)
            }
            else if (this.editTaskId != undefined) {
                this.editing = true
                this.getTaskStatus(this.subTasks)
            }
        },
        mounted() {
            if (this.editing == true) {

                const taskData = (this['tasks/taskData'])(this.editTaskId)?.taskData[0]
                const taskLogs = (this['tasks/taskData'])(this.editTaskId)?.taskLogs
                const subTasksData = this['tasks/subTasksData'](this.editTaskId)
                if (taskData != undefined && taskData != '') {
                    this.populateDataProperties(taskData)
                    this.taskLogs = taskLogs
                }
                if (subTasksData != undefined && subTasksData != '') {
                    console.log(subTasksData)
                    this.subTasks = subTasksData 
                }
            }

            this.$refs['defaultTab'+this.uk].click()
        },
    }
</script>

<style scoped>

.add-st {
    width: 13px;
    height: 13px;
    padding: 8px;
}
.rmst {
    padding: 4px;
}
.icon {
    border-radius: 100%;
    color: #8888888f;
    border: solid 1px #e0e0e0;
}
.icon:hover {
    border-color: #c2c2c2;
}
.pointer {
    cursor: pointer;
}
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
    width: fit-content;
}
.hide {display: none;}
.show {
    display: block !important;
}
.labels {
    align-self: center;
}
input, select {
    width: 80%;
}
.sub-task-extra {
    width: 80% !important;
    border: none;
    border-bottom: solid 1px #e7eaec;
}
.grid-wrapper {
    width: 100%;
}
.grid {
    display: grid;
    /* grid-template-columns: 13px 10px 80% 22px; */
    grid-template-columns: 10px 80% 22px;
    grid-template-rows: 2;
    column-gap: 12px;
    align-items: center;
    line-height: 1.5rem;
}
.grid:hover .dots-img {
    visibility: visible !important;
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