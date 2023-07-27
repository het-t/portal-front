<template>
    <div id="chat-internal-contacts-co">
        <div class="chat-internal-contact-detail"
            @click="openChat($event, user.id)"
            v-for="(user) in matchingChats" :key="user.id"
            :class="activeChat?.[1] == user.id ? 'active-chat' : ''"
        >
            <template v-if="user.isActive===1">
                <font-awesome-icon 
                    v-if="$store.getters['images/getProfilePic'](`${user.id}_50x50`) == undefined || 
                    $store.getters['images/getProfilePic'](`${user.id}_50x50`) == ''"
                    :key="user.id"
                    class="profile-pic" 
                    style="border-radius: 100%; width: 32px; height: 28px; color: #bbb; padding-left: 4px;"
                    :icon="['fas', 'user']"
                ></font-awesome-icon>

                <img v-else :src="$store.getters['images/getProfilePic'](`${user.id}_50x50`)"
                    loading="lazy" style="width: 36px; height: 36px; border-radius: 100%;"
                >

                <div class="user-details">
                    <span 
                        style="display: block; white-space: nowrap; overflow: hidden; width: inherit;"
                    >{{ user.firstName }} {{ user.lastName }}</span>
                    <span style="font-size: 12px; color: #888;">{{ user.role }}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "ChatInternalContactList",
    computed: {
        ...mapGetters('chatInternal', [
            'matchingChats',
            'activeChat'
        ]),
    },
    methods: {
        openChat(e, userId) {
            if(this.$store.getters['chatInternal/activeChat'].join('_') != `i_${userId}`) {

                this.$store.commit('chatInternal/setActiveChat', {
                    chatId: userId,
                    chatType: 'i' //individual chat
                })
            }
        }
    },
    mounted() {
        if(this.matchingChats?.length > 0)
            for(let user of this.matchingChats) {
                this.$store.dispatch('images/fetchProfilePic', {
                    userId: user.id,
                    width: 50,
                    height: 50
                })
            }
    }
}
</script>

<style scoped>
#chat-internal-contacts-co {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
}
.chat-internal-contact-detail {
    display: flex;
    gap: 12px;
    align-items: center;
    border-radius: 25px;
    padding: 6px;
    cursor: pointer;
    height: 36px;
}
.chat-internal-contact-detail:hover {
    background-color: #eee;
}
.chat-internal-contact-detail.active-chat {
    background-color: #ddd !important;
}
#chat-internal-contacts .contact {
    display: flex;
    gap: 16px;
}
</style>