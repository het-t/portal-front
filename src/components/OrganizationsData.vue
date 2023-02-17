<template>
    <div>
        <admin-list></admin-list>
    <!-- <user-create :orgId="orgId"></user-create> -->
    </div>

</template>

<script>
// import UserCreate from './UserCreate.vue'
import AdminList from './AdminList.vue';
    export default {
        components: { 
            AdminList
            // UserCreate, 
        },
        name: 'OrganizationsData',
        computed: {
            orgId() {
                return this.$route.params?.orgId
            }
        },
        // mounted: {
            
        // }
    }
</script>