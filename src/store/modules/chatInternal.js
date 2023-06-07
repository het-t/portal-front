import { chatInternal } from "@/api/index.js"

const state = {
    chats: {},
    groups: [],
    activeChat: '',
    searchPattern: ''
}

const getters = {
    groups(state) {
        return state.groups
    },
    activeChat(state) {
        return state.activeChat.split('_')
    },
    matchingChats(state, getters, rootState, rootGetters) {
        return [
            ...rootGetters['users/allUsers']?.filter(user => {
                return (
                    user.isActive === 1 
                    && 
                    (
                        user.firstName.toLowerCase().match(state.searchPattern) 
                        || 
                        user.lastName.toLowerCase().match(state.searchPattern)
                    )
                )
            })
        ]
    },
    getChats(state, getters) {
        return state.chats[getters['activeChat'].join('_')]
    }
}

const mutations = {
    setGroups(state, groups) {
        state.groups = groups
    },
    setActiveChat(state, { chatId, chatType }) {
        state.activeChat = `${chatType}_${chatId}` 
    },
    updateSearch(state, pattern) {
        state.searchPattern = pattern.toLowerCase()
    },
    setChat(state, {chatId, chat}) {
        state.chats[chatId] = chat
    },
    addMessage(state, {chatId, msg}) {
        state.chats[chatId].push(msg)
    }
}

const actions = {
    getGroups({commit}) {
        return new Promise((resolve, reject) => {
            chatInternal.getGroups()
            .then(res => {
                commit('setGroups', res.data)
                resolve()
            })
            .catch(() => {
                reject()
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}