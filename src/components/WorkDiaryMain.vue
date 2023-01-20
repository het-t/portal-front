<template>
    <div class="pr16 pl16">
        <vue-multiselect v-model="user" :options="allUsers" :custom-label="labelForCoordinator" track-by="id" placeholder="select user" id="username">
            <template #noResult>
                Oops! No user found. Consider creating new user
            </template>
        </vue-multiselect>

        <table-main>
            <template #thead>
                <tr>
                    <th>title</th>
                    <th>client</th>
                    <th>description</th>
                    <th>coordinator</th>
                    <th>status</th>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(task, index) in tasks" :key="index">
                    <tr class="tr"                          
                        @keyup.enter="getSubTasks('row'+index)"
                        @click.prevent="getSubTasks('row'+index, {taskId: task.id})">
                            <td>{{ task.title }}</td>
                            <td>{{ task.client }}</td>
                            <td>{{ task.description }}</td>
                            <td>{{ task.coordinatorId }}</td>
                            <td>{{ task.status }}</td>
                    </tr>

                    <tr class="tr tr-hidden hide" :ref="('row'+index)">
                        <td colspan="5">
                            <table-main>
                                <template #thead> 
                                    <tr>
                                        <th>description</th>
                                        <th>status</th>
                                    </tr>
                                </template>

                                <template #tbody>
                                    <tr v-for="(subTask, index) in subTasks" :key="index" class="tr">
                                        <td v-if="subTask.description != '_#_*&^'">{{ subTask.description }}</td>
                                        <td v-else>{{ task.title }}</td>
                                        <td>{{ subTask.status }}</td>
                                    </tr>
                                </template>
                            </table-main>
                        </td>
                    </tr>
                </template>
            </template>
        </table-main>
    </div>
</template>

<script>
import TableMain from './TableMain.vue'
import { mapGetters } from 'vuex'
import VueMultiselect from 'vue-multiselect'
import makeGetReq from '../api/makeGetReq'

    export default {
        components: { TableMain, VueMultiselect },
        name: 'WorkDiaryMain',
        data() {
            return {
                tasks: [],
                subTasks: [],
                user: ''
            }
        },
        computed: {
            ...mapGetters('users', [
                'allUsers'
            ]),
        },
        watch: {
            user() {
                if (this.user != '') {
                    this.getTasks()
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
                if (this.user.id) userId = this.user.id
                else userId = this.user

                makeGetReq('/u/api/work-diary/sub-tasks', {
                    userId,
                    taskId
                })
                .then((subTasks) => {
                    this.subTasks = subTasks.data
                })
            },
            getTasks() {
                let userId
                if (this.user.id) userId = this.user.id
                else userId = this.user

                makeGetReq('/u/api/work-diary/tasks', {
                    userId, 
                })
                .then((tasks) => {
                    this.tasks = tasks.data
                })
            }
        },
        created() {
            this.$store.dispatch('users/usersAll')
        },
    }   
</script>

<style scoped>
    .multiselect {
        min-width: 250px;
        max-width: 400px !important;
    }
    .hide {
        display: none !important;
    }
</style>