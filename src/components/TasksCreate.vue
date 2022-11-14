<template>
    <div>
        <div class="card">

            <div class="card-head m0 pb16 pt16 pr16 pl16" v-if="displayHead != 'false'">
                <h5 class="table-head m0">{{tableHead}}</h5>
            </div>

            <div class="table-tabs">
                <button @click="openTab($event, 'details')" :ref='"defaultTab"+uk' class="button neutral tab">details</button>
                <button @click="openTab($event, 'logs')" class="button neutral tab">logs</button>
            </div>

            <div class="fg-wrapper mt16 mb16 pr16 pl16 hide" :ref='"details"+uk'>
                <div class="fg pl16">
                    <form class="mb16">
                        <div>
                            <div class="row">
                                <label :for="'task-title'+uk" class="labels c1">title</label>
                                <input v-model="taskTitle" type="text" :id='"task-title"+uk'>
                            </div>
                            
                            <div class="row mt8">
                                <label :for="'task-client'+uk" class="labels c1">client</label>
                                <select v-model="taskClient" :id='"task-client"+uk'>
                                    <option value="/u/clients/create-client">create new client</option>
                                    <option v-for="(client, index) in allClients" :value="client.id" :key="index.toString()+uk">
                                        {{client.client}}
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
                                        {{user.first_name}} {{user.last_name}}
                                    </option>
                                </select>
                            </div>

                            <div class="row mt8">
                                <label :for="'task-tasks'+uk" class="labels c1">task</label>
                                <select v-model="taskTasks" :id='"task-tasks"+uk'>
                                    <option value="">existing tasks</option>
                                </select>
                            </div>

                            
                            <div class="row mt8">
                                <label :for="'task-cost'+uk" class="labels c1">cost</label>
                                <input type="number" v-model="taskCost" :id="'task-cost'+uk">
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

                        <button @click.prevent="clear()" class="neutral mt16 button">cancel</button>
                        <button @click.prevent="proceed(), clear()" class="green ml8 mt16 button">save</button>
                    </form>
                </div>
                <div class="vr"></div>

                <div class="fg pr16">
                    <div>
                        <div class="row mt8">
                            <label :for="'task-sub-task'+uk" class="labels c1">sub task</label>
                            <div style="width:80%; display:flex">
                                <input v-model="newSubTask" style="width: 100%" type="text" :id="'task-sub-task'+uk">
                                <button @click.prevent="addSubTask()" class="ml16 button action-button">
                                    <img src="../assets/icons/plus-icon.png" class="" alt="">
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-if="subTasks" class="grid-wrapper">
                        <div v-for="(task, index) in subTasks" :key="index" class="mb8">
                            <div class="grid">
                                <div class="dots">
                                    <img @click.prevent="toggleDisplaySubTask(index)" class="dots" src="../assets/icons/dots-icon.png" alt="">
                                </div>
                                <div>{{index+1}})</div>
                                <div>{{task.description}}</div>

                                <button @click.prevent="removeSubTask(index)" class="button action-button">
                                    <img src="../assets/icons/minus-icon.png" class="" alt="">
                                </button>
                            </div>

                            <div :ref="'sub-task'+index" class="hide ml24">
                                <div class="ml16">
                                    <select v-model="task.status" class="sub-task-extra">
                                        <option v-for="(status, index) in subTaskStatuses" :value="status.id" :key="index.toString()+uk">
                                            {{status.status}}
                                        </option>
                                    </select>
                                </div>

                                <div class="ml16">
                                    <select v-model="task.assignedTo" name="assigned-to" class="sub-task-extra">
                                        <option value="" disabled selected hidden>assign</option>
                                        <option v-for="(user, index) in allUsers" :key="index.toString()+uk" :value="user.id">
                                            {{user.first_name}} {{user.last_name}}
                                        </option>
                                    </select>
                                </div>
                                
                                <div class="ml16">
                                    <input v-model="task.cost" type="text" :id="'sub-task-cost'+uk" placeholder="cost" class="sub-task-extra">
                                </div>

                                <div class="ml16">
                                    <input v-model="task.comments" class="sub-task-extra" type="text" placeholder="comments">
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
                        <th>task</th>
                    </tr>
                    <tr class="tr">
                        <td>Mayur Buha</td>
                        <td>updated status to done</td>
                        <td>check name of company</td>
                    </tr>
                    <tr class="tr">
                        <td>Pritul Patel</td>
                        <td>updated status to done</td>
                        <td>Draft Main Object of Company</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getUsers, getClients, createTask, getSubTasks } from '@/api/index.js'

    export default {
        name: 'TasksCreate',
        props: ['taskId', 'displayHead', 'uk'],
        data() {
            return {
                editing: false,
                allUsers: '',
                allClients: '',
                subTaskStatuses: [{id: 1, status: "hold"}, {id: 2, status: "to do"}, {id: 3, status: "in progress"}, {id: 4, status: "pending for approval"}, {id: 5, status: "done"}, {id: 6, status: "cancel"}, {id: 7, status: "pending with client"}, {id: 8, status: "pending with signed documents"}, {id: 9, status: "pending with DSC"}],
                tableHead: 'create task',
                
                subTasks: [], 
                repeat: false,
                newSubTask: '',
                taskStatus: '',
                taskTitle: '',
                taskClient: '',
                taskTasks: '',
                taskCost: '',
                taskCoordinator: '',
                save: false,
                taskRepeat: '',
                taskRepeatOn: '',
                taskSubTasks: '',
                
                taskData: [{
                    taskId: 1,
                    taskTitle: 'Incorporation of Company',
                    taskClient: 'TechAvidus',
                    taskCoordinator: 'Mayur Buha',
                    taskSubTasks: [{
                        title: 'Check Name of Company',
                        subTaskStatus: 'done',
                        assignedTo: 'Mayur Buha',
                        cost: '50000',
                        comments: 'XYZ'
                    }, {
                        title: 'Draft Main Object of Company',
                        subTaskStatus: 'pending with client',
                        assignedTo: 'Pritul Patel',
                        cost: '0',
                        comments: 'SRN:T21929139'
                    }],
                }, {
                    taskId: 2,
                    taskTitle: 'Income Tax return',
                    taskClient: 'TechSome',
                    taskCoordinator: 'Pritul Patel',
                    taskSubTasks: [{
                        title: 'Collect Documents',
                        subTaskStatus: 'done',
                        assignedTo: 'Mayur Buha',
                        cost: '0',
                        comments: 'XYZ'
                    }, {
                        title: 'Verify documents',
                        subTaskStatus: 'done',
                        assignedTo: 'Pritul Patel',
                        cost: '1000',
                        comments: ''
                    }],
                }]
            }
        },
        methods: {
            ...mapActions(['promptMessage']),
            openTab(e, newTab) {
                 var tabs = e.target.parentElement.getElementsByClassName('tab')
                let curTab = [...tabs].find(tab => tab?.classList?.contains('tab-open') == true)
                curTab?.classList?.remove('tab-open')
                e?.target?.classList?.add('tab-open')
                this.$refs['details'+this.uk]?.classList?.add('hide')
                this.$refs['logs'+this.uk]?.classList?.add('hide')
                this.$refs[newTab+this.uk]?.classList?.remove('hide')
            },
            getTaskStatus(subTasks) {
                let o = subTasks?.find(o => o?.subTaskStatus != "done")
                typeof o == 'undefined' ? this.taskStatus = 'unbilled' : this.taskStatus = o?.subTaskStatus 
            },
            addSubTask() {
                console.log("subtasks", this.subTasks)
                document.getElementById('task-sub-task'+this.uk).focus()
                this.subTasks.push({
                    description: this.newSubTask,
                    status: 2,
                    assignedTo: '',
                    comments: '',
                    cost: '',
                })
                this.newSubTask = ''
            },
            removeSubTask(index) {
                console.log("before", this.$refs)
                this.subTasks.splice(index, 1)
                console.log("after", this.$refs)
            },
            toggleDisplaySubTask(index) {
                this.$refs['sub-task'+index][0].classList.value.includes('show') ?
                this.$refs['sub-task'+index][0].classList.remove('show') :
                this.$refs['sub-task'+index][0].classList.add('show')
            },
            proceed() {
                this.$router.push('/u/tasks/list')

                if (this.editing == false) {
                    createTask({
                        title: this.taskTitle,
                        cost: this.taskCost,
                        saved: new Number(this.save),
                        subTasks: this.subTasks,
                        clientId: this.taskClient,
                        coordinatorId: this.taskCoordinator,
                    })
                    .then(()=> {
                        this.promptMessage({
                            title: 'Task Created',
                            msg: 'successfully',
                            bgcolor: 'green'
                        })
                    })
                    .catch((e) => {
                        this.promptMessage({
                            title: 'Error',
                            msg: 'task cannot be created'+e,
                            bgcolor: 'red'
                        })
                    })
                }
            },
            clear() {
                this.subTasks = [] 
                this.repeat = false
                this.newSubTask =  ''
                this.taskStatus = ''
                this.taskTitle = ''
                this.taskClient = ''
                this.taskTasks = ''
                this.taskCost = ''
                this.taskCoordinator = ''
                this.save = false
                this.taskRepeat = ''
                this.taskRepeatOn = ''
                this.taskSubTasks = ''
            }
        },
        created() {
            getClients()
            .then((allClients) => {
                this.allClients = allClients.data.map(o => { return {client: o.name, id: o.id} })
            })
            getUsers({from: null, recordsPerPage: null})
            .then(allUsers => {
                this.allUsers = allUsers.data
            })
            if (window.history.state.taskId != undefined){ 
                this.editing = true  
                this.tableHead = 'edit task'         
                let taskData = this.taskData.find(o => o.taskId == window.history.state.taskId)
                this.taskTitle = taskData?.taskTitle
                this.taskClient = taskData?.taskClient
                this.taskTasks = taskData?.taskTasks
                this.taskRepeat = taskData?.taskRepeat
                this.taskRepeatOn = taskData?.taskRepeatOn
                this.subTasks = taskData?.taskSubTasks
                this.taskCoordinator = taskData?.taskCoordinator
                this.getTaskStatus(this.subTasks)
                console.log("fetch data of task ", window.history.state.taskId)
            }
            else if (this.taskId != undefined) {
                this.editing = true
                console.log(this.taslId)
                this.tableHead = 'edit task'         
                let taskData = this.taskData.find(o => o.taskId == this.taskId)
                this.taskTitle = taskData?.taskTitle
                this.taskClient = taskData?.taskClient
                this.taskTasks = taskData?.taskTasks
                this.taskRepeat = taskData?.taskRepeat
                this.taskRepeatOn = taskData?.taskRepeatOn
                this.subTasks = taskData?.taskSubTasks
                this.taskCoordinator = taskData?.taskCoordinator
                this.getTaskStatus(this.subTasks)
            }
        },
        mounted() {
            this.$refs['defaultTab'+this.uk].click()

            if (this.editing == true) {
                console.log("getting sub tasks of taskId ", this.taskId)
                getSubTasks({taskId: this.taskId})
                .then((subTasks) => {
                    this.subTasks = subTasks.data[0]
                })
            }
        }
    }
</script>

<style scoped>
.tasks-create .card {
    border: none !important;
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
    grid-template-columns: 13px 10px 80% 22px;
    grid-template-rows: 2;
    column-gap: 12px;
    align-items: center;
    line-height: 1.5rem;
}
.action-button>img {
    width: 22px;
    height: 22px;
    padding: 0 !important;
    filter: invert(0.5);
}
.button.action-button {
    background-color: white;
    padding: 0;
    border: none;
}
/* .action-button img {display: none;} */
.grid:hover .dots img {
    display: inline !important;
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