<template>
    <div>
        <AlertC v-show="displayAlert" 
            :msg="alertData.msg"
            :fn="deleteUser"
            :fnParam="alertData.params"
            v-on:close-alert="displayAlert = false"
        />
        <div class="card">
            <div class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">users</h5>
                <router-link class="table-action" to="/u/users/create-user">
                    create user
                </router-link>
            </div>

            <TableFilter :tableData="usersList" @filtered="filteredUsersList = $event" class="mr16 ml16 mt16 actions"/>
            <div class="mr16 ml16 mt16">
                <table>
                    <tr>
                        <th>name</th>
                        <th>rights</th>
                        <th>actions</th>
                    </tr>

                    <tr class="tr" v-for="user in usersListToDisplay()" :key="user?.id">
                        <td>
                            {{user.first_name + ' ' + user.last_name}}
                        </td>
                        <td>
                            {{user.rights}}
                        </td>
                        <td class="actions">
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
                        </td>
                    </tr>
                </table>
                <TablePagination @tableData="usersList = $event"
                    tableName="users"
                />            
            </div>
        </div>
        <router-view :editUser="$route.params.editUser"></router-view>
    </div>
</template>

<script>
    import axios from 'axios'
    import AlertC from './AlertC.vue'
    import TablePagination from './TablePagination.vue'
    import TableFilter from './TableFilter.vue';

    export default {
    name: "UserList",
    data() {
        return {
            alertData: {
                params: [{
                    user_id: ''
                }],
                msg: '',
            },
            usersList: "",
            filteredUsersList: undefined,
            displayAlert: false,
        };
    },
    methods: {
        usersListToDisplay() {
            if (this.filteredUsersList != undefined) {
                console.log("filtered")
                return this.filteredUsersList
            } 
            else {
                console.log("original")
                return this.usersList
            }
        },
        deleteUser(params) {
            axios.post('/u/api/users/delete-user', {
                ...params,
            }, {
                withCredentials: true
            })
            .then((results) => {
                console.log("deleteUser", results.data)
            })
        },
        alert(msg, userId) {
            this.displayAlert = true
            this.alertData.params[0].user_id = userId
            this.alertData.msg = msg
        }
    },
    components: { AlertC, TablePagination, TableFilter }
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