<template>
    <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li @click.prevent="deleteUser(selectedUserId, selectedUserName)">
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
                            <table-sort @clicked="i=!i; k=!k; p=!p;" :key="j" sortBy="name" sortType="string" storeName="users"></table-sort>

                            <div class="floating-container">
                                <input v-model="filters.name" @input="updateFilters" ref="nameH" type="text" class="header p0" required>
                                <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; p=!p;" :key="k" sortBy="email" sortType="string" storeName="users"></table-sort>

                            <div class="floating-container">
                                <input v-model="filters.email" ref="emailH" type="text" class="header p0" required>
                                <span @click="$refs['emailH'].focus()" class="floating-label">username</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort @clicked="j=!j; k=!k; p=!p;" :key="i" sortBy="rights" sortType="number" storeName="users"></table-sort>
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
                <template v-for="(user, index) in users" :key="user?.id">
                    <template v-if="user.isActive == 1">
                        <tr 
                            class="tr edit-user-tr"
                            tabindex="0"
                            @keyup.enter="editUser('row'+index, user.id, 0)"
                            @click.prevent="editUser('row'+index, user.id, 0)"    
                        >
                            <td>
                                {{user.firstName + ' ' + user.lastName}}
                            </td>
                            <td>
                                {{user.email}}
                            </td>
                            <td>
                                {{user.rights}}
                            </td>
                            <td>
                                <dots-img
                                    @openMenu="menu($event, {userName: user.firstName + ' ' + user.lastName, userId: user.id, visibility: true})"
                                    @hideMenu="menu($event, {userName: user.firstName + ' ' + user.lastName, userId: user.id, visibility: false})" 
                                ></dots-img>
                            </td>
                        </tr>
                        <tr class="tr tr-hidden hide" :ref="('row'+index)">
                        <td colspan="3" class="p0 m0">
                                <component v-if="componentId?.[user.id]" 
                                    :is="componentId?.[user.id]"
                                    :editUserId="user.id"
                                    :uk="index"
                                    @editingCompleted="editUser('row'+index, user.id, 1)"
                                    class="user-create"
                                    :buttonsIndex=2    
                                ></component>

                                <skeleton-form v-else
                                    :buttonsIndex=2    
                                ></skeleton-form>
                            </td>
                        </tr>
                    </template>
                </template>
            </template>
            
            <table-pagination 
                @tableData="usersList = $event"
                storeName="users"
            ></table-pagination>
        </table-main>
    </div>
</template>

<script>
    import swal from "sweetalert";
    import NoAccess from "./NoAccess.vue";
    import rightCheck from "@/helpers/RightCheck";
    import UserCreate from './UserCreate.vue';
    import {users} from '../api/index.js'
    import TableMain from './TableMain.vue';
    import DotsImg from './DotsImg.vue';
    import DotsMenu from './DotsMenu.vue'
    import SkeletonForm from '../skeletons/SkeletonForm.vue';
    import TablePagination from './TablePagination.vue'

    import TableSort from './TableSort.vue';

    export default {
    name: "UserList",
    data() {
        return {
            usersList: "",

            selectedUserId: '',
            selectedUserName: '',

            filteredUsersList: undefined,
            displayAlert: false,
            menuVisibisility: '',
            allow: {},

            i:0, j:0, k:0, p:0,

            componentId: {}
        };
    },
    computed: {
        users() {
            const currentPage = this.$store.getters['users/getCurrentPage']
            const recordsPerPage = this.$store.getters['users/getRecordsPerPage']

            const from = (currentPage-1)*(recordsPerPage)
            return this.$store.getters['users/getList']({
                from,
                to: from + recordsPerPage
            })
        },
        filters() {
            return this.$store.getters['users/getFilters']
        }
    },
    methods: {
        editUser(rowIndex, userId, editingStatus) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')

            if(editingStatus === 0) {
                if (rightCheck('edit_user')) {
                    this.componentId[userId] = 'SkeletonForm'
                    Promise.all([
                        this.$store.dispatch('users/fetchData', {
                            userId
                        })
                    ])
                    .then(() => {
                        this.allow[userId] = true
                        this.componentId[userId] = 'UserCreate'
                    })
                }
                else this.componentId[userId] = 'NoAccess'
            }
            else {
                this.$store.dispatch('users/fetchList', {
                    force: true
                })
            }

        },
        deleteUser(userId, userName) {
            swal({
                icon: 'warning',
                title: 'Alert',
                text: `Do you really want to delete "${userName}"`,
                buttons: true,
                dangerMode: true
            })
            .then(value => {
                if (value == null) throw null
                return users.delete({userId})
            })
            .then(() => {
                this.$toast.success(`Saved`)
                this.$store.commit('users/flush', {userId})
                return Promise.all([
                    this.$store.dispatch('users/fetchList', {
                        force: true,
                        all: true
                    }),
                    this.$store.dispatch('users/fetchList', {
                        force: true
                    })
                ])
            })
            .catch(err => {
                console.log(err)
            })
        },
        menu(e, {userId, userName, visibility}) {
            this.menuVisibisility = visibility
            this.selectedUserId = userId
            this.selectedUserName = userName
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        }
    },
    components: { 
        TablePagination, 
        TableMain,
        DotsImg, 
        DotsMenu, 
        UserCreate,
        SkeletonForm,
        TableSort,
        NoAccess
    }
}
</script>,

<style scoped>  
@import '../assets/stylesheet/nth-child-no-border.css';

    .flex { 
        display: flex;
    }
    .edit-user-tr {
        cursor: pointer;
    }
    .hide {
        display: none !important;
    }
    table {
        width: 100%;
    }
    th, tr, td {
        padding: 12px;
    }
</style>