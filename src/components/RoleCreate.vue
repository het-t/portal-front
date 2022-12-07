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

            <button 
                @click.prevent="(editRoleId == undefined || editRoleId == '') ? createRole() : editRole()" 
                class="green button"
            >save</button>
            <button @click.prevent="clear()" class="neutral ml8 button">cancel</button>
        </form>
    </div>
</template>

<script>
import { roles } from '@/api'
import swal from 'sweetalert'

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
            createRole() {
                roles.create({roleName: this.roleName, roleRights: this.roleRights})
                .then((res) => {
                    if (res.data.roleCreated == 'success') {
                        this.$store.dispatch("roles/rolesAll", {force: true})
                        .then(() => swal({
                            title: "",
                            text: "new role created",
                            icon: 'success',
                            button: 'ok'
                        }))
                        .then(() => 
                            this.$store.commit('roles/RESET_STATE')
                        )
                        .then(() => 
                            this.$router.push('/u/roles/list')
                        )
                        .catch((err) => {
                            swal("oops!", `we can't perform this action right now please try again\n\n details: ${err}`)
                        })
                    }
                })
            },
            editRole() {
                swal({
                    title: "Alert", 
                    text: `Do you really want to edit "${this.roleName}" role`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                .then((value) =>{ 
                    if (value == null) throw null
                    return roles.edit({
                        roleId: this.editRoleId,
                        roleName: this.roleName, 
                        roleRights: this.roleRights
                    })
                })
                .then(() => 
                    this.$store.commit('roles/RESET_STATE')
                )
                .catch((err) => 
                    swal("Oops!", `We can't perform this action right now please try again\n\n details: ${err}`)
                )
                .finally(() => {
                    this.$router.push('/u/roles/list')
                }) 
                .then(() => swal({
                    title: "Success",
                    text: `Edited "${this.roleName}"`,
                    icon: "success",
                    button: "Ok"
                }))
            },
            clear() {
                swal({
                    title: "Do you really want to cancel editing?", 
                    text: "All changes will be reverted",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                .then((value) => {
                    if (value == null) throw null
                    this.$router.push('/u/roles/list')
                })
                
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