<template>
    <div id="chat-internal-main">
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <div class="chat-internal-message"
                v-for="(msgObj) in getChats" :key="msgObj.id"
                :class="msgObj.self == true ? 'outgoing-msg' : 'incoming-msg'"
            >
                <div class="message">
                    {{ msgObj.message }}
                    <span style="display: block; font-size: 10px; color: #8c8c8c;">
                        {{ formatDate(msgObj.timestamp) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { chatInternal } from '../api'

export default {
    name: "ChatInternalMain",
    computed: {
        ...mapGetters('chatInternal', [
            'getChats',
            'activeChat'
        ])
    },
    watch: {
        activeChat() {
            this.getCurrentChat()
        }
    },
    methods: {
        getCurrentChat() {
            const [chatType, chatId] = this.$store.getters['chatInternal/activeChat']

            if (chatType !== undefined && chatId !== undefined)
                chatInternal.getMessages({
                    chatType,
                    chatId
                })
                .then((res) => {
                        this.$store.commit('chatInternal/setChat', {
                            chatId: res.data?.[0].chatId,
                            chat: res.data
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        },
        formatDate(timestamp) {
            const timestampDate = new Date(timestamp)
            const dateOfTimestamp = new Date(timestamp).setHours(0, 0, 0, 0)
            const currentDate = new Date().setHours(0, 0, 0, 0)

            if (dateOfTimestamp === currentDate) {            
                return this.formatDateHandler(timestampDate)
            }
            return this.formatDateHandler(timestampDate) 
            + " " 
            + timestampDate.getMonth() 
            + "/" 
            + timestampDate.getDate()
        },
        formatDateHandler(date) {
            let dateMinutes = date.getMinutes()

            return date.getHours() + ":" + 
                (
                    dateMinutes.toString().length == 1 ?
                    `0${dateMinutes}` :
                    dateMinutes
                )
        }
    },
    mounted() {
        setTimeout(() => {
            this.getCurrentChat()
        }, 60*1000)
    }
}
</script>

<style scoped>
#chat-internal-main {
    border-left: solid 1px #e0e0e0;
}
#chat-internal-write-co {
    position: relative;
    top: 100%;
}
.chat-internal-message {
    width: 100% !important;
}
#chat-internal-main .outgoing-msg {
    display: flex;
    justify-content: flex-end;
    width: fit-content;
}
#chat-internal-main .incoming-msg {
    display: flex;
    justify-content: flex-start;
    width: fit-content;
}
.incoming-msg .message {
    background-color: rgba(0, 128, 0, 0.276);
}
.outgoing-msg .message {
    background-color: #ddd;
}
.message {
    padding: 6px 12px;
    border-radius: 8px;
    color: #3d3f40 !important;
}
</style>