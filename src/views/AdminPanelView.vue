<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import { useMeta } from 'vue-meta'
    export default {
        name: 'AdminPanelView',
        setup() {
            useMeta({title: 'Admin'})
        },
        computed: {
            userType() {
                return this.$store.getters['getPersonalDetails']?.userType
            }
        }
    }
</script>