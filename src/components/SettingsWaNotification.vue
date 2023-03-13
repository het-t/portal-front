<template>
    <div v-if="settingObj.setting == 2" style="width: fit-content; height: fit-content;" class="ml16">
        <div v-if="settingObj.value == 'true'">
            <button v-if="ntfPopupVisible == false" class="mt12 button neutral" @click="ntfPopupVisible = true">
                <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
                <span class="ml8">new notification</span>
            </button>

            <div v-else>
                <div class="ntf-grid">
                    <label for="ntf-condition">Condition</label>
                    <span></span>
                    <textarea name="ntf-condition" id="ntf-condition" cols="30" rows="10"></textarea>
                </div>

                <!-- <div class="ntf-grid">
                    <label for="int-role">user role</label>
                    <select v-model="ntfRule.userrole" name="int-role" id="int-role">
                        <option value="none">none</option>
                        <option value="all">all</option>
                        <option v-for="(role) in allRoles" :key="role.id" :value="role.id">
                            {{role.name}}
                        </option>
                    </select>
                </div>

                <div class="ntf-grid">
                    <label for="ext-client-type">client type</label>
                    <select v-model="ntfRule.clientType" name="ext-client-type" id="ext-client-type">
                        <option value="none">none</option>
                        <option value="all">all</option>
                        <option v-for="(clientType, index) of clientTypes" :key="index" :value="clientType.id">
                            {{clientType.type}}
                        </option>
                    </select>
                </div> -->

                <div class="ntf-grid">
                    <label for="ntf-content">message</label>
                    <span></span>
                    <textarea v-model="ntfContent" name="ntf-content" id="ntf-content" cols="60" rows="10"></textarea>
                </div>

                <div class="mt16">
                    <button class="button green" @click.prevent="sendWaNtf">send</button>
                    <button class="button neutral ml8" @click.prevent="ntfPopupVisible = false, ntfContent = '', ntfRule.userrole = 'none', ntfRule.clientType = 'none';">cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { settings } from '@/api/index.js'

export default {
    name: 'SettingsWaNotification',
    props: ['settingObj'],
    data() {
        return {
            ntfPopupVisible: false,
            ntfContent: '',
            ntfRule: {
                userrole: 'none',
                clientType: 'none'
            }
        }
    },
    computed: {
        clientTypes() {
            return this.$store.getters['clients/getAllTypesList']
        },
        allRoles() {
            return this.$store.getters['roles/allRoles']
        }
    },
    methods: {
        sendWaNtf() {
            settings.notifications.wa.create({
                content: this.ntfContent,
                rule: this.ntfRule,
            })
            .then(() => {
                this.ntfContent = ''
                this.ntfRule.userrole = 'none'
                this.ntfRule.clientType = 'none'
                this.$toast.success('notifications will be sent soon')
            })
            .catch(err => {
                this.$toast.error(`Oops! We can't perform this action right now`)
                console.log(err)
            })
        },
    }
}
</script>

<style scoped>
.ntf-grid {
    width: auto;
    display: grid;
    grid-template-columns: 150px 200px;
    align-items: center;
}
#ntf-condition,
#ntf-content {
    grid-column-start: 1;
    grid-column-end: 3;
}

.ntf-grid label,
.ntf-grid input,
.ntf-grid select,
.ntf-grid textarea {
    margin-top: 8px;
    width: 100% !important; 
}
</style>