<template>
    <div class="ml24 mr24">
        <router-view v-if="allow"></router-view>
    </div>
</template>

<script>
    export default {
        name: "UserView",
        data() {
            return {
                allow: false
            }
        },
        created() {
            this.$store.dispatch('roles/rolesAll')
            .then(() => {
                this.allow = true
            })
        }
    }
</script>