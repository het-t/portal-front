<template>
    <div class="ml24 mr24">
        <view-list
            :categories="['To Do', 'Reassigned', 'In Progress', 'Paused', 'Pending For Approval', 'Approved', 'Done', 'Cancel']"
            :data-raw="dataRaw"
            group-by="status.name"
            :regroupFlag="regroupFlag"
            v-if="allow === true"
        >
            <template v-slot:record="{record}">
                <card-sub-task 
                    @status-changed="regroupFlag == 0 ? regroupFlag = 1 : regroupFlag = 0"
                    @delegation-added="regroupFlag == 0 ? regroupFlag = 1 : regroupFlag = 0, fetchMyTasks()"
                    @delegation-removed="regroupFlag == 0 ? regroupFlag = 1 : regroupFlag = 0, fetchMyTasks()"
                    @tag-added="regroupFlag == 0 ? regroupFlag = 1 : regroupFlag = 0"
                    @tag-removed="regroupFlag == 0 ? regroupFlag = 1 : regroupFlag = 0"
                    @deleted="regroupFlag == 0 ? regroupFlag = 1 : regroupFlag = 0"
                    @pin-changed="regroupFlag == 0 ? regroupFlag = 1 : regroupFlag = 0"
                    :sub-task="record"
                    :show-pin="true"
                />
            </template>
        </view-list>
    </div>
</template>

<script>
import { useMeta } from 'vue-meta'
import ViewList from '../util/ViewList.vue'
import CardSubTask from '@/util/CardSubTask.vue'

    export default {
        components: { ViewList, CardSubTask },
        name: "MyTasksView",
        setup() {
            useMeta({title: 'My Tasks'})
        },
        data() {
            return {
                allow: false,
                delegationCache: {},
                regroupFlag: 0
            }
        },
        computed: {
            dataRaw() {
                return this.$store.getters['myTasks/getList']()
            }
        },
        methods: {
            fetchMyTasks() {
                this.$store.dispatch('myTasks/fetchList') 
            }
        },
        mounted() {
            Promise.all([
                this.$store.dispatch('tasks/fetchSubTasksTags', {force: false}),
                this.$store.dispatch('users/fetchList', {all: true})
            ])
            .then(() => {
                this.$store.dispatch('myTasks/fetchList')
            })
            .then(() => {
                this.allow = true
            })
        }
    }
</script>