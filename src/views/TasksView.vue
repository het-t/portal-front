<template>
    <div class="mr24 ml24">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'TasksView',
        created() {
            //get all clients if not in store
            this.$store.dispatch('clients/clientsAll')
            
            //get all tasksMaster if not in store
            this.$store.dispatch('tasks/tasksMasterListSet')
            
            //get all users if not in store 
            this.$store.dispatch('users/usersAll')
        }
    }
</script>