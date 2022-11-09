<template>
<div class="login">
    <div class="login-main">
        <form>
            <p id="banner">Login</p>
            <input v-model="email" placeholder="E-Mail" id="email" type="text" name="email"><br>
            <input v-model="pwd" placeholder="Password" id="pwd" type="password" name="password"><br>

            <button class="green button" @click.prevent="login(), clear()">login</button>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
    export default {
        name: 'LogIn',
        data() {
            return {
                email: '',
                pwd: ''
            }
        },
        methods: {
            ...mapActions(['rights', 'promptMessage']),
            login() {
                axios.post('api/login', {
                    email: this.email,
                    password: this.pwd
                }, {
                    withCredentials: true,
                })
                .then((results) => {
                    if (results?.data == 1) {
                        this.$router.push({name: 'u'})
                        this.promptMessage({
                            title: 'login',
                            msg: 'successfully',
                            bgcolor: 'green'
                        })
                    }
                    else {
                        console.log("invalid")
                        this.$router.push({name: 'login'})
                        this.promptMessage({
                            title: 'login',
                            msg: 'invalid',
                            bgcolor: 'red'
                        })
                    }
                })
            },
            clear() {
                this.email = ''
                this.pwd = ''
            }
        }
    }

</script>

<style scoped>

input {
    width: 100%;
}
.login {
    height: 100vh;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-main {
    width: 300px;
    text-align: center;
    height: fit-content;
}
#banner {
    color: rgba(128, 128, 128, 0.3);
    font-size:64px;
    margin-bottom: 32px;
    margin-top: 0;
}
button {
    width: 100%;
}
</style>