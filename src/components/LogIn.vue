<template>
<div class="login">
    <div class="login-main">
        <form>
            <p id="banner">Login</p>
            <input ref="focus" v-model="email" placeholder="Username" id="email" type="text" name="email"><br>
            <input v-model="pwd" placeholder="Password" id="pwd" type="password" name="password"><br>

            <button class="green button" @click.prevent="login(), clear()">login</button>
        </form>
    </div>
</div>
</template>

<script>
import swal from 'sweetalert'
import axios from '../api/axiosInstance.js'

    export default {
        name: 'LogIn',
        data() {
            return {
                email: '',
                pwd: ''
            }
        },
        methods: {
            login() {
                console.log("logincalled")
                axios.post('api/login', {
                    email: this.email,
                    password: this.pwd
                }, {
                    withCredentials: true,
                })
                .then((results) => {
                    if (results?.data?.login == 1) {
                        this.$router.push({name: 'u'})
                    }
                    else {
                        this.$router.push({name: 'login'})
                    }
                })
                .catch(err => 
                    swal({
                        text: `Ooops ${err}`
                    })
                )
            },
            clear() {
                this.email = ''
                this.pwd = ''
            }
        },
        mounted() {
            this.$refs['focus'].focus()
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