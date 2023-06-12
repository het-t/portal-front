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
                //get all users if not in store 
                this.$store.dispatch('users/fetchList', {
                    all: true,
                }),

                //get all clients if not in store
                this.$store.dispatch('clients/fetchList', {
                    all: true
                }),
                
                //get all tasksMaster if not in store
                this.$store.dispatch('tasksMaster/fetchList', {all: true}),

            ])
            .then(() => {
                this.allow = true
            })
        }
    }
</script>