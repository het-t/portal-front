<template>
    <div>

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
                        <th>
                            <div class="tr-th">
                                id
                                <TableSort @sorted="filteredRolesList = $event" :tableData="roleListToDisplay()" keyToSort="id"/>
                            </div>
                        </th>
                        <th>name</th>
                        <th>rights</th>
                        <th>actions</th>
                    </tr>

                    <tr class="tr" v-for="role in roleListToDisplay()" :key="role?.name" >
                        <td>
                            {{role?.id}}
                        </td>
                        <td>
                            {{role?.name}}
                        </td>

                        <td>
                            {{role?.rights}}
                        </td>

                        <td class="actions">
                            <router-link :to="{
                                name: 'edit_role', 
                                params: {
                                    editRoleName: role?.name
                                }
                            }">
                                edit
                            </router-link>
                            <p class="delete m0 ml8" @click="alert(`do you want to delete ${role?.name} role`, role?.id)">delete</p>
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
import TableSort from './TableSort.vue'
import TableFilter from './TableFilter.vue'
import TableActionPlus from './TableActionPlus.vue'

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
            rolesList: '',
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
    components: { AlertC, TablePagination, TableSort, TableFilter, TableActionPlus }
}
</script>

<style scoped>
input {
    width: 50%;
}
.delete {
    cursor: pointer;
}
.tr-th:hover img {
    display: inline;
}
</style>