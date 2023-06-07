<template>
    <div v-if="allow" class="ml24 mr24">
        <div class="card pr8 pl8 pt8 pb8" id="chat-internal-screen">
            <div id="chat-internal-actions" class="pr8">
                <ChatInternalSearch id="chat-internal-search-co"
                ></ChatInternalSearch>
                <ChatInternalContacts id="chat-internal-contacts-co"
                    class="pt24"
                ></ChatInternalContacts>
            </div>

            <div id="chat-internal-main" class="pr8 pl8 pt8 pb8">
                <ChatInternalMain id="chat-internal-main-co"></ChatInternalMain>
                <ChatInternalWrite id="chat-internal-write-co" class="mt12"></ChatInternalWrite>
            </div>
        </div>
    </div>
</template>

<script>
import ChatInternalSearch from '@/components/ChatInternalSearch.vue';
import ChatInternalContacts from '@/components/ChatInternalContacts.vue'
import ChatInternalMain from '../components/ChatInternalMain.vue';
import ChatInternalWrite from '../components/ChatInternalWrite.vue'

export default {
    name: "ChatInternalView",
    data() {
        return {
            allow: false,
            chats: ''
        }
    },
    components: {
        ChatInternalSearch,
        ChatInternalContacts,
        ChatInternalMain,
        ChatInternalWrite
    },
    mounted() {
        Promise.all([
            this.$store.dispatch('chatInternal/getGroups'),
            this.$store.dispatch('users/usersAll')

        ])
        .then(() => this.allow = true)
    }
}
</script>

<style scoped>
#chat-internal-screen {
    height: 500px;
    display: flex;
    width: auto;
}
#chat-internal-actions {
    display: flex;
    flex-direction: column;
    height: 100%;
}
#chat-internal-actions #chat-internal-contacts-co {
    height: 100%;
    overflow-y: auto;
    width: 250px;
}
#chat-internal-main {
    height: 484px;
    width: 100%;
    border-left: solid 1px #e0e0e0;
}
#chat-internal-main-co {
    height: 436px;
    overflow-y: auto;
}
</style>