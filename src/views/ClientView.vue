<template>
    <div class="ml24 mr24">
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "ClientView",
        computed: {
            ...mapGetters(['getRights'])
        },
    }
</script>