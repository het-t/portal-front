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
                        <th>CIN/LLPIN</th>
                        <th>type</th>
                        <th>CA</th>
                        <th>contact</th>
                    </tr>

                    <tr class="tr" v-for="(client, index) in clientList" :key="index">
                        <td>
                            {{index+1}}
                        </td>
                        <td>
                            {{client.name}}
                        </td>
                        <td>
                            {{client.cin}}
                        </td>
                        <td>
                            {{client.type}}
                        </td>
                        <td>
                            <p>
                                Name: {{client.ca_firm_name}}
                            </p>
                            <p>
                                E-Mail: {{client.ca_email}}
                            </p>
                            <p>
                                Pan: {{client.ca_pan}}
                            </p>
                            <p>
                                Address: {{client.ca_address}}
                            </p>
                        </td>
                        <td>
                            <p>
                                Name: {{client.con_name}}
                            </p>
                            <p>
                                Phone: {{client.con_phone}}
                            </p>
                            <p>
                                E-Mail: {{client.con_email}}
                            </p>
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
    import {getClients} from '@/api/index.js'

    export default {
        name: 'ClientList',
        data() {
            return {
                clientList: ''
            }
        },
        components: { TableFilter, TableSort },
        created() {
            getClients()
            .then(results => {
                console.log(results.data)
                this.clientList = results.data
            })
        }
    }
</script>