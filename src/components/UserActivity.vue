<template>
    <div>
        <div class="card">


            <div class="mt16 ml16 mr16">
                <table>
                    <tr class="table-heading">
                        <th>
                            <div class="flex">
                                <table-sort @clicked="i=!i; k=!k; m=!m; n=!n; o=!o; p=!p;" :key="j" sortBy="id" sortType="number" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    id
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex">
                                <table-sort @clicked="j=!j; k=!k; m=!m; n=!n; o=!o; p=!p;" :key="i" sortBy="user" sortType="string" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    <input v-model="filters.email" ref="userH" type="text" class="header p0" required>
                                    <span @click="$refs['userH'].focus()" class="floating-label">user</span>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex">
                                <table-sort @clicked="i=!i; j=!j; m=!m; n=!n; o=!o; p=!p;" :key="k" sortBy="act" sortType="string" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    <input v-model="filters.activity" ref="activityH" type="text" class="header p0" required>
                                    <span @click="$refs['activityH'].focus()" class="floating-label">activity</span>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex">
                                <table-sort @clicked="i=!i; j=!j; k=!k; n=!n; o=!o; p=!p;" :key="m" sortBy="table" sortType="string" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    <input v-model="filters.refTable" ref="tableH" type="text" class="header p0" required>
                                    <span @click="$refs['tableH'].focus()" class="floating-label">table</span>
                                </div>
                            </div>
                            
                        </th>
                        <th>
                            <div class="flex">
                                <div class="floating-container">
                                    key
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex">
                                <table-sort @clicked="i=!i; j=!j; k=!k; m=!m; o=!o; p=!p;" :key="n" sortBy="details" sortType="string" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    <input v-model="filters.detail" ref="detailsH" type="text" class="header p0" required>
                                    <span @click="$refs['detailsH'].focus()" class="floating-label">details</span>
                                </div>
                            </div>
                            
                        </th>
                        <th class="w">
                            <div class="flex">
                                <table-sort @clicked="i=!i; j=!j; k=!k; m=!m; n=!n; p=!p;" :key="o" sortBy="time" sortType="number" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    <input v-model="filters.datetime" ref="timeH" type="text" class="header p0" required>
                                    <span @click="$refs['timeH'].focus()" class="floating-label">time</span>
                                </div>
                            </div>
                        </th>
                    </tr>

                    <tr class="tr" v-for="activity in activityData" :key="activity?.id" >
                        <td>
                            <span>{{ activity?.id }}</span>
                        </td>

                        <td>
                            <span>{{ activity?.email }}</span>
                        </td>

                        <td>
                            <span>{{ activity?.activity }}</span>
                        </td>
                        
                        <td>
                            <span>{{ activity?.referenceTable }}</span>
                        </td>

                        <td>
                            <span>{{ activity?.referenceTablePkId }}</span>
                        </td>

                        <td>
                            <span>{{ activity?.detail }}</span>
                        </td>

                        <td class="w">
                            <span>{{ (new Date(activity?.datestamp).toLocaleString()) }}</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="pagination mr16 ml16">
                <TablePagination @tableData="activityData = $event"
                    :key="p"
                    storeName="activity"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import TablePagination from './TablePagination.vue'
    import TableSort from './TableSort.vue'

    export default {
        name: "UserActivity",
        data() {
            return {
                activityData: [],

                i:0, j:0, k:0, l:0, m:0, n:0, o:0, p:0,
            };
        },
        computed: {
            filters() {
                return this.$store.getters['activity/getFilters']
            }
        },
        components: { 
            TablePagination,
            TableSort,
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
    .w {
        min-width: 150px;
    }
    .entries {
        display: flex;
        flex-direction: row;
        margin: 13px 0;
        align-items: center;
    }
</style>