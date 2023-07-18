<template>
    <div class="ml24 mr24">
        <router-view v-if="allow"></router-view>
    </div>
</template>

<script>
import { useMeta } from 'vue-meta'
    export default {
        name: "RoleView",
        setup() {
            useMeta({title: 'Roles'})
        },
        data() {
            return {
                allow: true,
            }
        },
        // created() {
        //     //get all rights if not available in store
        //     Promise.all([
        //         this.$store.dispatch('rights/setAllRightsList')
        //     ])
        //     .then(() => {
        //         this.allow = true
        //     })
        // }
    }
</script>