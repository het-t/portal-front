<template>
    <div class="mr24 ml24">
        <router-view v-if="allow"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'TasksView',
        data() {
            return {
                allow: false,
            }
        },
        created() {

            Promise.all([
                //get all clients if not in store
                this.$store.dispatch('clients/clientsAll'),
                
                //get all tasksMaster if not in store
                this.$store.dispatch('tasks/tasksMasterListSet'),
                
                //get all users if not in store 
                this.$store.dispatch('users/usersAll')

            ])
            .then(() => {
                this.allow = true
            })
        }
    }
</script>