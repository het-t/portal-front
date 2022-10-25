<template>
   <div>
        <div class="card">
            <div class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">clients</h5>
                <router-link to="/u/clients/create-client" class="table-action" >create client</router-link>
            </div>

            <TableFilter :tableData="''" @filtered="''" class="mr16 ml16 mt16 actions"/>

            <div class="mr16 ml16 mt16">
                <table>
                    <tr>
                        <th>
                            <div class="tr-th">
                                id
                                <TableSort :tableData="''" keyToSort="''" />
                            </div>
                        </th>
                        <th>name</th>
                    </tr>

                    <tr class="tr" v-for="(client, index) in clientList" :key="index">
                        <td>
                            {{index+1}}
                        </td>
                        <td>
                            {{client}}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
   </div>
</template>

<script>
    import TableFilter from './TableFilter.vue'
import TableSort from './TableSort.vue';

    export default {
        name: 'ClientList',
        data() {
            return {
                clientList: ['TechAvidus', 'TechSome']
            }
        },
        components: { TableFilter, TableSort }
    }
</script>