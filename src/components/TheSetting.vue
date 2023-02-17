<template>
    <div class="setting-container">
        <div class="card">
            <slot name="table-head"></slot>
            
            <form id="setting-form" class="pr16 pl16 pt16 pb16">
                <template v-for="(settingObj, index) in settingsForm" :key="index">
                        <div v-if="settingObj.displayOrder == 1" class="hr"></div>

                        <toggle-switch class="grid" @switchToggled="save" v-if="settingObj.type == 'toggle'" :name="new String(settingObj.setting)" :value="settingObj.value">
                            <template #label>{{ settingObj.meta?.label }}</template>
                        </toggle-switch>
                    
                        <div v-else class="grid mt16">
                            <label style="width: 150px;" :title="settingObj.meta?.tooltip" :for="settingObj.setting" v-if="settingObj.meta.label">
                                {{ settingObj.meta?.label }}
                            </label>

                            <input :size="settingObj.value.length" v-model="values[settingObj.setting]" v-if="settingObj.type == 'input'" :name="settingObj.setting" :id="settingObj.setting" :type="settingObj.meta?.type">

                            <div class="flex ml8">
                                <font-awesome-icon @click.prevent="save({[settingObj.setting]: values[settingObj.setting]})" class="save-btn" :icon="['solid', 'save']"></font-awesome-icon>
                            </div>
                        </div>
                </template>
            </form>
        </div>
    </div>
</template>

<script>
import makeGetReq from '../api/makeGetReq'
import makePostReq from '../api/makePostReq'
import ToggleSwitch from './ToggleSwitch.vue'
export default {
  components: { ToggleSwitch },
    name: 'TheSetting',
    data() {
        return {
            disabled: false,
            settingsForm: [],
            originalFormData: [],
            values: {}
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
            makePostReq('/u/api/settings/', arg)
            .catch(err => {
                console.log(err)
            })
        },
        cancel() {
            this.email = '',
            this.password = ''
        }
    },
    mounted() {
        makeGetReq('/u/api/settings/', {})
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
}
</script>

<style scoped>

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
/* .flex-form {
    width: 100%;
    display: flex;
    align-items: center;
} */
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