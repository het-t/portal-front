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
                        <font-awesome-icon @click.prevent="deleteUser"
                            class="menu-icons" 
                            :icon="['fas', 'trash']"
                        ></font-awesome-icon>
                    </li>
                </template>
            </dots-menu>
        </div>

        <table-main>
            <template #table-heading>
                Users
            </template>

            <template #table-action>
                <table-action-plus url="/u/users/create-user"></table-action-plus>
            </template>

            <template #thead>
                <tr>
                    <th>name</th>
                    <th>rights</th>
                    <th></th>
                </tr>
            </template>
            <!-- v-if="usersList != ''" -->
            <template #tbody>
                <template v-for="(user, index) in usersList" :key="user?.id">
                    <tr 
                        class="tr edit-user-tr"
                        @click.prevent="editUser('row'+index, user.id)"    
                    >
                        <td>
                            {{user.firstName + ' ' + user.lastName}}
                        </td>
                        <td>
                            {{user.rights}}
                        </td>
                        <td>
                            <dots-img
                                @openMenu="menu($event, {userId: user.id, visibility: true})"
                                @hideMenu="menu($event, {userId: '', visibility: false})" 
                            ></dots-img>
                        </td>
                    </tr>
                    <tr class="tr tr-hidden hide" :ref="('row'+index)">
                        <td colspan="3" class="p0 m0">
                            <user-create 
                                v-if="(allow[user.id] == true)"
                                :editUserId="user.id"
                                displayHead="false"
                                :uk="index"
                                class="user-create"
                            ></user-create>
                            <skeleton-form v-else 
                                displayHead="false"
                                :buttonsIndex=2    
                            ></skeleton-form>
                        </td>
                    </tr>
                </template>
            </template>
            
            <table-pagination
                @tableData="usersList = $event"
                tableName="users"
            ></table-pagination>
        </table-main>

        <AlertC v-show="displayAlert" 
            :msg="alertData.msg"
            :fn="deleteUser"
            :fnParam="alertData.params"
            v-on:close-alert="displayAlert = false"
        />

            <!-- <TableFilter :tableData="usersList" @filtered="filteredUsersList = $event" class="mr16 ml16 mt16 actions"/> -->
    </div>
</template>

<script>
    import UserCreate from './UserCreate.vue';
    import {users} from '../api/index.js'
    import AlertC from './AlertC.vue'
    import TableMain from './TableMain.vue';
    import DotsImg from './DotsImg.vue';
    import DotsMenu from './DotsMenu.vue'
    // import TableFilter from './TableFilter.vue';
    import TableActionPlus from './TableActionPlus.vue'
    import SkeletonForm from '../skeletons/SkeletonForm.vue';

    import { defineAsyncComponent } from '@vue/runtime-core';

    const TablePagination = defineAsyncComponent(
        () => import('./TablePagination.vue'),
    )

export default {
    name: "UserList",
    data() {
        return {
            alertData: {
                params: [{
                    userId: ''
                }],
                msg: '',
            },
            usersList: "",
            selectedUserId: '',
            filteredUsersList: undefined,
            displayAlert: false,
            menuVisibisility: '',
            allow: {},
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
        // usersListToDisplay() {
        //     if (this.filteredUsersList != undefined) {
        //         return this.filteredUsersList
        //     } 
        //     else {
        //         return this.usersList
        //     }
        // },
        deleteUser(params) {
            users.delete(params)
            .then((results) => {
                console.log("deleteUser", results.data)
            })
        },
        alert(msg, userId) {
            this.displayAlert = true
            this.alertData.params[0].userId = userId
            this.alertData.msg = msg
        },
        menu(e, {userId, visibility}) {
            this.menuVisibisility = visibility
            this.selectedUserId = userId
            if (visibility == true) e.target.parentElement.appendChild(this.$refs['menu'])
        }
    },
    components: { 
        AlertC, 
        TablePagination, 
        TableActionPlus, 
        TableMain,
        DotsImg, 
        DotsMenu, 
        UserCreate,
        SkeletonForm
    }
}
</script>,

<style scoped>  
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