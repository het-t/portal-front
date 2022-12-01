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
                        <font-awesome-icon class="menu-icons" :icon="['fas', 'trash']"></font-awesome-icon>
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
                    <!-- <th>actions</th> -->
                </tr>
            </template>

            <template #tbody>
                <tr class="tr" v-for="user in usersListToDisplay()" :key="user?.id">
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
                    <!-- <td class="actions">
                        <router-link :to="{
                            name: 'edit_user', 
                            params : {
                                editUserId: user.id
                            }
                        }">
                            edit
                        </router-link>
                        <p class="delete m0 ml8" @click="alert(`do you want to delete ${user.id} user`, user.id)">
                        delete</p>
                    </td> -->
                </tr>
            </template>
            
            <template #pagination>
                <table-pagination
                    @tableData="usersList = $event"
                    tableName="users"
                ></table-pagination>
            </template>
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
    import {users} from '../api/index.js'
    import AlertC from './AlertC.vue'
    import TablePagination from './TablePagination.vue'
    import TableMain from './TableMain.vue';
    import DotsImg from './DotsImg.vue';
    import DotsMenu from './DotsMenu.vue'
    // import TableFilter from './TableFilter.vue';
    import TableActionPlus from './TableActionPlus.vue';

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
            menuVisibisility: ''
        };
    },
    methods: {
        usersListToDisplay() {
            if (this.filteredUsersList != undefined) {
                return this.filteredUsersList
            } 
            else {
                return this.usersList
            }
        },
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
    components: { AlertC, TablePagination, TableActionPlus, TableMain, DotsImg, DotsMenu }
}
</script>

<style scoped>  
    table {
        width: 100%;
    }
    th, tr, td {
        padding: 12px;
    }
    .actions {
        display: flex;
        flex-direction: horizontal;
    }
</style>