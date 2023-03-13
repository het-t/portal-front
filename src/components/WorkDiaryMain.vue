<template>
    <div class="pr16 pl16">
        <div class="flex-wd-options mb8">
            <vue-multiselect v-model="user" :options="allUsers" :custom-label="labelForCoordinator" track-by="id" placeholder="select user" id="username">
                <template #noResult>
                    Oops! No user found. Consider creating new user
                </template>

                <template v-slot:option="props">
                    <span class="p0 m0" style="height: 0 !important; width: 0 !important;" :class="props.option.isActive == 0 ? 'not-active' : ''">
                        {{props.option.firstName}} {{props.option.lastName}} ({{props.option.id}})
                    </span>
                </template>
            </vue-multiselect>

            <date-picker
                @datePicker="dates = $event"
            >
            </date-picker>
        </div>

        <table-main>
            <template #thead>
                <tr class="table-heading">
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filters[3]" :focus="floatingLabelsFocus.includes('title')" type="text" class="header p0" required>
                                <span @click="floatingLabelsFocus.push('title')" class="floating-label">Title</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filters[4]" :focus="floatingLabelsFocus.includes('client')" type="text" class="header p0" required>
                                <span @click="floatingLabelsFocus.push('client')" class="floating-label">Client</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filters[5]" :focus="floatingLabelsFocus.includes('desc')" type="text" class="header p0" required>
                                <span @click="floatingLabelsFocus.push('desc')" class="floating-label">Description</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filters[6]" :focus="floatingLabelsFocus.includes('co')" type="text" class="header p0" required>
                                <span @click="floatingLabelsFocus.push('co')" class="floating-label">Coordinator</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <select @change="sort" v-model="filters[7]" ref="status" class="header p0" required>
                                    <option value="1">InProgress</option>
                                    <option value="2">Unbilled</option>
                                    <option value="3">Billed</option>
                                </select>
                                <span @click="$refs['status'].focus()" class="floating-label">status</span>
                            </div>
                        </div>
                    </th>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(task, index) in tasks" :key="index">
                    <tr class="tr edit-tr"                          
                        @keyup.enter="getSubTasks('row'+index)"
                        @click.prevent="getSubTasks('row'+index, {taskId: task.id})">
                            <td>{{ task?.title }}</td>
                            <td>{{ task?.client }}</td>
                            <td>{{ task?.description }}</td>
                            <td>{{ task?.coordinator }}</td>
                            <td class="pl12 pt0">
                                <div class="task-status" :class="task.status">
                                    {{ task.status }}
                                </div>
                            </td>
                    </tr>

                    <tr class="tr tr-hidden hide" :ref="('row'+index)">
                        <td colspan="5" class="p0">
                            <table-main>
                                <template #thead> 
                                    <tr>
                                        <th>description</th>
                                        <th>activity</th>
                                        <th>status</th>
                                        <th>time</th>
                                    </tr>
                                </template>

                                <template #tbody>
                                    <tr v-for="(subTask, index) in subTasks[task.id]" :key="index" class="tr">
                                        <td v-if="subTask.description != '_#_*&^'">{{ subTask.description }}</td>
                                        <td v-else>{{ task.title }}</td>
                                        <td>
                                            {{ subTask.action }} {{ subTask.key }}
                                            <span v-if="subTask.action == 'updated'">
                                                from
                                                {{ subTask.before || '-' }} to {{ subTask.after || '-' }}
                                            </span>
                                        </td>
                                        <td>{{ subTask.status }}</td>
                                        <td>{{ new Date(subTask.timestamp).toLocaleString() }}</td>
                                    </tr>
                                </template>
                            </table-main>
                        </td>
                    </tr>
                </template>
            </template>

            <table-pagination
                :key="key"
                v-if="getData == true"
                @tableData="tasks = $event"
                :filters="filters"
                tableName="workDiary"
                :noCaching="true"  
            ></table-pagination>

        </table-main>
    </div>
</template>

<script>
import TableMain from './TableMain.vue'
import { mapGetters } from 'vuex'
import VueMultiselect from 'vue-multiselect'
import makeGetReq from '../api/makeGetReq'
import DatePicker from './DatePicker.vue'
import TablePagination from './TablePagination.vue'

    export default {
        components: { TableMain, VueMultiselect, DatePicker, TablePagination },
        name: 'WorkDiaryMain',
        data() {
            return {
                tasks: [],
                subTasks: [],
                user: '',
                dates: [],
                getData: false,
                key: 0,
                floatingLabelsFocus: [],
                filters: ['', '', '', '', '', '', '', ''], 
                //wdUserId, datetime_for, datetime_to, task-title, task-client,                                
                //task-description, task-coordinator, task-status
            }
        },
        computed: {
            ...mapGetters('users', [
                'allUsers'
            ]),
        },
        watch: {
            user(newValue) {
                this.filters[0] = newValue?.id
                this.tasks = []
                this.subTasks = []

                if (newValue != null) {
                    this.getData = true
                    this.key = !this.key
                }
                else this.getData = false
            },
            dates(newValue) {
                this.filters[1] = newValue?.[0] 
                this.filters[2] = newValue?.[1]

                if (this.user != '' && this.user != null) {
                    this.tasks = []
                    this.subTasks = []
                    this.getData = true
                    this.key = !this.key
                }
            }
        },
        methods: {
            labelForCoordinator({firstName, lastName, id}) {
                return `${firstName} ${lastName} (${id})`
            },
            getSubTasks(rowIndex, {taskId}) {
                const show = this.$refs[rowIndex][0].classList.contains('hide')
                if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
                else this.$refs[rowIndex][0].classList.add('hide')

                let userId
                if (this.user?.id) userId = this.user.id
                else userId = this.user

                makeGetReq('/u/api/workDiary/sub-tasks', {
                    userId,
                    taskId,
                    fromDate: this.dates[0],
                    toDate: this.dates[1]
                })
                .then((subTasks) => {
                    this.subTasks[taskId] = subTasks.data
                })
            },
            sort() {
                this.key = !this.key
            }
        },
        created() {
            this.$store.dispatch('users/usersAll')
        },
    }   
</script>

<style scoped>
@import '../assets/stylesheet/task-status-tag.css';
@import '../assets/stylesheet/floating-labels.css';
    .tr th:not(:nth-last-child(1)), 
    .tr td:not(:nth-last-child(1)), 
    .table-heading th:not(:nth-last-child(1)) {
        border-right: solid 1px #e7eaec !important;
    }
    .flex-wd-options {
        display: flex;
        column-gap: 8px;
        row-gap: 8px;
    }
    .flex {
        display: flex;
    }
    .multiselect {
        min-width: 250px;
        max-width: 400px !important;
    }
    .hide {
        display: none !important;
    }

    .edit-tr {
        cursor: pointer;
    }
</style>