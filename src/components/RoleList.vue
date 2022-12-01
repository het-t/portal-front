<template>
    <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li>
                        <router-link :to="{name: 'edit_role', params: {editRoleName: editRoleName}}">
                            <font-awesome-icon class="menu-icons" :icon="['fas', 'pencil']"></font-awesome-icon>
                        </router-link>
                    </li>
                    <li>
                        <font-awesome-icon class="menu-icons" :icon="['fas', 'trash']"></font-awesome-icon>
                    </li>
                </template>
            </dots-menu>
        </div>

        <AlertC v-show="displayAlert" 
            :msg="alertData.msg"
            :fn="deleteRole"
            :fnParam="alertData.params"
            v-on:close-alert="displayAlert = false"
        />

        <div class="card">
            <div class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">roles</h5>
                <table-action-plus url="/u/roles/create-role"/>
            </div>

            <TableFilter :tableData="rolesList" @filtered="filteredRolesList = $event" class="mr16 ml16 mt16 actions"/>

            <div class="mr16 ml16 mt16">
                <table>
                    <tr>
                        <th></th>
                        <!-- <th>
                            <div class="tr-th">
                                id
                                <TableSort @sorted="filteredRolesList = $event" :tableData="roleListToDisplay()" keyToSort="id"/>
                            </div>
                        </th> -->
                        <th>name</th>
                        <th>rights</th>
                        <!-- <th>actions</th> -->
                    </tr>

                    <tr class="tr" v-for="role in roleListToDisplay()" :key="role?.name">
                        
                        <DotsImg @dotsClicked="showMenu($event, role.name)"/>
                        
                        <!-- <td>
                            {{role?.id}}
                        </td> -->
                        <td>
                            {{role?.name}}
                        </td>

                        <td>
                            {{role?.rights}}
                        </td>
                    </tr>
                </table>
                <TablePagination @tableData="rolesList = $event"
                    tableName="roles"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {roles} from '@/api/index.js'
import AlertC from './AlertC.vue'
import TablePagination from './TablePagination.vue'
// import TableSort from './TableSort.vue'
import TableFilter from './TableFilter.vue'
import TableActionPlus from './TableActionPlus.vue'
import DotsMenu from './DotsMenu.vue'
import DotsImg from './DotsImg.vue'

    export default {
    name: "EditRoleList",
    data() {
        return {
            alertData: {
                params: [{
                    role_id: ''
                }],
                msg: '',
            },
            menuVisibisility: '',
            rolesList: '',
            editRoleName: '',
            filteredRolesList: undefined,
            displayAlert: false,
        };
    },
    methods: {
        roleListToDisplay() {
            if (this.filteredRolesList != undefined) {
                return this.filteredRolesList
            } 
            else {
                return this.rolesList
            }
        },
        // getRoleData() {
        //     getRoleData({roleName: this.roleName})
        // },
        showMenu(e, roleName) {
            this.menuVisibisility = true
            this.editRoleName = roleName
            e.target.parentElement.appendChild(this.$refs['menu'])
        },
        deleteRole(params) {
            roles.delete(params)
            .then((results)=> {
                console.log("deleteRole", results.data)
            })
        },
        alert(msg, roleId) {
            this.displayAlert = true;
            this.alertData.params[0].role_id = roleId
            this.alertData.msg = msg;
        },
        clear() {
            this.roleName = "";
        }
    },
    components: { AlertC, TablePagination, TableFilter, TableActionPlus, DotsMenu, DotsImg }
}
</script>

<style scoped>
input {
    width: 50%;
}
.tr:hover .dots-img {
    visibility: visible;
}
</style>