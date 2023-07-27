<template>
    <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li @click="deleteRole(editRoleId, editRoleName)">
                        <font-awesome-icon
                            class="menu-icons" 
                            :icon="['fas', 'trash']"
                        ></font-awesome-icon>
                        Delete
                    </li>
                </template>
            </dots-menu>
        </div>

        <table-main>
            <template #thead>
                <tr>
                    <th>
                        <div class="flex">
                            <table-sort :key="i" @clicked="j=!j; p=!p;" sortType="string" sortBy="name" storeName="roles"></table-sort>

                            <div class="floating-container">
                                <input v-model="filters.name" ref="nameH" class="header p0" type="text" required>
                                <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort :key="j" @clicked="i!=i; p=!p;" sortType="number" sortBy="rights" storeName="roles"></table-sort>

                            <div class="floating-container">
                                <input v-model="filters.rights" ref="rightsH" type="text" class="header p0" required>
                                <span @click="$refs['rightsH'].focus()" class="floating-label">rights</span>
                            </div>
                        </div>
                    </th>
                    <th></th>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(role, index) in roles" :key="role.id">

                    <tr class="tr edit-role-tr"
                        tabindex="0"
                        @keyup.enter="editRole('row'+index, role.id, 0)"
                        @click.prevent="editRole('row'+index, role.id, 0)"    
                    >                        
                        <td>
                            {{role?.name}}
                        </td>

                        <td>
                            {{role?.rights}}
                        </td>

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
            </template>

            <table-pagination 
                storeName="roles"
            ></table-pagination>
        </table-main>
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
import TableMain from './TableMain.vue'
import swal from 'sweetalert'

    export default {
    name: "EditRoleList",
    data() {
        return {
            menuVisibisility: '',
            editRoleId: '',
            editRoleName: '',
            
            i:0, j:0, p:0,

            componentId: {}
            
        };
    },
    computed: {
        roles() {
            const currentPage = this.$store.getters['roles/getCurrentPage']
            const recordsPerPage = this.$store.getters['roles/getRecordsPerPage']

            const from = (currentPage-1)*(recordsPerPage)

            return this.$store.getters['roles/getList']({
                from,
                to: from + recordsPerPage
            })
        },
        filters() {
            return this.$store.getters['roles/getFilters']
        }
    },
    methods: {
        editRole(rowIndex, roleId, editingStatus) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')

            if(editingStatus === 0) {
                if (rightCheck('edit_role')) {
                    this.componentId[roleId] = 'SkeletonForm'
                    this.$store.dispatch('roles/fetchData', {
                        roleId
                    })
                    .then(() => this.componentId[roleId] = 'RoleCreate')
                } 
                else {
                    this.componentId[roleId] = 'NoAccess'
                }
            }
            else {
                if (editingStatus === 1) {
                    this.$store.dispatch('roles/fetchList', {
                        force: true
                    })
                }
                this.$store.dispatch('roles/fetchData', {
                    roleId,
                    force: true
                })
            }
        },
        deleteRole(roleId, roleName) {

            swal({
                icon: 'warning',
                title: 'Alert',
                text: `Do you really want to delete "${roleName}"`,
                buttons: true,
                dangerMode: true
            })
            .then(value => {
                if (value == null) throw null
                return roles.delete({roleId})
            })
            .then(() => {
                this.$toast.success(`Saved`)
                this.$store.commit('roles/flush', {roleId})
                return Promise.all([
                    this.$store.dispatch('roles/fetchList', {
                        force: true,
                        all: true
                    }),
                    this.$store.dispatch('roles/fetchList', {
                        force: true
                    })
                ])
            })
            .catch(err => {
                console.log(err)
            })
        },
        menu(e, {roleName, roleId, visibility}) {
            this.menuVisibisility = visibility
            this.editRoleId = roleId
            this.editRoleName = roleName
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        }
    },
    components: { TablePagination, DotsMenu, DotsImg, TableSort, RoleCreate, SkeletonForm, NoAccess, TableMain }
}
</script>

<style scoped>
@import '../assets/stylesheet/nth-child-no-border.css';

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