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
                    <div class="mt16" v-for="right in rightsList" :key="right">
                        <input v-model="roleRights" 
                            :id="right.id" 
                            :value="right.id" 
                            class="m0 mr16" 
                            type="checkbox" 
                            :name="right.name" 
                            :title="right?.description"
                        >
                        <label :for="right.id">{{right.name}}</label>
                    </div>
                </div>
            </div>

            <div class="hr"></div>

            <button @click.prevent="proceed(), clear()" class="green button">save</button>
            <button @click.prevent="clear()" class="neutral ml8 button">cancel</button>
        </form>
    </div>
</template>

<script>
import { roles } from '@/api'
import { mapActions } from 'vuex'

    export default {
        name: 'CreateRole',
        props: ['editRoleId'],
        data() {
            return {
                roleName: '',
                roleRights: [],
                rightsList: [],
                formHead: 'create role',
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
                .then((res) => {
                    if (res.data.roleCreated == 'success') {
                        this.$store.dispatch('roles/rolesAll', {force: true})
                    }
                })
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
            this.rightsList = this.$store.getters['rights/getAllRightsList']    //action invoked in rolesview.js
            
            const roleDataStore = this.$store.getters['roles/rolesDataGet'](this.editRoleId)
            
            if (this.editRoleId != undefined) {
                this.formHead = 'edit role'
                this.$store.dispatch('roles/rolesDataSet', {roleId: this.editRoleId})
            }
            
            if (roleDataStore != undefined && roleDataStore != '') {
                this.roleName = roleDataStore[0].roleName
                this.roleRights = roleDataStore.map(o => o.rightId)
            }
            else this.$store.subscribe((mutation, state) => {
                if (mutation.type == "roles/rolesDataSet" && mutation.payload.index == this.editRoleId) {
                    let roleData = state.roles.rolesData[this.editRoleId]
                    this.roleName = roleData[0].roleName
                    this.roleRights = roleData.map(o => o.rightId)
                }
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