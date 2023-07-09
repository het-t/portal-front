<template>
    <div>
        <table-main>
            <template #thead>
                <tr class="table-heading">
                    <th>
                        <div class="flex">
                            <table-sort :key="i" @clicked="j=!j; k=!k; l=!l;" sortType="string" sortBy="title" storeName="myTasks"></table-sort>

                            <div class="floating-container">
                                <input v-model="filters.name" ref="taskH" class="header p0" type="text" required>
                                <span @click="$refs['taskH'].focus()" class="floating-label">task</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort :key="l" @clicked="i=!i; j=!j; k=!k;" sortType="string" sortBy="client" storeName="myTasks"></table-sort>
                            
                            <div class="floating-container">
                                <input v-model="filters.client" ref="clientH" class="header p0" type="text" required>
                                <span @click="$refs['clientH'].focus()" class="floating-label">client</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort :key="j" @clicked="i=!i; k=!k; l=!l;" sortType="string" sortBy="desc" storeName="myTasks"></table-sort>

                            <div class="floating-container">
                                <input v-model="filters.description" ref="descH" class="header p0" type="text" required>
                                <span @click="$refs['descH'].focus()" class="floating-label">description</span>
                            </div>
                        </div>
                    </th>

                    <!-- <th>
                        <div class="flex">
                            <table-sort :key="k" @clicked="i=!i; j=!k; l=!l;" sortType="string" sortBy="deadline" storeName="myTasks"></table-sort>

                            <div class="floating-container">
                                <input v-model="filters.deadline" ref="deadlineH" class="header p0" type="text" required>
                                <span @click="$refs['deadlineH'].focus()" class="floating-label">deadline</span>
                            </div>
                        </div>              
                    </th> -->

                    <th>tags</th>

                    <th>status</th>
                </tr>
            </template>

            <template #tbody>
                <tr class="tr" v-for="(task, index) in myTasksList" :key="index">
                    <td>
                        {{task.title}}
                    </td>
                    <td>
                        {{task.client }}
                    </td>
                    
                    <td v-if="task.description != '_#_*&^'">{{task.description}}</td>
                    <td v-else></td>
                    
                    <!-- <td>
                        {{task.deadline}}
                    </td> -->

                    <td style="min-width: 200px;">
                        <vue-multiselect
                            v-model="task.subTaskTags"
                            @tag="createNewTag($event, task)"
                            @select="changeTags(task, $event, 'add')"
                            @remove="changeTags(task, $event, 'remove')"
                            :options="subTasksTagsInStore"
                            :custom-label="({name}) => name"
                            :taggable="true"
                            tag-placeholder="Add this as new tag"
                            :multiple="true"
                            :allow-empty="true"
                            track-by="id"
                            placeholder=""
                            class="multiselect__tag_bg"
                        >
                        </vue-multiselect>
                    </td>

                    <td>
                        <div class="ml16">
                            <vue-multiselect
                                @select="changeStatus(task.costSaved, task.taskId, task.id, $event)"
                                v-model="task.statusId"
                                :options="subTasksStatuses"
                                :custom-label="({name}) => name"
                                :multiple="false"
                                :allowEmpty="false"
                                track-by="id"
                                placeholder="Status"
                                style="min-width: 250px;"
                            >
                                <template #noResult>
                                    Oops! No client found. Consider creating new client
                                </template>
                            </vue-multiselect>
                        </div>
                    </td>
                </tr>  
            </template>

                <table-pagination
                    storeName="myTasks"
                ></table-pagination>

        </table-main>
    </div>
</template>

<script>
import swal from 'sweetalert'
import { myTasks } from '../api'
import TableMain from './TableMain.vue'
import TablePagination from './TablePagination.vue'
import TableSort from './TableSort.vue'
import VueMultiselect from 'vue-multiselect'

export default {
    components: { TableMain, TablePagination, TableSort, VueMultiselect },
    name: "MyTasksList",
    data() {
        return {
            i:0, j:0, k:0, l:0, p:0,

            polling: false
        }
    },
    computed: {
        subTasksTagsInStore() {
            return this.$store.getters['tasks/getSubTasksTags']
        },
        subTasksStatuses() {
            return this.$store.getters['tasks/getSubTasksStatuses']
        },
        myTasksList() {
            const res = this.$store.getters['myTasks/getList']()
            
            if (res?.length) 
                res.map((st) => {
                    st.statusId = this.subTasksStatuses.find((status) => {
                        return st.statusId === status.id
                    })
                    return st
                })
            return res
        },
        filters() {
            return this.$store.getters['myTasks/getFilters']
        }
    },
    methods: {
        createNewTag(newTag, task) {
            this.$store.commit('tasks/setNewTag', {newTag, task})
        },
        changeTags(subTask, e, action) {
            let tags = subTask.subTaskTags?.length > 0 ? [...subTask.subTaskTags] : []

            if(action === 'remove') {
                tags?.map((tag, i) => {
                    if(tag.id === e.id) {
                        tags.splice(i, 1)
                    }
                })
            }
            else {
                tags.push({id: e.id, name: e.name})
            }

            myTasks.changeTags({
                taskId: subTask.taskId,
                subTaskId: subTask.id,
                tags: JSON.stringify(tags)
            })
            .then(() => {
                this.$toast.success(`Saved`)
            })
            .catch(() => {
                this.$toast.error(`Oops! We can't perform this action right now`)
            })
            .finally(() => {
                this.$store.dispatch('tasks/fetchSubTasks', {
                    taskId: subTask.taskId,
                    force: true
                })
                this.$store.dispatch('myTasks/fetchList')
            })
        },
        changeStatus(costSaved, taskId, subTaskId, statusId) {
            statusId = statusId.id

           
            if (costSaved == 0 && statusId == 3) {
                swal({
                    text: "Provide the cost of sub-task before marking it done",
                    content: "input",
                    button: true
                })
                .then((cost) => {
                    if (!cost) throw null
                    return myTasks.changeStatus({taskId, subTaskId, statusId, cost, costSaved})
                })
                .then(() => {
                    this.$store.commit('tasks/flush', {taskId})
                    return this.$store.dispatch('myTasks/fetchList')
                })
                .then(() => {
                    this.$toast.success(`Saved`)

                    return this.$store.dispatch('tasks/fetchList', {
                        force: true
                    })
                })
                .catch(() => {
                    this.$toast.error(`Oops! We can't perform this action right now`)
                })
                .finally(() => {
                    this.polling = true
                    this.$store.commit('workDiary/flushMyTaskStatusChange')
                })
            }
            else {
                this.polling = false
                myTasks.changeStatus({taskId, subTaskId, statusId, costSaved})
                .then(() => {
                    this.$store.commit('tasks/flush', {taskId})
                    return this.$store.dispatch('myTasks/fetchList')
                })
                .then(() => {
                    this.$toast.success(`Saved`)

                    return this.$store.dispatch('tasks/fetchList', {
                        force: true
                    })
                })
                .catch(() => {
                    this.$toast.error(`Oops! We can't perform this action right now`)
                })
                .finally(() => {
                    this.polling = true
                    this.$store.commit('workDiary/flushMyTaskStatusChange')
                })
            }
        }
    },
    mounted() {
        var polling = (context) => {
            setTimeout(() => {
                this.$store.dispatch('myTasks/fetchList')
                if (context?.polling) polling(context)
            }, 600000) 
        }
        polling(this)
        this.polling = true
    }
}
</script>

<style scoped>
    .tr th:not(:nth-last-child(1)), 
    .tr td:not(:nth-last-child(1)), 
    .table-heading th:not(:nth-last-child(1)) {
        border-right: solid 1px #e7eaec !important;
    }
    .flex { 
        display: flex;
    }
    select {
        width: fit-content;
        border: none;
    }
    select, option {
        text-transform: capitalize;
        padding: 0;
    }
</style>