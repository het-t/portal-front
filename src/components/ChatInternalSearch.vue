<template>
    <div>
        <input id="chat-internal-search"
            @input.prevent="searchChats"
            placeholder="Search"
        >
    </div>
</template>

<script>
export default {
    name: "ChatInternal",
    data() {
        return {
            pattern: ''
        }
    },
    methods: {
        searchChats(e) {
            this.$store.commit('chatInternal/updateSearch', e.target.value)
        }
    }
}
</script>

<style scoped>
#chat-internal-search {
    height: 24px;
    border: solid 1px #e0e0e0;
    border-radius: 16px;
    padding: 4px 16px 4px 16px;
    height: 36px;
    width: 100% !important;
}
</style>