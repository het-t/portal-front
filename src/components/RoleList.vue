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
                        <th>
                            <div class="flex">
                                <table-sort :key="i" @clicked="j=!j; p=!p;" sortType="string" sortBy="name" storeName="roles"></table-sort>

                                <div class="floating-container">
                                    <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="nameH" class="header p0" type="text" required>
                                    <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex">
                                <table-sort :key="j" @clicked="i!=i; p=!p;" sortType="number" sortBy="rights" storeName="roles"></table-sort>

                                <div class="floating-container">
                                    <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="rightsH" type="text" class="header p0" required>
                                    <span @click="$refs['rightsH'].focus()" class="floating-label">rights</span>
                                </div>
                            </div>
                        </th>
                        <th></th>
                    </tr>

                    <template v-for="(role, index) in roles()" :key="role.id">

                        <tr class="tr edit-role-tr"
                            tabindex="0"
                            @keyup.enter="editRole('row'+index, role.id, {})"
                            @click.prevent="editRole('row'+index, role.id, {})"    
                        >                        
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

                        <tr class="tr tr-hidden hide" :ref="('row'+index)">
                            <td colspan="2" class="p0 m0">
                                <component
                                    v-if="componentId?.[role.id]"
                                    :is="componentId?.[role.id]"
                                    :editRoleId="role.id"
                                    :uk="index"
                                    :buttonsIndex="1"
                                    @editingCompleted="editRole('row'+index, role.id , $event)"
                                ></component>

                                <skeleton-form v-else
                                    :buttonsIndex=2    
                                ></skeleton-form>
                            </td>
                        </tr>
                    </template>

                </table>

                <table-pagination 
                    @tableData="rolesList = $event"
                    :key="$store.getters['roles/getKey']"
                    :filters="filterFor"
                    tableName="roles"
                ></table-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {roles} from '@/api/index.js'
import DotsMenu from './DotsMenu.vue'
import DotsImg from './DotsImg.vue'
import TablePagination from './TablePagination.vue'
import TableSort from './TableSort.vue'
import RoleCreate from './RoleCreate.vue'
import rightCheck from '@/helpers/RightCheck'
import SkeletonForm from '@/skeletons/SkeletonForm.vue'
import NoAccess from './NoAccess.vue'
import useDeleteSwal from '@/helpers/swalDelete'

    export default {
    name: "EditRoleList",
    data() {
        return {
            menuVisibisility: '',
            rolesList: [],
            editRoleId: '',

            i:0, j:0, p:0,

            filterFor: ['', ''],     //0-name, 1-rights
            componentId: {}
            
        };
    },
    methods: {
        roles() {
            if (this.rolesList?.length != 0) return this.rolesList
            return this.$store.getters['roles/rolesListGet'](1, 'id', 0, this.filterFor)
        },
        editRole(rowIndex, roleId, {force}) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')

            if (rightCheck('edit_role')) {
                this.componentId[roleId] = 'SkeletonForm'
                this.$store.dispatch('roles/rolesDataSet', {roleId, force})
                .then(() => this.componentId[roleId] = 'RoleCreate')
            } 
        },
        deleteRole(roleId, roleName) {
            roles.delete({roleId})
            .then(() => 
                useDeleteSwal({
                    text: roleName,
                    context: this,
                    mutationFn: 'roles/deleteRole',
                    mutationArgs: {roleId, filters: this.filterFor}
                })
            )
        },
        menu(e, {roleName, roleId, visibility}) {
            this.menuVisibisility = visibility
            this.editRoleId = roleId
            this.editRoleName = roleName
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        },
        sort() {
            console.log('sorting', this.filterFor)
            this.p = !this.p
        }
    },
    components: { TablePagination, DotsMenu, DotsImg, TableSort, RoleCreate, SkeletonForm, NoAccess }
}
</script>

<style scoped>
.hide {
    display: none !important;
}
.edit-role-tr {
    cursor: pointer;
}
.flex { 
    display: flex;
}
input {
    width: 50%;
}
.tr:hover .dots-img {
    visibility: visible;
}
</style>