<template>
    <div class="ml24 mr24">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "RoleView",
        created() {
            //get all rights if not available in store
            this.$store.dispatch('rights/setAllRightsList')
        }
    }
</script>