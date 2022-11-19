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
import {users, roles} from '@/api/index.js'
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
                users.getData({
                    editUserId: this.editUserId
                })
                .then((response) => {
                    console.log(response.data.userData)
                    const {firstName, lastName, gender, birthdate, email, role, password, id} = response.data.userData
                    this.userFirstName = firstName
                    this.userLastName = lastName
                    this.userGender = gender
                    this.userBithdate = new Date(birthdate)
                    this.userEmail = email
                    this.userRole = role
                    this.userPassword = password
                    this.userId = id
                })
            } 
            roles.get({
                from: 0,
                recordsPerPage: 100,
            }) 
            .then((response) => {
                console.log("all roles: ", roles)
                this.dbRoles = response.data.rolesList
            })
            
        },
        methods: {
            ...mapActions(['promptMessage']),
            proceed() {
                if (!this.userId) {
                    users.create({
                        firstName: this.userFirstName,
                        lastName: this.userLastName,
                        gender: this.userGender,
                        birthdate: this.userBithdate,
                        email: this.userEmail,
                        role: this.userRole,
                        password: this.userPassword,
                    })
                    .then(()=>{
                        this.$router.push('/u/users/list')
                        this.promptMessage({
                            title: 'User Created',
                            msg: 'successfully'
                        })
                    })
                }
                else {
                    users.edit({
                        userId: this.userId,
                        firstName: this.firstName,
                        lastName: this.userLastName,
                        gender: this.userGender,
                        birthdate: this.userBithdate,
                        email: this.userEmail,
                        role: this.userRole,
                    })
                    .then(()=>{
                        this.$router.push('/u/users/list')
                        this.promptMessage({
                            title: 'User Created',
                            msg: 'successfully'
                        })
                    })
                }
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