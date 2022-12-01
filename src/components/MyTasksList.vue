<template>
    <div>
        <table-main>
            <template #table-heading>
                My Tasks
            </template>

            <template #thead>
                <tr class="table-heading">
                    <th>task</th>
                    <th>description</th>
                    <th>deadline</th>
                    <th>status</th>
                    <div></div>
                </tr>
            </template>

            <template #tbody>
                <tr class="tr" v-for="(task, index) in myTasksList" :key="index">
                    <td>
                        {{task.title}}
                    </td>
                    <td>{{task.description}}</td>
                    <td>
                        {{task.deadline}}
                    </td>
                    <td>
                        <select v-model="task.statusId" name="" id="">
                            <option v-for="status in subTaskStatuses" :value="status.id" :key="status.id">{{status.status}}</option>
                        </select>
                    </td>
                </tr>  
            </template>

            <template #pagination>
                <table-pagination
                    @tableData="myTasksList = $event"
                    tableName="myTasks"
                ></table-pagination>
            </template>
        </table-main>
    </div>
</template>

<script>
import TableMain from './TableMain.vue'
import TablePagination from './TablePagination.vue'
// import TableSort from './TableSort.vue';
// import TableFilter from './TableFilter.vue';
export default {
    components: { TableMain, TablePagination },
    name: "MyTasksList",
    data() {
        return {
            subTaskStatuses: [{id: 1, status: "hold"}, {id: 2, status: "to do"}, {id: 3, status: "in progress"}, {id: 4, status: "pending for approval"}, {id: 5, status: "done"}, {id: 6, status: "cancel"}, {id: 7, status: "pending with client"}, {id: 8, status: "pending with signed documents"}, {id: 9, status: "pending with DSC"}],
            myTasksList: []
        }
    },
    // components: { TableSort, TableFilter }
}
</script>

<style scoped>
    select {
        width: fit-content;
        border: none;
        border-bottom: solid 1px #e7eaec;
    }
    select, option {
        text-transform: capitalize;
        padding-right: 0;
        padding-left: 0;
    }
</style>