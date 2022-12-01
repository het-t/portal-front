<template>
    <div class="ml24 mr24">
        <router-view></router-view>
    </div>
</template>

<script>
    // import { mapGetters } from 'vuex'
    export default {
        name: "ClientView",
        // computed: {
        //     ...mapGetters(['getRights'])
        // },
        created() {
            //get client types if not available in store
            this.$store.dispatch('clients/getTypes')
        }
    }
</script>