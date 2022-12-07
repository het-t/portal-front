<template>
    <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li>
                        <router-link :to="{name: 'edit_role', params: {editRoleId: editRoleId}}">
                            <font-awesome-icon class="menu-icons" :icon="['fas', 'pencil']"></font-awesome-icon>
                        </router-link>
                    </li>
                    <li>
                        <font-awesome-icon @click="deleteRole(editRoleId, editRoleName)"
                            class="menu-icons" 
                            :icon="['fas', 'trash']"
                        ></font-awesome-icon>
                    </li>
                </template>
            </dots-menu>
        </div>

        <div class="card">
            <div class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">roles</h5>
                <table-action-plus url="/u/roles/create-role"/>
            </div>

            <TableFilter :tableData="rolesList" @filtered="filteredRolesList = $event" class="mr16 ml16 mt16 actions"/>

            <div class="mr16 ml16 mt16">
                <table>
                    <tr>
                        <!-- <th>
                            <div class="tr-th">
                                id
                                <TableSort @sorted="filteredRolesList = $event" :tableData="roleListToDisplay()" keyToSort="id"/>
                            </div>
                        </th> -->
                        <th>name</th>
                        <th>rights</th>
                        <th></th>
                        <!-- <th>actions</th> -->
                    </tr>

                    <tr class="tr" v-for="role in roleListToDisplay()" :key="role.id">                        
                        <!-- <td>
                            {{role?.id}}
                        </td> -->
                        <td>
                            {{role?.name}}
                        </td>

                        <td>
                            {{role?.rights}}
                        </td>

                        <!--      -->
                        <!-- @hideMenu="menu($event, {roleName: role.name, roleId: role.id, visibility: true})"" -->
                        <DotsImg 
                            @openMenu="menu($event, {roleName: role.name, roleId: role.id, visibility: true})"
                            @hideMenu="menu($event, {roleName: role.name, roleId: role.id, visibility: false})"
                        />
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
// import swal from 'sweetalert'
import {roles} from '@/api/index.js'
import TablePagination from './TablePagination.vue'
// import TableSort from './TableSort.vue'
import TableFilter from './TableFilter.vue'
import TableActionPlus from './TableActionPlus.vue'
import DotsMenu from './DotsMenu.vue'
import DotsImg from './DotsImg.vue'
import swal from 'sweetalert'

    export default {
    name: "EditRoleList",
    data() {
        return {
            menuVisibisility: '',
            rolesList: [],
            editRoleId: '',
            editRoleName: '',
            filteredRolesList: undefined,
            displayAlert: false,
        };
    },
    methods: {
        deleteRole(roleId, roleName) {
            swal({
                title: "Alert",
                text: `do you really want to delete "${roleName}"`,
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
            .then((value) => {
                if (value == null) throw null
                return roles.delete({roleId})
            })
            .then(() => {
                swal({
                    title: "Success",
                    text: `Deleted "${roleName}"`,
                    icon: 'success',
                    button: 'ok'
                })
            })
            .catch(err => 
                swal("Oops!", `We can't perform this action right now please try again\n\n details: ${err}`)
            )
        },
        roleListToDisplay() {
            if (this.filteredRolesList != undefined) {
                return this.filteredRolesList
            } 
            else {
                return this.rolesList
            }
        },
        menu(e, {roleName, roleId, visibility}) {
            this.menuVisibisility = visibility
            this.editRoleId = roleId
            this.editRoleName = roleName
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        },
        // showSwal({editing, role}) {
        //     if (editing) {
        //         swal({
        //             title: "Success",
        //             text: `Edited "${role}"`,
        //             icon: "success",
        //             button: "Ok"
        //         })
        //     }
        // },
        clear() {
            this.roleName = "";
        }
    },
    components: { TablePagination, TableFilter, TableActionPlus, DotsMenu, DotsImg }
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