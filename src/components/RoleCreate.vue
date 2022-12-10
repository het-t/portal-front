<template>
    <div class="card">
        <form class="mr16 ml16 mt16 mb16 pr12 pl12">
            <div class="row mt8">
                <label ref="focus" for="role-name" class="labels c1">name</label>
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
                @click.prevent="(editRoleId == undefined || editRoleId == '') ? createRole({roleName, roleRights}) : editRole()" 
                class="green button"
            >save</button>
            <button @click.prevent="canceled()" class="neutral ml8 button">cancel</button>
        </form>
    </div>
</template>

<script>
import { roles } from '@/api'
import useCreateSwal from '@/helpers/swalCreate'
import swal from 'sweetalert'
import useEditSwal from '../helpers/swalEdit'

    export default {
        name: 'CreateRole',
        props: ['editRoleId'],
        data() {
            return {
                roleName: '',
                roleRights: [],
                rightsList: [],
            }
        },
        methods: {
            createRole({roleName, roleRights}) {
                useCreateSwal({
                    text: roleName,
                    mutationFnName: 'roles/RESET_STATE',
                    promise: () => roles.create({roleName, roleRights}),
                    context: this,
                    url: '/u/roles/list'
                }) 
            },
            editRole() {
                const args = {
                    roleId: this.editRoleId,
                    roleName: this.roleName,
                    roleRights: this.roleRights
                }
                useEditSwal({
                    text: args.roleName,
                    promise: () => roles.edit(args),
                    mutationFnName: 'roles/RESET_STATE',
                    context: this
                })
            },
            canceled() {
                swal({
                    title: "Do you really want to cancel editing?", 
                    text: "All changes will be reverted",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                .then((value) => {
                    if (value != null) throw null
                })
                .catch(() => {
                    if (this.editing == true) this.$emit("editingCompleted", {
                        editing: 0,
                        role: this.roleName
                    })
                    else this.$router.push('/u/roles/list')
                })
            }
        },
        created() {                       
            this.rightsList = this.$store.getters['rights/getAllRightsList']    //action invoked in rolesview.js
            
            const roleDataStore = this.$store.getters['roles/rolesDataGet'](this.editRoleId)
            
            if (this.editRoleId != undefined) {
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
        },
        mounted() {
            this.$refs['focus'].focus()
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