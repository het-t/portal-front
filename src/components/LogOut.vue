<template>
  <div class="header">
    <button @click.prevent="logout()" class="mt8 mb8 neutral">
      <img src="../assets/icons/logout-icon.png" alt="">
    </button>
  </div>
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
img {
  filter: invert(0.1);
  scale: 1.25;  
}
</style>