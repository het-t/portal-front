<template>
    <the-setting v-if="allow == true" :pageId="2"></the-setting>
</template>

<script>
import { useMeta } from 'vue-meta'
import TheSetting from '../components/TheSetting.vue'
export default {
    components: { TheSetting },
    setup() {
        useMeta({title: 'Setting'})
    },
    data() {
        return {
            allow: false
        }
    },
    name: 'SettingView',
    mounted() {
        Promise.all([
            this.$store.dispatch('clients/getTypes'),
            this.$store.dispatch('roles/rolesAll')
        ])
        .then(() => {
            this.allow = true
        })
        .catch(err => console.log(err))
    },
}
</script>