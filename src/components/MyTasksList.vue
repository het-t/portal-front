<template>
    <div>
        <div class="card">
            <div class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">my tasks</h5>
            </div>

            <TableFilter tableData="''" @filtered="''"  class="mr16 ml16 mt16 actions"/>

            <div class="mr16 ml16 mt16">
                <table>
                    <tr>
                        <th>
                            description
                        </th>
                        <th>task</th>
                        <th>deadline</th>
                        <th>status</th>
                    </tr>
                    <tr class="tr" v-for="(task, index) in myTaskList" :key="index">
                        <td>
                            {{task.title}}
                        </td>
                        <td>{{task.task}}</td>
                        <td>
                            {{task.deadline}}
                        </td>
                        <td>
                            <select v-model="task.status" name="" id="">
                                <option value="hold">hold</option>
                                <option value="to do">to do</option>
                                <option value="in progress">in progress</option>
                                <option value="pending for approval">pending for approval</option>
                                <option value="done">done</option>
                                <option value="cancel">cancel</option>
                                <option value="pending with client">pending with client</option>
                                <option value="pending with signed documents">pending with signed documents</option>
                                <option value="pending with DSC">pending with DSC</option>
                            </select>
                        </td>
                    </tr>                
                </table>
            </div>
        </div>
    </div>
</template>

<script>
// import TableSort from './TableSort.vue';
// import TableFilter from './TableFilter.vue';
    export default {
    name: "MyTasksList",
    data() {
        return {
            myTaskList: [{
                title: 'Incorporation of Company',
                task: 'Check Name of Company',
                deadline: 'none',
                status: 'done',
            }, {
                title: 'Income Tax return',
                task: 'Collect Documents',
                deadline: 'none',
                status: 'to do'
            }]
        }
    }
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
    }
</style>