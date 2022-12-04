<template>
        <div class="card">
            <div v-if="displayHead != 'false'" class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">create client</h5>
            </div>

            <div class="table-tabs">
                <button @click="openTab($event, 'client')" :ref='"defaultTab"+uk' class="button neutral tab">client detail</button>
                <button @click="openTab($event, 'ca')" class="button neutral tab">ca details</button>
                <button @click="openTab($event, 'contact')" class="button neutral tab">contact</button>
            </div>

            <form class="mr16 ml16 mt16 mb16 pr16 pl16">
                <div class="fg-wrapper">
                    <div class="hide fg" :ref="('client'+uk)">
                        <div class="row mt8">
                            <label for="client-cli-llpin" class="labels c1">CIN/LLPIN</label>
                            <input v-model="cin" type="text" id="client-cli-llpin">
                        </div>
                        <div id="i1" class="row mt8">
                            <label for="client-name" class="labels c1">name</label>
                            <input v-model="clientName" id="client-name" type="text">
                        </div>

                        <div id="i3" class="row mt8">
                            <label for="client-type" class="labels c1">type</label>
                            <select v-model="clientTypeId" id="client-type">
                                <option v-for="(clientType, index) of clientTypes" :key="index" :value="clientType.id">
                                    {{clientType.type}}
                                </option>
                            </select>
                        </div>
                    </div>


                    <div class="hide fg" :ref="('ca'+uk)">
                        <div id="i5" class="row mt8">
                            <label for="firm-name" class="labels c1">firm-name</label>
                            <input v-model="firmName" type="text" id="firm-name">
                        </div>
                    
                        <div id="i6" class="row mt8">
                            <label for="address" class="labels c1">address</label>
                            <input v-model="firmAddress" type="text" id="address">
                        </div>

                        <div id="i7" class="row mt8">
                            <label for="PAN" class="labels c1">PAN</label>
                            <input v-model="caPan" type="text" id="PAN">
                        </div>

                        <div id="i8" class="row mt8">
                            <label for="ca-email" class="labels c1">email</label>
                            <input v-model="caEmail" type="text" id="ca-email">
                        </div>
                    </div>
                </div>

                <div class="fg-wrapper">
                    <div class="hide fg" :ref="('contact'+uk)">
                        <div class="row mt8">
                            <label for="contact-name" class="labels c1">name</label>
                            <input v-model="conName" type="text" id="contact-name">
                        </div>
                        
                        <div class="row mt8">
                            <label for="contact-email" class="labels c1">email</label>
                            <input v-model="conEmail" type="text" id="contact-email">
                        </div>

                        <div class="row mt8">
                            <label for="contact-phone" class="labels c1">phone</label>
                            <input v-model="conPhone" type="text" id="contact-phone">
                        </div>
                    </div>
                </div>

                <button @click.prevent="proceed(), clear()" class="green mt16 button">save</button>
                <button @click.prevent="clear()" class="neutral ml8 mt16 button">cancel</button>

            </form>
        </div>
</template>

<script>
import { mapActions } from 'vuex'
import {clients} from '@/api/index.js'

export default {
    name: 'ClientCreate',
    props: ['displayHead', 'clientData', 'uk'],
    data() {
        return {
            cin: '',
            clientName: '',
            clientTypeId: '',
            firmName: '',
            firmAddress: '',
            caPan: '',
            caEmail: '',
            conName: '',
            conEmail: '',
            conPhone: '',
            
            editing: false,
            editClientId: '',
        }
    },
    computed: {
        clientTypes() {
            return this.$store.getters['clients/getAllTypesList']
        }
    },
    methods: {
        ...mapActions(['promptMessage']),
        openTab(e, newTab) {
                var tabs = e.target.parentElement.getElementsByClassName('tab')
                let curTab = [...tabs].find(tab => tab?.classList?.contains('tab-open') == true)
                curTab?.classList?.remove('tab-open')
                e?.target?.classList?.add('tab-open')
                this.$refs['client'+this.uk]?.classList?.add('hide')
                this.$refs['ca'+this.uk]?.classList?.add('hide')
                this.$refs['contact'+this.uk]?.classList?.add('hide')
                this.$refs[newTab+this.uk]?.classList?.remove('hide')
            },
        clear() {
            this.clientName = ''
            this.clientTypeId = ''
            this.cin = ''
            this.firmAddress = ''
            this.firmName = ''
            this.caEmail = ''
            this.caPan = ''
            this.conName = ''
            this.conEmail = ''
            this.conPhone = ''
        },
        proceed() {
            const args = {
                clientName: this.clientName,
                clientTypeId: this.clientTypeId,
                cin: this.cin,
                firmName: this.firmName,
                firmAddress: this.firmAddress,
                caEmail: this.caEmail,
                caPan: this.caPan,
                conName: this.conName,
                conEmail: this.conEmail,
                conPhone: this.conPhone
            }
            clients.create(args)
            .then((response) => {
                if (response.data.clientCreated == 'fail') throw new Error();
                this.$router.push('/u/clients/list')        
                this.promptMessage({
                    title: 'Client Created',
                    msg: 'successfully',
                    bgcolor: 'green'
                })
            })
            .then(() => {
                this.$store.commit('clients/RESET_STATE')
            })
            .catch(() => {
                this.promptMessage({
                    title: 'Error',
                    msg: 'client cannot be created',
                    bgcolor: 'red'
                })
            })
        }
    },
    mounted() {
        this.$refs['defaultTab'+this.uk].click()
        
        if (this.clientData != undefined) {
            this.editing = true
        }

        if (this.editing != false) {
            const {id, typeId, name, cin, caFirmName, caAddress, caPan, caEmail, conName, conEmail, conPhone} = JSON.parse(this.clientData)

            this.editClientId = id
            this.clientName = name
            this.cin = cin
            this.clientTypeId = typeId
            this.firmName = caFirmName
            this.firmAddress = caAddress
            this.caPan = caPan
            this.caEmail = caEmail
            this.conName = conName
            this.conEmail = conEmail
            this.conPhone = conPhone
            
        }
    }
}
</script>

<style scoped>
.hide {display: none;}
.table-tabs {
    display: flex;
}
.tab {
    padding: auto;
    width: 50%;
    background-color: white;
    border-radius: 0;
}
.tab-open {
    border: solid 1px #d2d2d2;
    color:  #e7eaec;
    background-color: #2F4050;
}


    .head-tr {
        display: block !important;
    }
    input, select {
        width: 100%;
    }
    option {
        text-transform: capitalize;
    }
</style>