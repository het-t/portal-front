<template>
    <div>
        <div class="card">


            <div class="mt16 ml16 mr16">
                <table>
                    <tr>
                        <th>
                            <div class="tr-th">
                                id
                            </div>
                        </th>
                        <th>
                            <div class="tr-th">
                                user
                            </div>
                        </th>
                        <th>
                            activity
                        </th>
                        <th>
                            table
                        </th>
                        <th>
                            key
                        </th>
                        <th>details</th>
                        <th class="w">
                            <div class="tr-th">
                                time
                            </div>
                        </th>
                    </tr>

                    <tr class="tr" v-for="activity in activitiesToDisplay" :key="activity?.id" >
                        <td>
                            {{activity?.id}}
                        </td>

                        <td>
                            {{activity?.email}}
                        </td>

                        <td>
                            {{activity?.activity}}
                        </td>
                        
                        <td>
                            {{activity?.referenceTable}}
                        </td>

                        <td>
                            {{activity?.referenceTablePkId}}
                        </td>

                        <td>
                            {{activity?.detail}}
                        </td>

                        <td class="w">
                            {{(new Date(activity?.datestamp).toLocaleString())}}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="pagination mr16 ml16">
                <TablePagination @tableData="tablePagination($event)"
                    tableName="activity"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import TablePagination from './TablePagination.vue'

    export default {
        name: "UserActivity",
        data() {
            return {
                activityData: [],
                filterFields: [
                    {name: 'id', relation: 'exact', type: 'number'},
                    {name: 'datestamp', relation: 'inequality', type: 'date'},
                    {name: 'email', relation: 'exact', type: 'text'},
                    {name: 'activity', relation: 'exact', type: 'select', values: ['login', 'activities']},
                    {name: 'detail', relation: 'exact', type: 'select', values: ['success', 'error']}
                ],
                filteredActivities: undefined,
                clear: false
            };
        },
        computed: {
            activitiesToDisplay() {
                if (this.filteredActivities != undefined) {
                    return this.filteredActivities
                } 
                else {
                    return this.activityData
                }
            }
        },
        methods: {
            tablePagination(event) {
                console.log("in user activity", event)
                this.activityData = event
                this.filteredActivities = undefined
                this.clear = true
            }
        },
        components: { TablePagination }
    }
</script>

<style scoped>
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