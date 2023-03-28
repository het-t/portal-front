<template>
    <div v-if="settingObj.setting == 2" style="height: fit-content;" class="ml16">
        <div v-if="settingObj.value == 'true'" class="mt16">
            <button v-if="ntfPopupVisible == false" class="button neutral" @click="ntfPopupVisible = true">
                <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
                <span class="ml8">new notification</span>
            </button>

            <div v-else>
                <div style="display: flex;" class="mt8">
                    <input @input="text.user = ''; text.client = '';" v-model="custom" style="cursor: pointer; width: auto; margin: 0 8px 0 0;" type="checkbox" name="custom-rule" id="custom-rule-check">
                    <label for="custom-rule-check">Custom rule</label>
                </div>

                <div v-if="!custom" class="ntf-grid">
                    <label for="user">User</label>
                    <select v-model="text.user" name="user" id="user">
                        <option value="all">All</option>
                        <option value="None">None</option>
                    </select>
                </div>

                <div v-if="!custom" class="ntf-grid">
                    <label for="client">Client</label>
                    <select v-model="text.client" name="client" id="client">
                        <option value="all">All</option>
                        <option value="None">None</option>
                    </select>
                </div>

                <div class="autocomplete mt16" v-if="custom">
                    <label for="ntf-rule-user-wa">User Rule</label>
                    <textarea class="mt8" placeholder="'\' for suggestions" v-model="text.user" @input="handleInput($event, 'user')" name="ntf-rule-user-wa" id="ntf-rule-user-wa" cols="30" rows="2"></textarea>
                    <div v-if="showSuggestions.user" class="suggestions">
                        <div v-for="(suggestion, index) in suggestions.user" :key="index" @click="selectSuggestion(suggestion, 'user')">
                            {{ suggestion }}
                        </div>
                    </div>
                </div>

                <div class="autocomplete mt16" v-if="custom">
                    <label for="ntf-rule-client-wa">Client Rule</label>
                    <textarea class="mt8" placeholder="'\' for suggestions" v-model="text.client" @input="handleInput($event, 'client')" name="ntf-rule-client-wa" id="ntf-rule-client-wa" cols="30" rows="2"></textarea>
                    <div v-if="showSuggestions.client" class="suggestions">
                        <div v-for="(suggestion, index) in suggestions.client" :key="index" @click="selectSuggestion(suggestion, 'client')">
                            {{ suggestion }}
                        </div>
                    </div>
                </div>

                <span style="display: flex; justify-content: center; text-align: center; margin: 8px 0; width: 100%; max-width: 500px;" class="mt8 mb8">OR</span>

                <div class="mt8 mb8">
                    <input @change="ntfFile = $event.target.files[0]" type="file" accept=".xlsx, .xls, .xlsm" name="ntf-file" id="ntf-file">
                </div>

                <div class="mt32" style="display: flex; flex-direction: column;">
                    <label for="ntf-content">message</label>
                    <textarea class="mt8" placeholder="Include your organization's name" v-model="ntfContent" name="ntf-content" id="ntf-content" cols="60" rows="10"></textarea>
                </div>

                <div class="mt16" style="display: flex;">
                    <input v-model="consent" style="width: auto; margin-right: 8px; cursor: pointer;" type="checkbox" name="consent" id="consent">
                    <label for="consent">Send without asking for consent</label>
                </div>

                <div class="mt16">
                    <button class="button green" @click.prevent="sendWaNtf">send</button>
                    <button class="button neutral ml8" @click.prevent="ntfPopupVisible = false, ntfContent = '', ntfRule.userrole = 'none', ntfRule.clientType = 'none';">cancel</button>
                </div>
            </div>
        </div>
        
        <div v-if="!ntfPopupVisible" class="ntf-history-table mt12">
            <table-main class="tr" style="max-height: 250px; overflow: auto;">
                <template v-slot:thead>   
                    <tr>
                        <th>id</th>
                        <th>to</th>
                        <th>contact</th>
                        <th>content</th>
                        <th>status</th>
                        <th>action</th>
                    </tr>
                </template>

                <template v-slot:tbody>
                    <tr v-for="(ntf) in ntfHistory" :key="ntf.id" class="tr">
                        <td>{{ ntf.id }}</td>
                        <td>{{ ntf.toName }}</td>
                        <td>{{ ntf.toContact }}</td>
                        <td>{{ ntf.content }}</td>
                        <td>
                            <template v-if="ntf.failed == 1">Failed</template>
                            <template v-else-if="ntf.approved == 1 && ntf.sent == 1">Sent</template>
                            <template v-else-if="ntf.approved == 0">Waiting</template>
                            <template v-else-if="ntf.approved == 2">Disapproved</template>
                        </td>
                        <td style="display: flex; gap: 12px;">
                            <font-awesome-icon title="approve" v-if="ntf.approved == 0" @click.prevent="setConsent(ntf.id, 1)" :icon="['far', 'thumbs-up']" class="consent-btn approve"></font-awesome-icon>
                            <font-awesome-icon title="disapprove" v-if="ntf.approved == 0" @click.prevent="setConsent(ntf.id, 2)" :icon="['far', 'thumbs-down']" class="consent-btn disapprove"></font-awesome-icon>
                        </td>
                    </tr>
                </template>
            </table-main>
        </div>
    </div>
</template>

<script>
import { settings } from '@/api/index.js'
import TableMain from './TableMain.vue'
import axios from 'axios'

export default {
    name: 'SettingsWaNotification',
    components: {TableMain},
    props: ['settingObj'],
    data() {
        return {
            ntfPopupVisible: false,
            ntfContent: '',
            consent: false,
            ntfRule: {
                userrole: 'none',
                user: [],
                clientType: 'none'
            },
            custom: false,
            ntfFile: '',
            options: {
                user: [
                    'UserName', 
                    'UserRole'
                ],
                client: [
                    'ClientName', 
                    'ClientType', 
                ]
            },
            text: {
                user: '',
                client: ''
            },
            showSuggestions: {
                user: false,
                client: false
            },
            suggestionPosX: '',
            suggestionPosY: '',
            suggestions: {
                user: [],
                client: []
            },

            ntfHistory: []
        }
    },
    computed: {
        ClientType() {
            return this.$store.getters['clients/getAllTypesList'].map(el => el.type)
        },
        UserRole() {
            return this.$store.getters['roles/allRoles'].map(el => el.name)
        },
        UserName() {
            return this.$store.getters['users/allUsers'].filter(el => el.isActive == 1).map(el => el.email)
        },
        ClientName() {
            return this.$store.getters['clients/allClients'].map(el => el.name)
        }
    },
    methods: {
        sendWaNtf() {
            let formData = new FormData();
            formData.append('userRule', (this.text.user.trim() == '') ? ' 1 = 0 ' : this.text.user)
            formData.append('clientRule', (this.text.client.trim() == '') ? ' 1 = 0 ' : this.text.client)
            formData.append('content', this.ntfContent)
            formData.append('custom', this.custom)
            formData.append('consent', this.consent)
            formData.append('file', this.ntfFile)
            
            axios.post('/u/api/settings/notifications/wa/create', formData, 
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            .then(() => {
                this.ntfContent = ''
                this.ntfRule.userrole = 'none'
                this.ntfRule.clientType = 'none'
                this.text.user = ''
                this.text.client = ''
                this.custom = false
                this.consent = false
                this.$toast.success('notifications will be sent soon')
            })
            .catch(err => {
                this.$toast.error(`Oops! We can't perform this action right now`)
                console.log(err)
            })
            .finally(() => this.getHistory())
        },
        handleInput(e, recepientType) {
            const text = e.target.value
            let lastWord = e.target.value.trim().split(" ").pop()
            if (lastWord.startsWith('\\')) {
                this.showSuggestions[recepientType] = true
                this.suggestions[recepientType] = this.options[recepientType].filter(el => el.startsWith(lastWord.slice(1)))
            }
            else if (lastWord.endsWith('=')) {
                this.showSuggestions[recepientType] = true
            }
            else this.showSuggestions[recepientType] = false
            this.text[recepientType] = text
        },
        selectSuggestion(suggestion, recepientType) {
            this.suggestions[recepientType] = this[suggestion]

            let lastWordStart = this.text[recepientType].trim().lastIndexOf(" ") + 1

            let newText = this.text[recepientType].slice(0, lastWordStart + 1)
            
            if (this.text[recepientType][lastWordStart] == "=") newText = newText + '"' + suggestion + '"'
            else newText = newText + suggestion

            newText = newText + " " + this.text[recepientType].slice(this.text[recepientType].length)
            
            this.text[recepientType] = newText;
            this.showSuggestions[recepientType] = false;
        },
        getHistory() {
            settings.notifications.wa.get()
            .then(res => this.ntfHistory = res.data)
            .catch(err => console.log(err))
        },
        setConsent(id, consent) {
            settings.notifications.wa.consent({
                ntfId: id,
                consent,
            })
            .then(() => this.$toast.success('Success'))
            .catch(() => {
                this.$toast.error(`Oops! We can't perform this action right now`)
            })
            .finally(() => this.getHistory())
        }
    },
    created() {
        this.$store.dispatch('users/usersAll')
        this.$store.dispatch('clients/clientsAll')

        this.getHistory()
    }
}
</script>

<style scoped>
.consent-btn {
    height: 18px; 
    width: 18px; 
    cursor: pointer;
}
.approve:hover {
    color: #169871;
}
.disapprove:hover {
    color: rgb(163, 56, 56);
}
.ntf-grid {
    width: auto;
    display: grid;
    grid-template-columns: 150px minmax(100px, 350px);
    align-items: center;
}
#ntf-condition {
    grid-column-start: 1;
    grid-column-end: 3;
}
#ntf-content {
    width: 100%;
    max-width: 500px;
}
#ntf-file {
    width: 100%;
    max-width: 500px;
}
#file-upload-button {
    display: none;
}
.ntf-grid label,
.ntf-grid input,
.ntf-grid select,
.ntf-grid textarea {
    margin-top: 8px;
    width: 100% !important; 
}
.autocomplete {
  position: relative;
}
.autocomplete textarea {
  width: 100%;
  max-width: 500px;
  border: 1px solid #ddd;
  padding: 8px;
}
.autocomplete .suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.autocomplete .suggestions div {
  padding: 8px;
  cursor: pointer;
}
.autocomplete .suggestions div:hover {
  background-color: #f5f5f5;
}
.ntf-history-table {
    width: 100%;
}
.ntf-history-table td {
    vertical-align: text-top;
}
</style>