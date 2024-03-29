<template>
    <div class="card">
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
                            <input :ref="('general'+uk+'focus')" v-model="userFirstName" :id="('user-firstname'+uk)" type="text">
                        </div>

                        <div :id="('i2'+uk)" class="row mt8">
                            <label :for="('user-lastname'+uk)" class="labels c1">lastname</label>
                            <input v-model="userLastName" type="text" :id="('user-lastname'+uk)">
                        </div>

                        <div :id="('i3'+uk)" class="row mt8">
                            <label :for="('user-gender'+uk)" class="labels c1">gender</label>
                            <select v-model="userGender" :id="('user-gender'+uk)">
                                <option value=1>Male</option>
                                <option value=2>Female</option>
                                <option value=3>Others</option>
                            </select>
                        </div>

                        <div :id="('i4'+uk)" class="row mt8">
                            <label :for="('user-birthdate'+uk)" class="labels c1">birthdate</label>
                            <input v-model="userBirthdate" type="date" :id="('user-birthdate'+uk)">
                        </div>
                    </div>

                    <div class="fg hide" :ref="('credentials'+uk)">
                        <div :id="('i5'+uk)" class="row mt8">
                            <label :for="('user-email'+uk)" class="labels c1">username</label>
                            <input :ref="('credentials'+uk+'focus')" v-model="userEmail" type="text" :id="('user-email'+uk)">
                        </div>

                        <div v-if="orgId == ''" :id="('i6'+uk)" class="row mt8">
                            <label :for="('user-role'+uk)" class="labels c1">role</label>
                            <select v-model="userRole" :id="('user-role'+uk)">
                                <option v-for="(role) in dbRoles" :key="role.id" :value="role.id">
                                    {{role.name}}
                                </option>
                            </select>
                        </div>

                        <div :id="('i7'+uk)" class="row mt8">
                            <label :for="('user-pwd'+uk)" class="labels c1">password</label>
                            <input :disabled="editUserId == undefined ? false : true" v-model="userPassword" type="password" :id="('user-pwd'+uk)">
                        </div>
                    </div>

                    <button :disabled="disabled === true" @click.prevent="proceed()" class="green mt16 button">save</button>
                    <button :disabled="disabled === true" @click.prevent="canceled()" class="neutral ml8 mt16 button">cancel</button>
                </div>
            </form>
        </div>
    </div>


</template>

<script>
import { users, admin } from '@/api/index.js'
import useCreateSwal from '@/helpers/swalCreate'

    export default {
        name: 'CreateUser',
        props: ['editUserId', 'uk'],
        data() {
            return {
                userFirstName: '',
                userLastName: '',
                userGender: '',
                userBirthdate: '',
                userEmail: '',
                userRole: '',
                userPassword: '',
                dbRoles: [],
                userId: '',
                disabled: false,
                orgId: ''
            }
        },
        mounted() {
            if (this.editUserId != undefined) {
                const userData = this.$store.getters['users/getData'](this.editUserId)

                this.populateDataProperties(userData)
            }
            if (this.orgId == '') {
                this.dbRoles = this.$store.getters['roles/getList']({
                    filters: ['null', 'null']
                })
            }
            else {
                this.orgId = this.$route.params?.orgId != undefined ? this.$route.params.orgId : ''
            }

            this.$refs['defaultTab'+this.uk].click()
        },
        methods: {
            openTab(e, newTab) {
                var tabs = e.target.parentElement.getElementsByClassName('tab')
                let curTab = [...tabs].find(tab => tab?.classList?.contains('tab-open') == true)
                curTab?.classList?.remove('tab-open')
                e?.target?.classList?.add('tab-open')
                this.$refs['general'+this.uk]?.classList?.add('hide')
                this.$refs['credentials'+this.uk]?.classList?.add('hide')
                this.$refs[newTab+this.uk]?.classList?.remove('hide')
                this.$refs[newTab+this.uk+'focus'].focus()
            },
            canceled() {
                if (this.editUserId != undefined) this.$emit("editingCompleted")
                else {
                    if (this.orgId != '') this.$router.push('/u/admin/orgs')
                    else this.$router.push('/u/users/list')
                }
            },
            proceed() {
                this.disabled = true
                const args = {
                    userId: this.userId,
                    firstName: this.userFirstName,
                    lastName: this.userLastName,
                    gender: this.userGender,
                    birthdate: this.userBirthdate,
                    email: this.userEmail,
                    role: this.userRole,
                    password: this.userPassword,
                    orgId: this.orgId
                }

                if (this.orgId != '') {
                    useCreateSwal({
                        text: args.firstName + '' + args.lastName,
                        url: `/u/admin/orgs/${args.orgId}`,
                        promise: admin.users.create(args),
                        context: this
                    })
                }
                else {
                    if (!args.userId) {
                        users.create(args)
                        .then(() => {
                            this.$toast.success(`Saved`)
                            return this.$store.dispatch('users/fetchList', {force: true})
                        })
                        .then(() => {
                            this.$router.push({name: 'users_list'})
                        })
                        .catch(() => {
                            this.$toast.error(`Oops! We can't perform this action right now`)
                        })
                        .finally(() => {
                            this.disabled = false
                        })
                    }
                    else {
                        users.edit(args)
                        .then(() => {
                            this.$emit('editingCompleted')
                            this.$toast.success(`Saved #${args.userId}`)
                        })
                        .catch(err => {
                            this.$toast.error(`Oops! We can't perform this action right now`)
                            console.log(err)
                        })
                        .finally(() => {
                            this.disabled = false
                        })
                    }
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
                this.userBirthdate = new Date(birthdate)
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