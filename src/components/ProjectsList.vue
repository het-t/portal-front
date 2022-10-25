<template>
    <div class="card">
        <div class="card-head m0 pb16 pt16 pl16 pr16">
            <h5 class="table-head m0">Projects</h5>
            <router-link to="/u/projects/create">create project</router-link>
        </div>

        <div class="mr16 ml16 mt16">
            <table>
                <tr>
                    <th></th>
                    <th>
                        <div class="tr-th">
                            id
                            <TableSort @sorted="''" :tableData="''" :keyToSort="''" />
                        </div>
                    </th>
                    <th>task</th>
                    <th>price</th>
                    <th>coordinator</th>
                    <th>created</th>
                    <th>due</th>
                    <th>status</th>
                </tr>
                <tr class="tr">
                    <td class="dots"><img class="dots" src="../assets/icons/dots-icon.png" alt=""></td>
                    <td>1</td>
                    <td>Incorporation of Company</td>
                    <td>15,000</td>
                    <td>Mayur Buha</td>
                    <td>{{new Date().toDateString()}}</td>
                    <td>{{new Date().toDateString()}}</td>
                    <td>It should be from latest sub-task</td>
                </tr>
                <tr class="tr">
                    <td class="dots"><img class="dots" src="../assets/icons/dots-icon.png" alt=""></td>
                    <td>2</td>
                    <td>Incorporation of Company</td>
                    <td>15,000</td>
                    <td>Mayur Buha</td>
                    <td>{{new Date().toDateString()}}</td>
                    <td>{{new Date().toDateString()}}</td>
                    <td>It should be from latest sub-task</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import TableSort from './TableSort.vue';
    export default {
    name: "ProjectsList",
    components: { TableSort }
}
</script>

<style scoped>
    .tr:hover .dots>img {
        display: inline !important;
    }
</style>