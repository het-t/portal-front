<template>
    <div class="card pr16 pl16 pb16">
        <form class="pr16 pl16 pt16 pb16">
            <div class="row mt8">
                <label ref="focus" for="role-name" class="labels c1">name</label>
                <input v-model="roleName" type="text" id="role-name"> 
            </div>
                
            <div class="hr"></div>

            <div class="row mt8">
                <label class="labels c1">rights</label>
                <div>
                    <div class="mt16 flex" v-for="right in getAllRightsList" :key="right">
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
                :disabled="disabled === true"
                @click.prevent="(editRoleId == undefined || editRoleId == '') ? createRole({roleName, roleRights}) : editRole()" 
                class="green button"
            >save</button>
            <button 
                :disabled="disabled === true" 
                @click.prevent="canceled()" 
                class="neutral ml8 button"
            >cancel</button>
        </form>
    </div>
</template>

<script>
import { roles } from '@/api'
import useCreateSwal from '@/helpers/swalCreate'
import useEditSwal from '../helpers/swalEdit'
import { mapGetters } from 'vuex'

    export default {
        name: 'CreateRole',
        props: ['editRoleId', 'uk'],
        data() {
            return {
                roleName: '',
                roleRights: [],
                rightsList: [],
                disabled: false
            }
        },
        computed: {
            ...mapGetters('rights', [
                'getAllRightsList'
            ]),
            ...mapGetters('roles', [
                'rolesDataGet'
            ]),
        },
        methods: {
            createRole({roleName, roleRights}) {
                this.disabled = true
                useCreateSwal({
                    text: roleName,
                    mutationFnName: 'roles/RESET_STATE',
                    promise: roles.create({roleName, roleRights}),
                    context: this,
                    url: '/u/roles/list'
                }) 
            },
            editRole() {
                this.disabled = true
                const args = {
                    roleId: this.editRoleId,
                    roleName: this.roleName,
                    roleRights: this.roleRights
                }
                
                useEditSwal({
                    text: args.roleName,
                    mutationFnName: 'roles/refetch',
                    mutationArgs: {roleId: args.roleId},
                    promise: roles.edit(args),
                    context: this
                })
            },
            canceled() {
                if (this.editRoleId != undefined) {
                    this.$emit("editingCompleted", {force: true})
                }
                else this.$router.push('/u/roles/list')
            }
        },
        created() {                       
            this.rightsList = this.$store.getters['rights/getAllRightsList']    //action invoked in rolesview.js
            
            const roleDataStore = this.$store.getters['roles/rolesDataGet'](this.editRoleId)
            
            console.log("editing", roleDataStore)
            
            if (roleDataStore != undefined && roleDataStore != '') {
                console.log("coming inside", roleDataStore)
                this.roleName = roleDataStore[0].roleName
                this.roleRights = roleDataStore.map(o => o.rightId)
            }
        },
        mounted() {
            this.$refs['focus'].focus()
        }
    }
</script>

<style scoped>
    .flex {
        display: flex;
        align-items: center;
        gap: 12px;
    }
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