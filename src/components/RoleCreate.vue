<template>
    <div class="card">

        <div class="card-head m0 pb16 pt16 pr16 pl16">
            <h5 class="table-head m0">{{formHead}}</h5>
        </div>
        <form class="mr16 ml16 mt16 mb16 pr12 pl12">
            <div class="row mt8">
                <label for="role-name" class="labels c1">name</label>
                <input v-model="roleName" type="text" id="role-name"> 
            </div>
                
            <div class="hr"></div>

            <div class="row mt8">
                <label class="labels c1">rights</label>
                <div>
                    <!-- {{rightsList}} -->
                    {{roleRights}}
                    <div class="mt16" v-for="right in rightsList" :key="right">
                        <input v-model="roleRights" :id="right.id" :value="right.id" class="m0 mr16" type="checkbox" :name="right.name" :title="right?.description">
                        <label :for="right.id">{{right.name}}</label>
                    </div>
                </div>
            </div>

            <div class="hr"></div>

            <button @click.prevent="clear()" class="neutral button">cancel</button>
            <button @click.prevent="proceed(), clear()" class="green ml8 button">{{proceedBtn}}</button>
        </form>
    </div>
</template>

<script>
import { roles, getAllRights } from '@/api'
import { mapActions } from 'vuex'

    export default {
        name: 'CreateRole',
        props: ['editRoleName'],
        data() {
            return {
                roleName: '',
                roleRights: [],
                rightsList: [],
                formHead: 'create role',
                proceedBtn: 'create',
            }
        },
        methods: {
            ...mapActions(['promptMessage']),
            proceed() {
                this.$router.push('/u/roles/list')
                this.promptMessage({
                    title: 'Role Created',
                    msg: 'successfully'
                })
                if (this.editRoleName != undefined) this.editRole()
                else this.createRole()
            },
            createRole() {
                roles.create({roleName: this.roleName, roleRights: this.roleRights})
            },
            editRole() {
                roles.edit({roleName: this.roleName, roleRight: this.roleRights})
            },
            clear() {
                this.roleName = ''
                this.roleRights = []
            }
        },
        created() {            
            if (this.editRoleName != undefined) {
                this.formHead = 'edit role'
                this.proceedBtn = 'save'
                console.log("editing role", this.editRoleName)
                roles.getData({editRoleName: this.editRoleName})
                .then((roleData) => {
                    const editRoleData = roleData.data
                    this.roleName = editRoleData.name
                    this.roleRights = editRoleData.rights.split(',')
                    console.log(this.roleRights)
                })
            }
            
            getAllRights()
                .then((rights) => {
                    console.log("rights => ", rights.data)
                    this.rightsList = rights.data.rightsMasterList
                })
        }
    }
</script>

<style scoped>
    input[type="text"], input[type="date"] {
        width: 40% !important;
    }
    input[type="checkbox"] {
        width:auto !important;
        display: inline;
    }
    .labels {
        align-self: center;
    }

</style>