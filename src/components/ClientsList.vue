<template>
   <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li>
                        <font-awesome-icon @click.prevent="deleteClient(selectedClientId, selectedClient)"
                            class="menu-icons" 
                            :icon="['fas', 'trash']"
                        ></font-awesome-icon>
                    </li>
                </template>
            </dots-menu>
        </div>

        <table-main>

            <template #thead>
                <tr class="table-heading">
                    <th class="flex">
                        name
                        <table-sort @clicked="l=!l; j=!j; k=!k; p=!p;" :key="i" sortBy="name" sortType="string" storeName="clients"></table-sort>
                    </th>
                    <th>CIN/LLPIN</th>
                    <th class="flex">
                        type
                        <table-sort @clicked="l=!l;k=!k; i=!i; p=!p;" :key="j" sortBy="type" sortType="string" storeName="clients"></table-sort>
                    </th>
                    <th class="flex">
                        CA
                        <table-sort @clicked="l=!l; j=!j; i=!i; p=!p;" :key="k" sortBy="ca" sortType="string" storeName="clients"></table-sort>
                    </th>
                    <th class="flex">
                        contact
                        <table-sort @clicked="i=!i; j=!j; k=!k; p=!p;" :key="l" sortBy="con" sortType="string" storeName="clients"></table-sort>
                    </th>
                    <div class="p12"></div>
                </tr>
            </template>

            <template #tbody>
                <div v-for="(client, index) in clientList" :key="index">
                    <tr class="tr hidden-tr-parent" 
                        tabindex="0" 
                        @click.stop="editClient('row'+index)"
                        @keyup.enter="editClient('row'+index)"
                    >
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
                        <div class="dots p12">
                            <dots-img 
                                @openMenu="menu($event, {client: client.name + ' (' + client.type + ')', clientId: client.id, visibility: true})" 
                                @hideMenu="menu($event, {client: client.name + ' (' + client.type + ')', clientId: client.id, visibility: false})" 
                            />
                        </div>
                    </tr>

                    <tr class="tr tr-hidden hide mb16" :ref="'row'+index">
                        <client-create 
                            :uk="index"
                            :clientData="JSON.stringify(client)" 
                            @editingCompleted="editClient('row'+index)"
                        ></client-create>
                    </tr>
                </div>
            </template>

            <table-pagination @tableData="clientList = $event"
                :key="p"
                tableName="clients"
            />
        </table-main>
   </div>
</template>

<script>
    // import TableFilter from './TableFilter.vue'
    // import TableSort from './TableSort.vue';
    import ClientCreate from './ClientCreate.vue'
    import TableMain from './TableMain.vue'
    import DotsImg from './DotsImg.vue'
    import TablePagination from './TablePagination.vue'
    import DotsMenu from './DotsMenu.vue'
    import { clients } from '../api'
    import swal from 'sweetalert'
import TableSort from './TableSort.vue'

    export default {
        components: { ClientCreate, TableMain, DotsImg, TablePagination, DotsMenu, TableSort },
        name: 'ClientList',
        data() {
            return {
                clientList: '',

                selectedClientId: '',
                selectedClient: '',

                menuVisibisility: '',

                i:0, j:0, k:0, l:0, p:0
            }
        },
        methods: {
            editClient(rowIndex) {
                const show = this.$refs[rowIndex][0].classList.contains('hide')
                if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
                else this.$refs[rowIndex][0].classList.add('hide')
            },
            menu(e, {client, clientId, visibility}) {
                this.menuVisibisility = visibility
                this.selectedClientId = clientId
                this.selectedClient = client
                if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
            },
            deleteClient(clientId, client) {
                swal({
                    title: "Alert",
                    text: `do you really want to delete "${client}"`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                .then((value) => {
                    if (value == null) throw null 
                    return clients.delete({clientId})
                })
                .then(() => {
                    swal({
                        title: "Success",
                        text: `Deleted "${client}"`,
                        icon: 'success',
                        button: 'ok'
                    })
                })
                .catch(err => 
                    swal("Oops!", `We can't perform this action right now please try again\n\n details: ${err}`)
                )
            }
        }
    }
</script>

<style scoped>
    .flex {
        display: flex;
    }
    .tr:hover .dots-img {
        visibility: visible !important;
    }
    .tr, .table-heading {
        padding: 0;
        display: grid;
        align-items: initial;
        grid-template-columns: 1fr 1fr 1fr 2fr 2fr 36px;
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