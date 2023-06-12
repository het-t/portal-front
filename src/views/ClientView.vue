<template>
    <div class="ml24 mr24">
        <router-view v-if="allow"></router-view>
    </div>
</template>

<script>
    export default {
        name: "ClientView",
        data() {
            return {
                allow: false
            }
        },
        created() {
            Promise.all([

                //get client types if not available in store
                this.$store.dispatch('clients/fetchTypes'),

            ])
            .then(() => {
                this.allow = true
            })
        }
    }
</script>