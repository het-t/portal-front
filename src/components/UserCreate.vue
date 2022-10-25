<template>
    <div class="card">
        <div class="card-head m0 pb16 pt16 pr16 pl16">
            <h5 class="table-head m0">{{formHead}}</h5>
        </div>
        <form class="mr16 ml16 mt16 mb16 pr12 pl12">
            <div class="fg-wrapper">
                <div class="fg">
                    <p class="head-tr">general</p>
                    <div id="i1" class="row mt8">
                        <label for="user-firstname" class="labels c1">firstname</label>
                        <input v-model="userFirstName" id="user-firstname" type="text">
                    </div>

                    <div id="i2" class="row mt8">
                        <label for="user-lastname" class="labels c1">lastname</label>
                        <input v-model="userLastName" type="text" id="user-lastname">
                    </div>

                    <div id="i3" class="row mt8">
                        <label for="user-gender" class="labels c1">gender</label>
                        <select v-model="userGender" id="user-gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div id="i4" class="row mt8">
                        <label for="user-birthdate" class="labels c1">birthdate</label>
                        <input v-model="userBithdate" type="date" id="user-birthdate">
                    </div>
                </div>

                <div class="vr"></div>

                <div class="fg">
                    <p class="head-tr">credentials</p>
                    <div id="i5" class="row mt8">
                        <label for="user-email" class="labels c1">email</label>
                        <input v-model="userEmail" type="text" id="user-email">
                    </div>
                
                    <div id="i6" class="row mt8">
                        <label for="user-role" class="labels c1">role</label>
                        <select v-model="userRole" type="text" id="user-role">
                            <option v-for="(role) in dbRoles" :key="role.id" :value="role.name">
                            {{role.name}}
                            </option>
                        </select>
                    </div>

                    <div id="i7" class="row mt8">
                        <label for="user-pwd" class="labels c1">password</label>
                        <input v-model="userPassword" type="password" id="user-pwd">
                    </div>
                </div>

            </div>
            <button @click.prevent="clear()" class="neutral mt16 button">cancel</button>
            <button @click.prevent="proceed(), clear()" class="green ml8 mt16 button">{{proceedBtn}}</button>
        </form>

    </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
    export default {
        name: 'CreateUser',
        props: ['editUserId'],
        data() {
            return {
                userFirstName: '',
                userLastName: '',
                userGender: '',
                userBithdate: '',
                userEmail: '',
                userRole: '',
                userPassword: '',
                dbRoles: [],
                userId: '',
                proceedBtn: 'create',
                formHead: 'create user',
            }
        },
        created() {
            console.log("editing user ",this.editUserId)
            if (this.editUserId != undefined) {
                this.proceedBtn = 'save'
                this.formHead = 'edit user'
                axios.get('/u/api/users/edit', {
                    withCredentials: true,
                    params: {
                        editUserId: this.editUserId,
                    }
                })
                .then((userData) => {
                    console.log("userData: ", userData.data)
                    const editUserData = userData.data
                    this.userFirstName = editUserData.first_name
                    this.userLastName = editUserData.last_name
                    this.userGender = editUserData.gender
                    this.userBithdate = new Date(editUserData.birth_date)
                    this.userEmail = editUserData.email
                    this.userRole = editUserData.role
                    this.userPassword = editUserData.password
                    this.userId = editUserData.id
                })
            } 

                axios.get('/u/api/roles', {
                    withCredentials: true,
                    params: {
                        from: 0,
                        records_per_page: 100,
                    },
                })
                .then((roles) => {
                    console.log("all roles: ", roles)
                    this.dbRoles = roles.data
                })
            
        },
        methods: {
            ...mapActions(['promptMessage']),
            proceed() {
                this.$router.push('/u/users/list')
                this.promptMessage({
                    title: 'User Created',
                    msg: 'successfully'
                })
                if (!this.userId) this.createUser()
                else this.editUser()
            },
            createUser() {
                axios.post('/u/api/users/create-user',{
                    params: {
                        first_name: this.userFirstName,
                        last_name: this.userLastName,
                        gender: this.userGender,
                        birthdate: this.userBithdate,
                        email: this.userEmail,
                        role: this.userRole,
                        password: this.userPassword,
                    },
                },{
                    withCredentials: true,
                })
            },
            editUser() {
                axios.post('/u/api/users/edit-user',{
                    params: {
                        user_id: this.userId,
                        first_name: this.userFirstName,
                        last_name: this.userLastName,
                        gender: this.userGender,
                        birthdate: '2003/10/19',
                        email: this.userEmail,
                        role: this.userRole,
                    },
                },{
                    withCredentials: true,
                })
            },
            clear() {
                this.userFirstName = ''
                this.userLastName = ''
                this.userGender = ''
                this.userBithdate = ''
                this.userEmail = ''
                this.userRole = ''
                this.userPassword = ''
            },
        }
    }
</script>

<style scoped>
    input, select {
        width: 100%;
    }
    input[type="checkbox"] {
        width:auto !important;
        display: inline;
    }
    .labels {
        align-self: center;
    }
</style>