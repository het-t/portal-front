<template>
        <div class="card pb16">
            <form class="pt16 pb16">
                <div class="row mt8 pr16 pl32">
                    <label for="org-name">name</label>
                    <input v-model="orgName" type="text" id="org-name">
                </div>

                
                <div class="flex mt32 pr16 pl32">
                    <button 
                        :disabled="disabled === true"
                        @click.prevent="(editOrgId == undefined) ? createOrg() : editOrg()"
                        class="green button"
                    >save</button>

                    <button
                        :disabled="disabled === true"
                        @click.prevent="cancel"
                        class="neutral button ml8"
                    >cancel</button>
                </div>
            </form>
        </div>
</template>

<script>
import { admin } from '@/api';
import useCreateSwal from '@/helpers/swalCreate';
import axios from '../api/axiosInstance.js';

    export default {
        name: 'OrganizationsCreate',
        props: ['editOrgId'],
        data() {
            return {
                orgName: '',
                disabled: false
            }
        },
        methods: {
            createOrg() {
                const args = {
                    name: this.orgName
                }

                useCreateSwal({
                    text: args.name,
                    url: 'admin/orgs',
                    promise: admin.orgs.create(args),
                    context: this
                })
            },
            editOrg() {
                axios.post('orgs', {
                    id: this.editOrgId,
                    name: this.orgName
                })
                .finally(() => this.disabled = false)
            },
            cancel() {
                this.orgName = ''
            }
        }
    }
</script>

<style scoped>
label {
    width: 100px;
}
input {
    width: 30%;
}
.row {
    display: flex;
    align-items: center;
}
.pl32 {
    padding-left: 32px;
}
</style>