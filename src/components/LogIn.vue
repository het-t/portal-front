<template>
<div class="login">
    <div class="login-main">
        <form>
            <p id="banner">Login</p>
            <input ref="focus" v-model="email" placeholder="Username" id="email" type="text" name="email" class="mb8">
            <input v-model="pwd" placeholder="Password" id="pwd" type="password" name="password" class="mb8">

            <div class="rememberme-container mb16">
                <input v-model="remember" type="checkbox" id="rememberme">
                <label for="rememberme">remember me</label>
            </div>

            <button :disabled="disabled" class="green button" @click.prevent="login(), clear()">login</button>
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
                pwd: '',
                remember: true,
                disabled: false
            }
        },
        methods: {
            login() {
                this.disabled = true
                axios.post('api/login', {
                    email: this.email,
                    password: this.pwd,
                    remember: this.remember
                }, {
                    withCredentials: true,
                })
                .then((results) => {
                    if (results?.data?.login == 1) {
                        this.$router.push({name: 'my_tasks_list'})
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
                .finally(() => {
                    setTimeout(() => {
                        this.disabled = false
                    }, 1000)
                })
            },
            clear() {
                this.email = ''
                this.pwd = ''
            }
        },
        mounted() {
            this.$refs['focus'].focus()

            axios.get('api/', {
                withCredentials: true
            })
            .then((results) => {
                if (results?.data == '1') {
                    this.$router.push({name: 'my_tasks_list'})
                }       
            })
            .catch(() => {
                this.$router.push({name: 'login'})
            })
        }
    }

</script>

<style scoped>
label {
    color: #676a6c;
}
.rememberme-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}
input[type="text"], input[type="password"] {
    width: 100%;
}
input[type="checkbox"] {
    width: auto;
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