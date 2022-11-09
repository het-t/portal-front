<template>
        <div class="card">
            <div class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">create client</h5>
            </div>

            <form class="mr16 ml16 mt16 mb16 pr12 pl12">
                <div class="fg-wrapper">
                    <div class="fg">
                        <p class="head-tr">client</p>
                        <div class="row mt8">
                            <label for="client-cli-llpin" class="labels c1">CIN/LLPIN</label>
                            <input type="number" id="client-cli-llpin">
                        </div>
                        <div id="i1" class="row mt8">
                            <label for="client-name" class="labels c1">name</label>
                            <input v-model="clientName" id="client-name" type="text">
                        </div>

                        <div id="i3" class="row mt8">
                            <label for="client-type" class="labels c1">type</label>
                            <select v-model="clientType" id="client-type">
                                <option value="private-company">private-company</option>
                                <option value="unlisted-company">unlisted-company</option>
                                <option value="listed-company">listed-company</option>
                                <option value="nidhi-company">nidhi-company</option>
                                <option value="LLP">LLP</option>
                                <option value="partnership">partnership</option>
                                <option value="proprietorship">proprietorship</option>
                                <option value="individual">individual</option>
                                <option value="others">others</option>
                            </select>
                        </div>
                    </div>

                    <div class="vr"></div>

                    <div class="fg">
                        <p class="head-tr">CA details</p>
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
                            <input v-model="panDetail" type="text" id="PAN">
                        </div>

                        <div id="i8" class="row mt8">
                            <label for="ca-email" class="labels c1">email</label>
                            <input v-model="email" type="text" id="ca-email">
                        </div>
                    </div>
                </div>

                <div class="fg-wrapper mt16">
                    <div class="fg">
                        <p class="head-tr">contact</p>
                        <div class="row mt8">
                            <label for="contact-name" class="labels c1">name</label>
                            <input type="text" id="contact-name">
                        </div>
                        
                        <div class="row mt8">
                            <label for="contact-email" class="labels c1">email</label>
                            <input type="text" id="contact-email">
                        </div>

                        <div class="row mt8">
                            <label for="contact-phone" class="labels c1">phone</label>
                            <input type="text" id="contact-phone">
                        </div>
                    </div>

                    <div class="vr"></div>

                    <div class="fg"></div>
                </div>

                <button @click.prevent="clear()" class="neutral mt16 button">cancel</button>
                <button @click.prevent="proceed(), clear()" class="green ml8 mt16 button">create</button>

            </form>
        </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'ClientCreate',
    data() {
        return {
            clientName: ''
        }
    },
    methods: {
        ...mapActions(['promptMessage']),
        proceed() {
            this.$router.push('/u/clients/list')
            this.promptMessage({
                title: 'Client Created',
                msg: 'successfully',
                bgcolor: 'green'
            })
        }
    }
}
</script>

<style scoped>
    .head-tr {
        display: block !important;
    }
    input, select {
        width: 100%;
    }

</style>