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
                                <vue-multiselect :id="'task-client'+uk" v-model="taskClient" :options="allClients" :custom-label="labelForClient" track-by="id" placeholder="Select Client">
                                    <template #noResult>
                                        Oops! No client found. Consider creating new client
                                    </template>
                                </vue-multiselect>
                            </div>

                            <div class="row mt8">
                                <label :for="'task-coordinator'+uk" class="labels c1">co-ordinator</label>
                                <vue-multiselect class="options-list" :id="'task-coordinator'+uk" v-model="taskCoordinator" placeholder="Select Coordinator" :options="allUsers" :custom-label="labelForCoordinator" track-by="id">
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
                                <vue-multiselect :id="'task-tasks'+uk" v-model="taskMasterId" placeholder="Select Task-Master" :options="tasksMasterListGet" :custom-label="labelForTaskMaster" track-by="id">
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
                                        <vue-multiselect class="options-list" :id="'extraAssignTo'+uk" v-model="popAssignTo" placeholder="Select user to assign" :options="allUsers" :custom-label="labelForCoordinator" track-by="id">
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

                        <button :disabled="disabled === true" @click.prevent="proceed()" class="green mt16 button">save</button>
                        <button :disabled="disabled === true" @click.prevent="canceled()" class="neutral ml8 mt16 button">cancel</button>
                    </form>
                </div>
                <div class="vr"></div>

                <div class="fg pr16 sub-tasks-scroll">
                    <div>   
                        <div class="row mt8 mb16">
                            <label :for="'task-sub-task'+uk" class="labels c1">sub task</label>
                            <div style="width:80%; display:flex; align-items: center;">
                                <input @keyup.enter="addSubTask()" v-model="newSubTask" style="width: 100%" type="text" :id="'task-sub-task'+uk">
                                <font-awesome-icon tabindex="0" class="icon pointer add-st ml8" @keyup.enter="addSubTask()" @click.prevent="addSubTask()" icon="fa-solid fa-plus"></font-awesome-icon>
                            </div>
                        </div>
                    </div>

                    <div v-if="subTasks" class="grid-wrapper">
                        <div v-for="(task, index) in subTasks" :key="index" class="mb8">
                            <div class="grid" v-if="task.description != '_#_*&^'">

                                <div style="overflow: hidden;">
                                    <font-awesome-icon class="profile-pic" style="border-radius: 100%;" 
                                        v-if="$store.getters['images/getProfilePic'](`${task?.assignedTo?.id}_50x50`) == undefined || 
                                        $store.getters['images/getProfilePic'](`${task?.assignedTo?.id}_50x50`) == ''"
                                        :icon="['fas', 'user']"
                                    ></font-awesome-icon>

                                    <img loading="lazy" style="border-radius: 100%; width: 36px; height: 36px;" v-else :src="$store.getters['images/getProfilePic'](`${task?.assignedTo?.id}_50x50`)">
                                </div>

                                <div class="pointer"
                                    tabindex="0"
                                    @keyup.enter="toggleDisplaySubTask(index)"
                                    @click.prevent="toggleDisplaySubTask(index)"
                                >
                                    
                                    <p contentEditable="true"
                                        class="st-description"
                                        :class="task.statusId == 5 ? 'done-st' : ''"
                                        @input="updateSubTaskTitle(task, $event)"
                                    >{{ task.description }}</p>
                                    
                                    <span v-if="task?.status != undefined" class="ml8 st_status" :class="task.status">{{ task.status }}</span>
                                </div>

                                <font-awesome-icon tabindex="0" icon="fa-solid fa-minus"
                                    @keyup.enter="removeSubTask(index)"
                                    @click.prevent="removeSubTask(index)" 
                                    class="pointer icon rmst"
                                ></font-awesome-icon>
                                
                            </div>

                            <div v-if="task.description != '_#_*&^' && show == index"
                                class="hide ml24"
                                :class="show == index ? 'show' : 'hide'" 
                            >
                                <div class="ml16">
                                    <select v-model="task.statusId" class="sub-task-extra">
                                        <option v-for="(status, index) in subTaskStatuses" :value="status.id" :key="index.toString()+uk">
                                            {{status.status}}
                                        </option>
                                    </select>
                                </div>

                                <div class="ml16">
                                    <vue-multiselect v-model="task.assignedTo" :options="allUsers" :custom-label="labelForCoordinator" track-by="id" placeholder="Assigend To" class="sub-task-extra options-list">
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
                        <th style="border-right: solid 1px #eeeeee;">sub-task</th>
                        <th>date</th>
                    </tr>

                    <tr v-for="(logObj, index) in taskData(editTaskId)?.tasksLogs" :key="index"
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
    import { mapGetters } from 'vuex'
    import { tasks, subTasksMaster } from '@/api/index.js'
    import useEditSwal from '../helpers/swalEdit'
    import useCreateSwal from '@/helpers/swalCreate'
    import VueMultiselect from 'vue-multiselect'
    import rightCheck from '@/helpers/RightCheck'

    export default {
        name: 'TasksCreate',
        props: ['editTaskId', 'uk'],
        components: {
            VueMultiselect,
        },
        data() {
            return {
                editing: false,
                subTaskStatuses: [{id: 1, status: "hold"}, {id: 2, status: "to do"}, {id: 3, status: "in progress"}, {id: 4, status: "pending for approval"}, {id: 5, status: "done"}, {id: 6, status: "cancel"}, {id: 7, status: "pending with client"}, {id: 8, status: "signed documents awaited"}, {id: 9, status: "pending for DSC"}, {id: 10, status: 'reassigned'}, {id: 11, status: 'approved'}, {id: 12, status: "Pending before authority"}],
                
                subTasks: [],
                removedSubTasksId: [],

                taskMasterId: '',
                repeat: false,
                newSubTask: '',
                // taskStatus: '',
                taskTitle: '',
                taskDescription: '',
                taskClient: '',
                taskCost: '',
                taskCoordinator: '',
                save: false,
                taskRepeat: '',
                taskRepeatOn: '',
                clientContact: '',

                taskLogs: [],
                disabled: false,

                i:0,
                show: -1,

                popupVisible: false,
                popAssignTo: '',
                popComments: '',
                popCost: '',
                popStatusId: '',

                unqId: 0
            }
        },
        computed: {
            ...mapGetters('tasks', [
                'taskData',
                'subTasksData',
                'tasksMasterListGet'
            ]),
            ...mapGetters('users', [
                'allUsers'
            ]),
            ...mapGetters('clients', [
                'allClients'
            ]),
        },
        watch: {
            taskMasterId(taskMasterId, oldTaskMasterId) {
                if (oldTaskMasterId == '') oldTaskMasterId = undefined
                if (taskMasterId == '') taskMasterId = undefined

                if (this.i != 0) {
                    //while editing place all sub-tasks to be removed
                    if (this.editing == true) {
                        let removeSubTasksId = this.subTasks?.map(st => st?.id)
                        if (removeSubTasksId?.length != 0) this.removedSubTasksId?.push(...removeSubTasksId)
                    }
                    //fetch sub-task of selected taskMaster
                    this.taskMasterSelected(taskMasterId?.id)
                }
                else if (this.i == 0) {
                    if (this.editing != true) {
                        this.taskMasterSelected(taskMasterId?.id)
                    }
                    else {
                        ++this.i
                    }
                }
            },
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
            taskMasterSelected(taskMasterId) {
                if (taskMasterId?.id) taskMasterId = taskMasterId.id
                if (taskMasterId == undefined) {
                    this.taskCost = ''
                    this.subTasks = []
                    return
                }

                ++this.i
                const selectedTaskMaster = this['tasksMasterListGet'].find((o) => o.id == taskMasterId)
                subTasksMaster.get({taskMasterId})
                .then((results) => {
                    this.subTasks = results.data.subTasksMasterList
                    this.taskCost = selectedTaskMaster?.cost
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
            addSubTask() {
                ++this.unqId
                this.subTasks.push({
                    unqId: this.unqId,
                    description: this.newSubTask,
                    statusId: 2,
                    assignedTo: '',
                    comments: '',
                    cost: '',
                })
                document.getElementById('task-sub-task'+this.uk).focus()
                this.newSubTask = ''

                if (this.subTasks?.length == 0 || ( this.subTasks.length == 1 && this.subTasks[0].description == '_#_*&^')) {
                    this.popupVisible = true
                }
                else this.popupVisible = false
            },
            removeSubTask(index) {
                const rmSubTask = this.subTasks.splice(index, 1)
                if (rmSubTask[0]?.id) {
                    this.removedSubTasksId.push(rmSubTask[0]?.id)
                }
                if (this.subTasks?.length == 0 || ( this.subTasks.length == 1 && this.subTasks[0].description == '_#_*&^')) {
                    this.popupVisible = true
                }
                else this.popupVisible = false
            },
            updateSubTaskTitle(task, e) {
                for(let i = 0; i!=this.subTasks.length; i++) {
                    if (((this.subTasks[i]?.id == task.id) && task.id != undefined) || 
                        ((this.subTasks[i]?.unqId == task.unqId) && task.unqId != undefined)
                    ) {
                        this.subTasks[i].description = e.target.innerText
                    }
                }
            },
            toggleDisplaySubTask(index) {
                if (this.show == index) this.show = -1
                else this.show = index
            },
            populateDataProperties(data) {
                const {
                    taskMasterId,
                    title,
                    description,
                    cost,
                    coordinatorId,
                    clientId,
                } = data
                const clientData = this.allClients.find(client => client.id == clientId)
                this.taskTitle = title
                this.taskDescription = description
                this.taskCost = cost
                this.taskCoordinator = this.allUsers.find(user => user.id == coordinatorId)
                this.taskClient = clientData
                this.taskMasterId = this.tasksMasterListGet.find(task => task.id == taskMasterId)
                this.clientContact = clientData
            },
            proceed() {
                this.disabled = true

                this.subTasks?.map((subTask) => {
                    if (subTask.assignedTo?.id)
                    subTask.assignedTo = subTask.assignedTo?.id
                })

                let args = {
                    saved: new Number(this.save),
                    taskId: this.editTaskId,
                    taskMasterId: this.taskMasterId,
                    title: this.taskTitle,
                    description: this.taskDescription,
                    cost: this.taskCost,
                    clientId: this.taskClient,
                    coordinatorId: this.taskCoordinator,
                    subTasks: JSON.stringify(this.subTasks),
                    removedSubTasks: JSON.stringify(this.removedSubTasksId),
                }

                let p

                if (this.subTasks?.length == 0 && this.popAssignTo == '' && this.popComments == '' && this.popCost == '' && this.popStatusId == '') {
                    this.popupVisible = true

                    p = swal({
                        content: this.$refs['UsersExtra'],
                        buttons: true
                    })
                    .then((value) => {
                        if (value == null) throw null
                        else {
                            return {
                                assignedTo: this.popAssignTo?.id,
                                cost: this.popCost,
                                comments: this.popComments,
                                statusId: this.popStatusId
                            }
                        }
                    })
                    .then((value) => {
                        this.subTasks = [{
                            description: '_#_*&^',
                            assignedTo: value.assignedTo,
                            statusId: value.statusId || 2,
                            comments: value.comments,
                            cost: value.cost,
                        }]
                        args.subTasks = JSON.stringify(this.subTasks)
                    })
                }
                else if (this.subTasks?.length == 1 && this.subTasks[0]?.description == '_#_*&^') {
                    this.subTasks[0].assignedTo = this.popAssignTo ?.id 
                    this.subTasks[0].comments = this.popComments
                    this.subTasks[0].statusId = this.popStatusId || 2
                    this.subTasks[0].cost = this.popCost
                    args.subTasks = JSON.stringify(this.subTasks)

                    p = Promise.resolve()
                }
                else {
                    p = Promise.resolve()
                }

                if (args.coordinatorId?.id) {
                    args.coordinatorId = args.coordinatorId?.id
                }
                if (args.clientId?.id) {
                    args.clientId = args.clientId?.id
                }
                if (args.taskMasterId?.id) {
                    args.taskMasterId = args.taskMasterId.id
                }

                p.then(() => {
                    if (this.editing == true ) {
                        useEditSwal({
                            text: args.title,
                            mutationFnName: 'tasks/refetch',
                            mutationArgs: {saved: args.saved, taskId: args.taskId},
                            promise: tasks.edit(args),
                            context: this,
                        })
                    }
                    else {
                        useCreateSwal({
                            text: args.title,
                            mutationFnName: 'tasks/refetch',
                            mutationArgs: {saved: args.saved},
                            url: '/u/tasks/list',
                            promise: tasks.create(args),
                            context: this
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
            }
            else if (this.editTaskId != undefined) {
                this.editing = true
            }
        },
        mounted() {
            if (this.editing == true) {
                const taskData = (this['taskData'])(this.editTaskId)?.taskData?.[0]
                const taskLogs = (this['taskData'])(this.editTaskId)?.taskLogs
                const subTasksData = this['subTasksData'](this.editTaskId)
                if (taskData != undefined && taskData != '') {
                    this.populateDataProperties(taskData)
                    this.taskLogs = taskLogs
                }
                if (subTasksData != undefined && subTasksData != '') {  
                    this.unqId = subTasksData.length        
                    for(let i =0; i<subTasksData.length; i++) {
                        if (subTasksData[i].assignedTo?.id == undefined) {
                            subTasksData[i].assignedTo = this.allUsers?.find(user => user.id == subTasksData[i].assignedTo)
                        }
                    }
                    this.subTasks = subTasksData
                }

                if (this.subTasks?.length === 1) {
                    if (this.subTasks[0].description == '_#_*&^') {
                        this.popupVisible = true
                        this.popAssignTo = this.subTasks[0].assignedTo,
                        this.popComments = this.subTasks[0].comments
                        this.popCost = this.subTasks[0].cost
                        this.popStatusId = this.subTasks[0].statusId
                    }
                }
            }

            this.$refs['defaultTab'+this.uk].click()
        },
    }
</script>

<style scoped>
.st-description {
    display: inline;
}
.st-description:focus {
    outline: none !important;
    border-bottom: solid 1px #e0e0e0;
}
.st_status {
    border: solid 1px #e0e0e0;
    color:#e0e0e0;
    border-radius: 50px 50px;
    padding: 0 6px;
    text-align: center;
}

svg.profile-pic {
    width: 30px;
    height: 26px;
    padding-bottom: 4px;
    color: #e0e0e0;
    border-radius: 100%;
    border: solid 1px #e0e0e0;
}
.done-st {
    color: #a0a0a0;
    text-decoration: line-through;
}
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
    width: fit-content !important;
}
.hide {display: none;}
.show {
    display: block !important;
}
.labels {
    align-self: center;
}
/* input, select {
    width: fit-content;
} */
.sub-task-extra {
    width: 80% !important;
    border: none !important;
    border-bottom: solid 1px #e7eaec !important;
}
.sub-task-extra:focus {
    border: none !important;
    outline-color: #e7eaec;
}
.grid-wrapper {
    width: 100%;
}
.grid {
    display: grid;
    /* grid-template-columns: 13px 10px 80% 22px; */
    grid-template-columns: 36px auto 25px;
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
.sub-tasks-scroll {
    max-height: 720px;
    overflow-y: auto;
}
</style>