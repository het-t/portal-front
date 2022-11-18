<template>
   <div>
        <div class="card">
            <div class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">clients</h5>
                <table-action-plus url="/u/clients/create-client" />
            </div>

            <TableFilter :tableData="''" @filtered="''" class="mr16 ml16 mt16 actions"/>

            <div class="mr16 ml16 mt16">
                <table>
                    <tr class="table-heading">
                        <!-- <th>
                            <div class="tr-th">
                                id
                                <TableSort :tableData="''" keyToSort="''" />
                            </div>
                        </th> -->
                        <div class="p12"></div>
                        <th>name</th>
                        <th>CIN/LLPIN</th>
                        <th>type</th>
                        <th>CA</th>
                        <th>contact</th>
                    </tr>

                    <tr class="tr" v-for="(client, index) in clientList" :key="index">
                        <div class="dots p12 mr8">
                            <img @click="editClient('row'+index)" src="../assets/icons/dots-icon.png" alt="" class="dots">
                        </div>
                        <td class="flex">
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
                                Name: {{client.caFirmName}}
                            </p>
                            <p>
                                E-Mail: {{client.caEmail}}
                            </p>
                            <p>
                                Pan: {{client.caPan}}
                            </p>
                            <p>
                                Address: {{client.caAddress}}
                            </p>
                        </td>
                        <td>
                            <p>
                                Name: {{client.conName}}
                            </p>
                            <p>
                                Phone: {{client.conPhone}}
                            </p>
                            <p>
                                E-Mail: {{client.conEmail}}
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
   </div>
</template>

<script>
    // import TableFilter from './TableFilter.vue'
    // import TableSort from './TableSort.vue';
    import {clients} from '@/api/index.js'
    import TableActionPlus from './TableActionPlus.vue'

    export default {
  components: { TableActionPlus },
        name: 'ClientList',
        data() {
            return {
                clientList: ''
            }
        },
        methods: {
            editClient() {
                clients.edit()
            }
        },
        // components: { TableFilter, TableSort },
        created() {
            clients.get()
            .then(results => {
                this.clientList = results.data.clientsList
            })
        }
    }
</script>

<style scoped>
    .tr:hover .dots img {
        visibility: visible !important;
    }
    .tr, .table-heading {
        display: grid;
        align-items: initial;
        grid-template-columns: 36px 1fr 1fr 1fr 2fr 2fr;
    }
    td {
        vertical-align: text-top;
    }
    p {
        margin-top: 0;
    }
</style>