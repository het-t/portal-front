<template>
    <div class="card pr16 pl16 pb16">
        <form class="pr16 pl16 pt16 pb16">
            <div class="row mt8">
                <label ref="focus" for="role-name" class="labels c1">name</label>
                <input v-model="roleName" type="text" id="role-name" class="role-name"> 
            </div>
                
            <div class="hr"></div>

            <div class="row mt8">
                <label class="labels c1">rights</label>
                <div>
                    <div class="mt16 flex" v-for="right in getList" :key="right">
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
                @click.prevent="(editRoleId == undefined || editRoleId == '') ? createRole({roleName, roleRights}) : editRole({roleId: editRoleId, roleName, roleRights})" 
                class="green button mt8"
            >save</button>
            <button 
                :disabled="disabled === true" 
                @click.prevent="canceled()" 
                class="neutral ml8 button mt8"
            >cancel</button>
        </form>
    </div>
</template>

<script>
import { roles } from '@/api'
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
                'getList'
            ]),
            getData() {
                return this.$store.getters['roles/getData'](this.editRoleId)
            }
        },
        methods: {
            createRole(args) {
                this.disabled = true
                roles.create(args)
                .then(() => {
                    this.$toast.success(`Saved`)
                    return this.$store.dispatch('roles/fetchList', {
                        force: true
                    })
                })
                .then(() => {
                    this.$router.push({name: 'roles_list'})
                })
                .catch(() => {
                    this.$toast.error(`Oops! We can't perform this action right now`)
                })
                .finally(() => {
                    this.disabled = false
                })
            },
            editRole(args) {
                this.disabled = true

                roles.edit(args)
                .then(() => {
                    this.$emit('editingCompleted', 1)
                    this.$toast.success(`Saved #${args.roleId}`)
                })
                .catch(err => {
                    this.$toast.error(`Oops! We can't perform this action right now`)
                    console.log(err)
                })
                .finally(() => {
                    this.disabled = false
                })

            },
            canceled() {
                if (this.editRoleId !== undefined) {
                    this.$emit("editingCompleted", 2)
                }
                else this.$router.push({name: 'roles_list'})
            }
        },
        created() {  
            this.$store.dispatch('rights/fetchList')
            .then(() => {
                this.rightsList = this.$store.getters['rights/getAllRightsList']
            })
        },
        mounted() {
            this.$refs['focus'].focus()

            if (!isNaN(this.editRoleId)) {
                this.roleName = this.getData[0].roleName
                this.roleRights = this.getData.map(o => o.rightId)
            }
        }
    }
</script>

<style scoped>
    .flex {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .role-name {
        width: 30%;
    }
    input[type="checkbox"] {
        width:auto !important;
        display: inline;
    }
    .labels {
        align-self: center;
    }

</style>