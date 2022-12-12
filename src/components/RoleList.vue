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

            <div class="mr16 ml16 mt16">
                <table>
                    <tr>
                        <!-- <th>
                            <div class="tr-th">
                                id
                                <TableSort @sorted="filteredRolesList = $event" :tableData="roleListToDisplay()" keyToSort="id"/>
                            </div>
                        </th> -->
                        <th>
                            <div class="flex">
                                <table-sort :key="i" @clicked="j=!j; p=!p;" class="inline" sortType="string" sortBy="name" storeName="roles"></table-sort>

                                <div class="floating-container">
                                    <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="nameH" class="header p0" type="text" required>
                                    <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex">
                                <table-sort :key="j" @clicked="i!=i; p=!p;" class="inline" sortType="number" sortBy="rights" storeName="roles"></table-sort>

                                <div class="floating-container">
                                    <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="rightsH" type="text" class="header p0" required>
                                    <span @click="$refs['rightsH'].focus()" class="floating-label">rights</span>
                                </div>
                            </div>
                        </th>
                        <th></th>
                    </tr>

                    <tr class="tr" v-for="role in roleListToDisplay()" :key="role.id">                        
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
                    :key="p"
                    :filters="filterFor"
                    tableName="roles"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {roles} from '@/api/index.js'
import DotsMenu from './DotsMenu.vue'
import DotsImg from './DotsImg.vue'
import swal from 'sweetalert'
import TablePagination from './TablePagination.vue'
import TableSort from './TableSort.vue'

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

            i:0, j:0, p:0,

            filterFor: ['', ''] //0-name, 1-rights
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
        clear() {
            this.roleName = "";
        },
        sort() {
            console.log('sorting', this.filterFor)
            this.p = !this.p
        }
    },
    components: { TablePagination, DotsMenu, DotsImg, TableSort }
}
</script>

<style scoped>

.flex { 
    display: flex;
    align-items: center;
}
.inline {
    display: inline;
}
input {
    width: 50%;
}
.tr:hover .dots-img {
    visibility: visible;
}
</style>