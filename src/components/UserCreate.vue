<template>
    <div class="card">
        <div v-if="(displayHead != 'false')"
            class="card-head m0 pb16 pt16 pr16 pl16"
        >
            <h5 class="table-head m0">{{formHead}}</h5>
        </div>

        <div class="table-tabs">
            <button @click="openTab($event, 'general')" :ref="('defaultTab'+uk)" class="button nutral tab">general</button>
            <button @click="openTab($event, 'credentials')" class="button nutral tab">credentials</button>
        </div>

        <div>
            <form class="mt16 pb16 pr16 pl16">
                <div class="pl16 pb16">
                    <div class="fg hide" :ref="('general'+uk)">
                        <div :id="('i1'+uk)" class="row mt8">
                            <label :for="('user-firstname'+uk)" class="labels c1">firstname</label>
                            <input v-model="userFirstName" :id="('user-firstname'+uk)" type="text">
                        </div>

                        <div :id="('i2'+uk)" class="row mt8">
                            <label for="user-lastname" class="labels c1">lastname</label>
                            <input v-model="userLastName" type="text" id="user-lastname">
                        </div>

                        <div :id="('i3'+uk)" class="row mt8">
                            <label :for="('user-gender'+uk)" class="labels c1">gender</label>
                            <select v-model="userGender" :id="('user-gender'+uk)">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <div :id="('i4'+uk)" class="row mt8">
                            <label :for="('user-birthdate'+uk)" class="labels c1">birthdate</label>
                            <input v-model="userBithdate" type="date" :id="('user-birthdate'+uk)">
                        </div>
                    </div>

                    <div class="fg hide" :ref="('credentials'+uk)">
                        <div :id="('i5'+uk)" class="row mt8">
                            <label :for="('user-email'+uk)" class="labels c1">email</label>
                            <input v-model="userEmail" type="text" :id="('user-email'+uk)">
                        </div>
                    
                        <div :id="('i6'+uk)" class="row mt8">
                            <label :for="('user-role'+uk)" class="labels c1">role</label>
                            <select v-model="userRole" :id="('user-role'+uk)">
                                <option v-for="(role) in dbRoles" :key="role.id" :value="role.name">
                                    {{role.name}}
                                </option>
                            </select>
                        </div>

                        <div :id="('i7'+uk)" class="row mt8">
                            <label :for="('user-pwd'+uk)" class="labels c1">password</label>
                            <input v-model="userPassword" type="password" :id="('user-pwd'+uk)">
                        </div>
                    </div>

                    <button @click.prevent="proceed(), clear()" class="green mt16 button">save</button>
                    <button @click.prevent="clear()" class="neutral ml8 mt16 button">cancel</button>

                </div>
            </form>
        </div>
    </div>


</template>

<script>
import {users} from '@/api/index.js'
import { mapActions } from 'vuex'
    export default {
        name: 'CreateUser',
        props: ['editUserId', 'displayHead', 'uk'],
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
                formHead: 'create user',
            }
        },
        created() {
            if (this.editUserId != undefined) {
                this.formHead = 'edit user'
            } 
        },
        mounted() {
            console.log("editUserId", this.editUserId)
            if (this.editUserId != undefined) {
                const userData = this.$store.getters['users/usersDataGet'](this.editUserId)
                const rolesList = this.$store.getters['roles/allRoles']

                if (userData != undefined && userData != '') {
                    this.populateDataProperties(userData)
                }
                if (rolesList != undefined && rolesList != '') {
                    this.dbRoles = rolesList
                }
            }

            this.$refs['defaultTab'+this.uk].click()
        },
        methods: {
            ...mapActions(['promptMessage']),
            openTab(e, newTab) {
                var tabs = e.target.parentElement.getElementsByClassName('tab')
                let curTab = [...tabs].find(tab => tab?.classList?.contains('tab-open') == true)
                curTab?.classList?.remove('tab-open')
                e?.target?.classList?.add('tab-open')
                this.$refs['general'+this.uk]?.classList?.add('hide')
                this.$refs['credentials'+this.uk]?.classList?.add('hide')
                this.$refs[newTab+this.uk]?.classList?.remove('hide')
            },
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
            populateDataProperties(o) {
                const {
                    firstName, 
                    lastName, 
                    gender, 
                    birthdate, 
                    email, 
                    role, 
                    password, 
                    id
                } = o

                this.userFirstName = firstName
                this.userLastName = lastName
                this.userGender = gender
                this.userBithdate = new Date(birthdate)
                this.userEmail = email
                this.userRole = role
                this.userPassword = password
                this.userId = id
            }
        }
    }
</script>

<style scoped>
.table-tabs {
    display: flex;
}
.tab {
    padding: auto;
    width: 50%;
    background-color: white;
    border-radius: 0;
}
.tab-open {
    border: solid 1px #d2d2d2;
    color:  #e7eaec;
    background-color: #2F4050;
}



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