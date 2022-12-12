<template>
    <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li>
                        <router-link :to="{
                            name: 'edit_user', 
                            params : {
                                editUserId: selectedUserId
                            }
                        }">
                            <font-awesome-icon class="menu-icons" :icon="['fas', 'pencil']"></font-awesome-icon> 
                        </router-link>
                    </li>
                    <li>
                        <font-awesome-icon @click.prevent="deleteUser(selectedUserId, selectedUserName)"
                            class="menu-icons" 
                            :icon="['fas', 'trash']"
                        ></font-awesome-icon>
                    </li>
                </template>
            </dots-menu>
        </div>

        <table-main>

            <template #thead>
                <tr>
                    <th>
                        <div class="flex">
                            <table-sort class="inline" @clicked="i=!i; k=!k; p=!p;" :key="j" sortBy="name" sortType="string" storeName="users"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="nameH" type="text" class="header p0" required>
                                <span @click="$refs['nameH'].focus()" class="floating-label">name</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort class="inline" @clicked="i=!i; j=!j; p=!p;" :key="k" sortBy="email" sortType="string" storeName="users"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="emailH" type="text" class="header p0" required>
                                <span @click="$refs['emailH'].focus()" class="floating-label">email</span>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div class="flex">
                            <table-sort class="inline" @clicked="j=!j; k=!k; p=!p;" :key="i" sortBy="rights" sortType="number" storeName="users"></table-sort>
                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[2]" ref="rightsH" type="text" class="header p0" required>
                                <span @click="$refs['rightsH'].focus()" class="floating-label">rights</span>
                            </div>
                        </div>
                    </th>
                    <th></th>
                </tr>
            </template>
            <!-- v-if="usersList != ''" -->
            <template #tbody>
                <template v-for="(user, index) in usersList" :key="user?.id">
                    <tr 
                        class="tr edit-user-tr"
                        tabindex="0"
                        @keyup.enter="editUser('row'+index, user.id)"
                        @click.prevent="editUser('row'+index, user.id)"    
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
                            <user-create 
                                v-if="(allow[user.id] == true)"
                                :editUserId="user.id"
                                :uk="index"
                                @editingCompleted="[editUser('row'+index, user.id), showSwal($event)]"
                                class="user-create"
                            ></user-create>
                            <skeleton-form v-else 
                                :buttonsIndex=2    
                            ></skeleton-form>
                        </td>
                    </tr>
                </template>
            </template>
            
            <table-pagination :key="p"
                :filters="filterFor"
                @tableData="usersList = $event"
                tableName="users"
            ></table-pagination>
        </table-main>

            <!-- <TableFilter :tableData="usersList" @filtered="filteredUsersList = $event" class="mr16 ml16 mt16 actions"/> -->
    </div>
</template>

<script>
    import swal from "sweetalert"
    import UserCreate from './UserCreate.vue';
    import {users} from '../api/index.js'
    import TableMain from './TableMain.vue';
    import DotsImg from './DotsImg.vue';
    import DotsMenu from './DotsMenu.vue'
    // import TableFilter from './TableFilter.vue';
    import SkeletonForm from '../skeletons/SkeletonForm.vue';

    import { defineAsyncComponent } from '@vue/runtime-core';
import TableSort from './TableSort.vue';

    const TablePagination = defineAsyncComponent(
        () => import('./TablePagination.vue'),
    )

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

            filterFor: ['', '', ''] //0-name, 1-email, 2-rights
        };
    },
    methods: {
        editUser(rowIndex, userId) {
            const show = this.$refs[rowIndex][0].classList.contains('hide')
            if (show == true) this.$refs[rowIndex][0].classList.remove('hide')
            else this.$refs[rowIndex][0].classList.add('hide')

            Promise.all([
                this.$store.dispatch('users/usersDataSet', {userId})
            ])
            .then(() => {
                this.allow[userId] = true
            })
        },
        showSwal({editing, user}) {
            if (editing) {
                swal({
                    title: "Success",
                    text: `Edited "${user}"`,
                    icon: "success",
                    button: "Ok"
                })
            }
        },
        // usersListToDisplay() {
        //     if (this.filteredUsersList != undefined) {
        //         return this.filteredUsersList
        //     } 
        //     else {
        //         return this.usersList
        //     }
        // },
        deleteUser(userId, userName) {
            console.log('deleted user1', userName)
            swal({
                title: "Alert",
                text: `do you really want to delete "${userName}"`,
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
            .then((value) => {
                if (value == null) throw null
                return users.delete({userId})
            })
            .then(() => {
                console.log('deleted user2', userName)
                swal({
                    title: "Success",
                    text: `Deleted "${userName}"`,
                    icon: 'success',
                    button: 'ok'
                })
            })
            .catch(err => 
                swal("Oops!", `We can't perform this action right now please try again\n\n details: ${err}`)
            )
        },
        menu(e, {userId, userName, visibility}) {
            console.log("menu called")
            this.menuVisibisility = visibility
            this.selectedUserId = userId
            this.selectedUserName = userName
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        },
        sort() {
            this.p = !this.p
        }
    },
    components: { 
        TablePagination, 
        TableMain,
        DotsImg, 
        DotsMenu, 
        UserCreate,
        SkeletonForm,
        TableSort
    }
}
</script>,

<style scoped>  
    .flex { 
        display: flex;
        align-items: center;
    }
    .inline {
        display: inline;
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