<template>
   <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li @click.prevent="deleteClient(selectedClientId, selectedClient)">
                        <font-awesome-icon
                            class="menu-icons" 
                            :icon="['fas', 'trash']"
                        ></font-awesome-icon>
                        Delete
                    </li>
                    <li @click.prevent="changeClientTag(selectedClientId, 1)">
                        <font-awesome-icon
                            class="menu-icon"
                            :icon="['fas', 'check']"
                        ></font-awesome-icon>
                        Confirmed
                    </li>
                    <li @click.prevent="changeClientTag(selectedClientId, 2)">
                        <font-awesome-icon
                            class="menu-icon"
                            :icon="['fas', 'hand-holding-dollar']"
                        ></font-awesome-icon>
                        Lead
                    </li>
                </template>
            </dots-menu>
        </div>

        <div class="clientTag">
            <div @click.prevent="clientStatus(1)" class="tag-container" :class="filterFor[4] === 1 ? 'active-tag' : ''">
                <span>Confirmed</span>
            </div>

            <div @click.prevent="clientStatus(2)" class="tag-container" :class="filterFor[4] === 2 ? 'active-tag' : ''">
                <span>Leads</span>
            </div>
        </div>

        <table-main>

            <template #thead>
                <tr class="table-heading">
                    <th>
                        <div class="flex">
                            <table-sort @clicked="l=!l; j=!j; k=!k; p=!p; sort();" :key="i" sortBy="name" sortType="string" storeName="clients"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="nameH" type="text" class="header p0" required>
                                <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                            </div>                      
                        </div>
                    </th>
                    <th>
                        CIN/LLPIN
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort @clicked="l=!l;k=!k; i=!i; p=!p; sort();" :key="j" sortBy="type" sortType="string" storeName="clients"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="typeH" type="text" class="header p0" required>
                                <span @click="$refs['typeH'].focus()" class="floating-label">type</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort @clicked="l=!l; j=!j; i=!i; p=!p; sort();" :key="k" sortBy="ca" sortType="string" storeName="clients"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[2]" ref="caH" type="text" class="header p0" required>
                                <span @click="$refs['caH'].focus()" class="floating-label">CA</span>
                            </div>

                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; k=!k; p=!p; sort();" :key="l" sortBy="con" sortType="string" storeName="clients"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[3]" ref="conH" type="text" class="header p0" required>
                                <span @click="$refs['conH'].focus()" class="floating-label">contact</span>
                            </div>
                        </div>
                    </th>
                    <th class="p12"></th>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(client, index) in clientList" :key="index">
                    <tr class="tr hidden-tr-parent" 
                        tabindex="0" 
                        @click.stop="editClient('row'+index, client.id)"
                        @keyup.enter="editClient('row'+index, client.id)"
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
                        <td colspan="5" class="p0">
                            <component 
                                v-if="componentId?.[client.id]"
                                :is="componentId?.[client.id]"
                                :uk="index"
                                :clientData="JSON.stringify(client)" 
                                @editingCompleted="editClient('row'+index, client.id)"
                            ></component>
                        </td>
                    </tr>
                </template>
            </template>

            <table-pagination 
                @tableData="clientList = $event"
                :filters="filterFor"
                :key="$store.getters['clients/getKey']"
                tableName="clients"
            />
        </table-main>
   </div>
</template>

<script>
    import NoAccess from './NoAccess.vue'
    import ClientCreate from './ClientCreate.vue'
    import TableMain from './TableMain.vue'
    import DotsImg from './DotsImg.vue'
    import TablePagination from './TablePagination.vue'
    import DotsMenu from './DotsMenu.vue'
    import { clients } from '../api'
    import TableSort from './TableSort.vue'
    import rightCheck from '@/helpers/RightCheck'
    import useDeleteSwal from '@/helpers/swalDelete'

    export default {
        components: { 
            ClientCreate, 
            TableMain, 
            DotsImg, 
            TablePagination, 
            DotsMenu, 
            TableSort,
            NoAccess,
        },
        data() {
            return {
                clientList: '',

                selectedClientId: '',
                selectedClient: '',

                menuVisibisility: '',

                i:0, j:0, k:0, l:0, p:0,

                filterFor: ['', '', '', '', 1],

                componentId: {}
            }
        },
        methods: {
            clientStatus(status) {
                this.$store.commit('clients/setClientStatus', status)
                this.filterFor[4] = status
                this.sort()
            },
            editClient(rowIndex, clientId) {
                const show = this.$refs[rowIndex][0].classList.contains('hide')
                if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
                else this.$refs[rowIndex][0].classList.add('hide')

                if (rightCheck('edit_client')) {
                    this.componentId[clientId] = 'ClientCreate'
                }
                else this.componentId[clientId] = 'NoAccess'
            },
            menu(e, {client, clientId, visibility}) {
                this.menuVisibisility = visibility
                this.selectedClientId = clientId
                this.selectedClient = client
                if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
            },
            deleteClient(clientId, client) {
                useDeleteSwal({
                    text: client,
                    promise: () => clients.delete({clientId}),
                    mutationFn: 'clients/deleteClient',
                    mutationArgs: {clientId, filters:this.filterFor},
                    context: this
                })
            },
            changeClientTag(clientId, tag) {
                clients.tag({
                    id: clientId,
                    tagId: tag
                })
                .then(() => {
                    this.$store.commit('clients/refetch')
                })
                .catch(err => console.log(err))
            },
            sort() {
                this.$store.commit('clients/paginate')
            }
        }
    }
</script>

<style scoped>
@import '../assets/stylesheet/nth-child-no-border.css';
    .flex {
        display: flex;
    }
    .tr:hover .dots-img {
        visibility: visible !important;
    }
    .tr, .table-heading {
        padding: 0;
        align-items: initial;
    }
    .tr-hidden {
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
    thead {
        align-items: center;
    }
    .clientTag {
        display: flex;
    }
    .clientTag .tag-container {
        font-size: 16px;
        padding: 18px 36px;
        color: #676A6C;
        cursor: pointer;
    }
    .active-tag {
        font-weight: 500;
        border: solid 1px #e7eaec;
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
        background-color: white;
    }
</style>