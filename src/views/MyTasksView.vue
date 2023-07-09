<template>
    <div class="ml24 mr24">
        <router-view v-if="allow === true"></router-view>
    </div>
</template>

<script>
    export default {
        name: "MyTasksView",
        data() {
            return {
                allow: false
            }
        },
        mounted() {
            Promise.all([
                this.$store.dispatch('tasks/fetchSubTasksTags', {force: true})
            ])
            .then(() => {
                this.allow = true
            })
        }
    }
</script>