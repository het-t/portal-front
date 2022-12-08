<template>
    <button @click.prevent="logout()" tabindex="-1" class="mt8 mb8 neutral">
      <font-awesome-icon :icon="['fas', 'power-off']" class="top-nav-icons"></font-awesome-icon>
    </button>
</template>

<script>
  import axios from 'axios';

  export default {  
    name: 'LogOut',
    methods: {
      logout() {
        axios.post("/u/api/logout/" , {
          withCredentials: true
        })
        .then((results)=>{
          console.log(results)
          if (results.data == 'ok') {
            this.$cookies.remove('_token');
            console.log("logout")
            this.$router.push({name: 'login'})
          }
          else {
            this.$router.push({name: 'logout'})
          }
        })
      },
    }
  }
</script>

<style scoped>
button {
  padding: 0;
  border: none;
  background-color: white;
  border: solid 1px white;
}
</style>