<template>
   <div>
        <table-main>
            <template #table-heading>
                clients
            </template>

            <template #table-action>
                <table-action-plus url="/u/clients/create-client" />
            </template>

            <template #thead>
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
            </template>

            <template #tbody>
                <div v-for="(client, index) in clientList" :key="index">
                    <tr class="tr hidden-tr-parent" @click.prevent="editClient('row'+index)">
                        <div class="dots p12">
                            <dots-img @click.stop="editClient('row'+index)" />
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

                    <tr class="tr tr-hidden hide mb16" :ref="'row'+index">
                        <client-create :clientData="JSON.stringify(client)" displayHead="false"></client-create>
                    </tr>
                </div>
            </template>

            <template #pagination>
                <table-pagination @tableData="clientList = $event"
                    tableName="clients"
                />
            </template>
        </table-main>
   </div>
</template>

<script>
    // import TableFilter from './TableFilter.vue'
    // import TableSort from './TableSort.vue';
    import TableActionPlus from './TableActionPlus.vue'
    import ClientCreate from './ClientCreate.vue'
    import TableMain from './TableMain.vue'
    import DotsImg from './DotsImg.vue'
    import TablePagination from './TablePagination.vue'

    export default {
        components: { TableActionPlus, ClientCreate, TableMain, DotsImg, TablePagination },
        name: 'ClientList',
        data() {
            return {
                clientList: ''
            }
        },
        methods: {
            editClient(rowIndex) {
                const show = this.$refs[rowIndex][0].classList.contains('hide')
                if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
                else this.$refs[rowIndex][0].classList.add('hide')

                this.$store.dispatch('clients/getTypes')
            }
        },
    }
</script>

<style scoped>
    .tr:hover .dots-img {
        visibility: visible !important;
    }
    .tr, .table-heading {
        padding: 0;
        display: grid;
        align-items: initial;
        grid-template-columns: 36px 1fr 1fr 1fr 2fr 2fr;
    }
    .tr-hidden {
        grid-template-columns: auto;
        grid-column: 1/-1;
        margin-bottom: 58px;
    }
    td {
        vertical-align: text-top;
    }
    p {
        margin-top: 0;
    }
    .hide {
        display: none !important;
    }
</style>