<template>
    <div class="ml24 mr24">
        <router-view v-if="allow"></router-view>
    </div>
</template>

<script>
import { useMeta } from 'vue-meta'
    export default {
        name: "UserView",
        data() {
            return {
                allow: false
            }
        },
        setup() {
            useMeta({title: 'Users'})
        },
        created() {
            this.$store.dispatch('roles/fetchList', {
                all: true
            })
            .then(() => {
                this.allow = true
            })
        }
    }
</script>