<template>
    <div class="setting-container">
        <div class="card">
            <slot name="table-head"></slot>
            
            <form id="setting-form" class="pr24 pl24 pt16 pb16">
                <template v-for="(settingObj, index) in settingsForm" :key="index">
                        <div v-if="settingObj.displayOrder == 1" class="hr"></div>

                        <toggle-switch class="grid" @switchToggled="save($event)" v-if="settingObj.type == 'toggle'" :name="new String(settingObj.setting)" :value="settingObj.value">
                            <template #label>{{ settingObj.meta?.label }}</template>
                        </toggle-switch>

                        <div v-if="settingObj.type != 'toggle'" class="grid mt16">
                            <label style="width: 150px;" :title="settingObj.meta?.tooltip" :for="settingObj.setting" v-if="settingObj.meta.label">
                                {{ settingObj.meta?.label }}
                            </label>

                            <input :size="settingObj.value.length" v-model="values[settingObj.setting]" v-if="settingObj.type == 'input'" :name="settingObj.setting" :id="settingObj.setting" :type="settingObj.meta?.type">

                            <div class="flex ml8">
                                <font-awesome-icon title="send OTP" v-if="settingObj?.meta?.requireAuth == true" @click.prevent="getOtp({'key': settingObj.setting, 'value': values[settingObj.setting]}, settingObj.meta.getOtp)" :icon="['solid', 'save']" class="save-btn"></font-awesome-icon>
                                <font-awesome-icon v-else @click.prevent="save({'key': settingObj.setting, 'value': values[settingObj.setting]})" class="save-btn" :icon="['solid', 'save']"></font-awesome-icon>
                            </div>

                            <div v-if="settingObj.meta.requireAuth == true && otpFor == settingObj.setting" style="display: flex; gap: 8px; align-items: center;" class="mt16">
                                <input v-model="otp" type="text" placeholder="OTP">
                                <font-awesome-icon @click.prevent="verifyOtp({'otp': otp}, settingObj.meta.verify)" class="save-btn" :icon="['fas', 'arrow-up-right-from-square']"></font-awesome-icon>
                            </div>
                        </div>

                        <div v-if="settingObj.meta.component" style="border-left: solid 6px #e5e5e5;">
                            <component :is="settingObj.meta.component" :settingObj="settingObj"></component>
                        </div>
                </template>
            </form>
        </div>
    </div>
</template>

<script>
import { settings } from '@/api/index.js'
import makePostReq from '../api/makePostReq'
import ToggleSwitch from './ToggleSwitch.vue'
import SettingsWaNotification from './SettingsWaNotification.vue'

export default {
    components: { ToggleSwitch, SettingsWaNotification }, 
    props: ['pageId'],
    name: 'TheSetting',
    data() {
        return {
            disabled: false,
            settingsForm: [],
            originalFormData: [],
            values: {},
            otpFor: '',
            otp: ''
        }
    },
    computed: {
        formCount() {
            let count = 0;
            let prevFormId = -1
            for(let obj of this.settingsForm) {
                if (obj.formId != prevFormId) {
                    count++
                    prevFormId = obj.formId
                }
            }
            return count
        },
    },
    methods: {
        btnVisibility(formId) {
            let count = 0
            for(let obj of this.settingsForm) {
                if (obj.formId == formId) count++
            }
            return count
        },
        save(arg) {
            makePostReq('settings/', arg)
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                this.getSettings()
            })
        },
        getOtp(args, forOtp) {
            this.otpFor = args.key

            let getOtp = settings
            
            forOtp.split('.').forEach((prop) => {
                getOtp = getOtp[prop]
            })


            getOtp(args)
            .then(() => {
                this.$toast.success('OTP will be sent to your WhatsApp in around 60sec')
            })
            .catch((err) => {
                this.$toast.error(`Oops! We can't perform this action right now`)
                console.log(err)
            })
        },
        verifyOtp(args, forVerification) {
            let verifyOtp = settings

            forVerification.split('.').forEach((prop) => {
                verifyOtp = verifyOtp[prop]
            })

            verifyOtp(args)
            .then(() => {
                this.$toast.success('WhatsApp number updated')
            })
            .catch(err => {
                this.$toast.error(`Oops! We can't perform this action right now`)
                console.log(err)
            }) 
            .finally(() => {
                this.otpFor = ''
                this.otp = ''
                this.getSettings()
            })
        },
        cancel() {
            this.email = '',
            this.password = ''
        },
        getSettings() {
            settings.get({
                pageId: this.pageId
            })
            .then(res => {
                this.settingsForm = res.data

                let p = {}
                for(let settingObj of res.data) {
                    p[settingObj.setting] = settingObj.value == null ? '' : settingObj.value
                    
                }

                this.values = p
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.getSettings()
    }
}
</script>

<style scoped>
@import "../assets/stylesheet/skeleton-card.css";

.flex {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
}
.qr-skeleton {
    width: 250px;
    height: 250px;
    animation: pulse-bg 1s infinite;
    margin-top: 8px;
}
.save-btn {
    height: 22px;
    cursor: pointer;
}

.grid {
    width: auto;
    display: grid;
    grid-template-columns: 200px auto auto;
    align-items: center;
}
.grid input {
    width: auto !important;
}
.setting-container .hr:not(:nth-child(1)) {
    height: 1px;
    width: 100%;
    margin: 16px 0;
}
.toggle__button {
    vertical-align: middle;
    user-select: none;
    cursor: pointer;
}
.toggle__button input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
}
.toggle__button .toggle__switch {
    display:inline-block;
    height:12px;
    border-radius:6px;
    width:40px;
    background: #BFCBD9;
    box-shadow: inset 0 0 1px #BFCBD9;
    position:relative;
    margin-left: 10px;
    transition: all .25s;
}

.toggle__button .toggle__switch::after, 
.toggle__button .toggle__switch::before {
    content: "";
    position: absolute;
    display: block;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    left: 0;
    top: -3px;
    transform: translateX(0);
    transition: all .25s cubic-bezier(.5, -.6, .5, 1.6);
}

.toggle__button .toggle__switch::after {
    background: #4D4D4D;
    box-shadow: 0 0 1px #666;
}
.toggle__button .toggle__switch::before {
    background: #4D4D4D;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
    opacity:0;
}
</style>