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

            <template #tableHeader>
                <div class="flex">
                    <h2 class="m0">Admins</h2>
                    <font-awesome-icon
                        @keyup.enter="$router.push(`/u/admin/orgs/${filterFor[3]}/create-admin`)"
                        @click.prevent="$router.push(`/u/admin/orgs/${filterFor[3]}/create-admin`)"
                        tabindex="1" 
                        class="icon ml16" 
                        icon="fa-solid fa-plus"
                    ></font-awesome-icon>
                </div>
            </template>
            <template #thead>
                <tr>
                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; k=!k; p=!p; sort();" :key="j" sortBy="name" sortType="string" storeName="users"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="nameH" type="text" class="header p0" required>
                                <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort @clicked="i=!i; j=!j; p=!p; sort();" :key="k" sortBy="email" sortType="string" storeName="users"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="emailH" type="text" class="header p0" required>
                                <span @click="$refs['emailH'].focus()" class="floating-label">username</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort @clicked="j=!j; k=!k; p=!p; sort();" :key="i" sortBy="rights" sortType="number" storeName="users"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[2]" ref="rightsH" type="text" class="header p0" required>
                                <span @click="$refs['rightsH'].focus()" class="floating-label">rights</span>
                            </div>
                        </div>
                    </th>
                    <th></th>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(user, index) in users()" :key="user?.id">
                    <tr 
                        class="tr edit-user-tr"
                        tabindex="0"
                        @keyup.enter="editUser('row'+index, user.id, $event)"
                        @click.prevent="editUser('row'+index, user.id, $event)"    
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
                                @editingCompleted="editUser('row'+index, user.id, $event)"
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
            
            <table-pagination 
                :filters="filterFor"
                @tableData="usersList = $event"
                tableName="orgs/admins"
                :noCaching="true"
            ></table-pagination>
        </table-main>
    </div>
</template>

<script>
    import NoAccess from "./NoAccess.vue";
    import rightCheck from "@/helpers/RightCheck";
    import UserCreate from './UserCreate.vue';
    import {users} from '../api/index.js'
    import TableMain from './TableMain.vue';
    import DotsImg from './DotsImg.vue';
    import DotsMenu from './DotsMenu.vue'
    import SkeletonForm from '../skeletons/SkeletonForm.vue';

    import { defineAsyncComponent } from 'vue';
    import TableSort from './TableSort.vue';
    import useDeleteSwal from "@/helpers/swalDelete";

    const TablePagination = defineAsyncComponent(
        () => import('./TablePagination.vue'),
    )

export default {
    name: "AdminList",
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

            filterFor: ['', '', '', ''], //0-name, 1-email, 2-rights

            componentId: {}
        };
    },
    methods: {
        users() {
            if (this.usersList?.length != 0) return this.usersList
            return this.$store.getters['users/usersListGet'](1, 'id', 0, this.filterFor)
        },
        editUser(rowIndex, userId, {force}) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')


            if (rightCheck('edit_user')) {
                this.componentId[userId] = 'SkeletonForm'
                Promise.all([
                    this.$store.dispatch('users/usersDataSet', {userId, force})
                ])
                .then(() => {
                    this.allow[userId] = true
                    this.componentId[userId] = 'UserCreate'
                })
            }
            else this.componentId[userId] = 'NoAccess'

        },
        deleteUser(userId, userName) {
            useDeleteSwal({
                text: userName,
                promise: () => users.delete({userId}),
                context: this,
                mutationFn: 'users/deleteUser',
                mutationArgs: {userId, filters: this.filterFor}
            })
        },
        menu(e, {userId, userName, visibility}) {
            this.menuVisibisility = visibility
            this.selectedUserId = userId
            this.selectedUserName = userName
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        },
        sort() {
            this.$store.commit('users/paginate')
        }
    },
    mounted() {
        this.$route.params?.orgId != undefined ? this.filterFor[3] = this.$route.params.orgId : ''
    },
    components: { 
        TablePagination, 
        TableMain,
        DotsImg, 
        DotsMenu, 
        UserCreate,
        SkeletonForm,
        TableSort,
        NoAccess,
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