<template>
  <div>
    <button @click.prevent="logout()" class="mt8 mb8 neutral button">
      logout
      <!-- <img src="../assets/icons/logout-icon.png" alt=""> -->
    </button>
  </div>
</template>

<script>
  // import axios from 'axios';

  export default {  
    name: 'LogOut',
    methods: {
      logout() {

        this.$router.push({name: 'login'})

        // axios.post("/u/api/logout/" , {
        //   withCredentials: true
        // })
        // .then((results)=>{
        //   console.log(results)
        //   if (results.data == 'ok') {
        //     this.$cookies.remove('_token');
        //     console.log("logout")
        //     this.$router.push({name: 'login'})
        //   }
        //   else {
        //     this.$router.push({name: 'logout'})
        //   }
        // })

      },
    }
  }
</script>

<style scoped>
img {
  background-color: rgba(255, 255, 255, 0);
  width: 20px;
  height: 20px;
}
button {
  background-color: rgba(255, 255, 255, .4);
}
button:hover img, button:hover {
  background-color: white;
}
</style>