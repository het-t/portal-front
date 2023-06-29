<template>
    <div class="pr16 pl16">
        <div class="flex-wd-options mb8">
            <vue-multiselect 
                v-if="users?.length"
                v-model="filters.userId" 
                :options="users" 
                :custom-label="labelForCoordinator" 
                track-by="id" 
                placeholder="select user" 
                id="username"
            >
                <template #noResult>
                    Oops! No user found. Consider creating new user
                </template>

                <template v-slot:option="props">
                    <span 
                        class="p0 m0" 
                        style="height: 0 !important; width: 0 !important;" 
                        :class="props.option.isActive == 0 ? 'not-active' : ''"
                    >
                        {{props.option.firstName}} {{props.option.lastName}} ({{props.option.id}})
                    </span>
                </template>
            </vue-multiselect>

            <date-picker
                @datePicker="filters.datefrom = $event?.[0], filters.dateto = $event?.[1]"
            >
            </date-picker>
        </div>

        <table-main>
            <template #thead>
                <tr class="table-heading">
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <input v-model="filters.title" :focus="floatingLabelsFocus.includes('title')" type="text" class="header p0" required>
                                <span @click="floatingLabelsFocus.push('title')" class="floating-label">Title</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <input v-model="filters.client" :focus="floatingLabelsFocus.includes('client')" type="text" class="header p0" required>
                                <span @click="floatingLabelsFocus.push('client')" class="floating-label">Client</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <input v-model="filters.description" :focus="floatingLabelsFocus.includes('desc')" type="text" class="header p0" required>
                                <span @click="floatingLabelsFocus.push('desc')" class="floating-label">Description</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <input v-model="filters.coordinator" :focus="floatingLabelsFocus.includes('co')" type="text" class="header p0" required>
                                <span @click="floatingLabelsFocus.push('co')" class="floating-label">Coordinator</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <div class="floating-container">
                                <select @change="sort" v-model="filters.status" ref="status" class="header p0" required>
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
                        @keyup.enter="getSubTasks('row'+index, {taskId: task.id})"
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
                            <WorkDiaryMainSubTasks
                                v-if="componentId[task.id] === true"
                                :taskId="task.id"
                            >
                            </WorkDiaryMainSubTasks>
                        </td>
                    </tr>
                </template>
            </template>

            <table-pagination
                storeName="workDiary"
            ></table-pagination>

        </table-main>
    </div>
</template>

<script>
import TableMain from './TableMain.vue'
import VueMultiselect from 'vue-multiselect'
import DatePicker from './DatePicker.vue'
import TablePagination from './TablePagination.vue'
import WorkDiaryMainSubTasks from './WorkDiaryMainSubTasks.vue'

    export default {
        components: { TableMain, DatePicker, TablePagination, VueMultiselect, WorkDiaryMainSubTasks },
        name: 'WorkDiaryMain',
        data() {
            return {
                user: '',
                dates: [],
                getData: false,
                floatingLabelsFocus: [],
                componentId: {}
            }
        },
        computed: {
            filters() {
                return this.$store.getters['workDiary/getFilters']
            },
            users() {
                return this.$store.getters['users/getList']({
                    from: null,
                    to: null,
                    filters: ['null', 'null', 'null']
                })
            },
            tasks() {
                const currentPage = this.$store.getters['workDiary/getCurrentPage']
                const recordsPerPage = this.$store.getters['workDiary/getRecordsPerPage']
                const from = (currentPage-1)*(recordsPerPage)

                return this.$store.getters['workDiary/getList']({
                    from,
                    to: from + recordsPerPage
                })
            },
        },
        methods: {
            labelForCoordinator({firstName, lastName, id}) {
                return `${firstName} ${lastName} (${id})`
            },
            getSubTasks(rowIndex, {taskId}) {
                const show = this.$refs[rowIndex][0].classList.contains('hide')
                if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
                else this.$refs[rowIndex][0].classList.add('hide')

                if (show === true) {
                    this.$store.dispatch('workDiary/fetchData', {taskId})
                    .then(() => {
                        this.componentId[taskId] = true
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }
        },
        created() {
            this.$store.dispatch('users/fetchList', {all: true})
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