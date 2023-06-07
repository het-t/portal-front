<template>
    <div style="display: flex; align-items: center;">
        <input v-model="message" 
            placeholder="Type your message..."
            id="chat-internal-message-write" 
            type="text"
            @keyup.enter="sendMessage"
        >
        <font-awesome-icon :icon="['far', 'paper-plane']" 
            id="chat-internal-message-send"
            @click.prevent="sendMessage"
        ></font-awesome-icon>
    </div>
</template>

<script>
import { chatInternal } from '../api'
export default {
    name: "ChatInternalWrite",
    data() {
        return {
            message: ""
        }
    },
    methods: {
        sendMessage() {
            const [chatType, activeChat] = this.$store.getters['chatInternal/activeChat']
            
            if (chatType == 'i' && this.message != "") {
                chatInternal.sendMessage({
                    message: this.message,
                    isGroupChat: false,
                    toUserId: activeChat
                })

                this.$store.commit('chatInternal/addMessage', {
                    chatId: this.$store.getters['chatInternal/activeChat']?.join('_'),
                    msg: {
                        message: this.message,
                        isGroupChat: false,
                        toUserId: activeChat,
                        self: true,
                        timestamp: new Date().toISOString()
                    }
                })

                this.message = ""
            }
        }
    }
}
</script>

<style scoped>
#chat-internal-message-write {
    width: 100%;
    height: 100%;
    padding-left: 16px;
    border-radius: 25px;
}
#chat-internal-message-send {
    width: 18px;
    height: 18px;
    position: relative;
    right: 32px;
    color: #c0c0c0;
    cursor: pointer;
}
#chat-internal-message-send:hover,
#chat-internal-message-send:focus {
    color: inherit;
}
</style>