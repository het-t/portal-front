<template>
    <div class="ml24 mr24">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "RoleView",
        data() {
            return {
                allow: false,
            }
        },
        created() {
            //get all rights if not available in store
            Promise.all([
                this.$store.dispatch('rights/setAllRightsList')
            ])
            .then(() => {
                this.allow = true
            })
        }
    }
</script>