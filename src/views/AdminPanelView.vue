<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'AdminPanelView',
        computed: {
            userType() {
                return this.$store.getters['getUserType']
            }
        }
    }
</script>