import makeGetReq from "@/api/makeGetReq"

const state = {
    images: {},
}

const getters = {
    getProfilePic: (state) => (userId) => {
        return state.images[userId]
    }
}

const mutations = {
    setProfilePic(state, {userId, data}) {
        state.images[userId] = data
    }
}

const actions = {
    fetchProfilePic({commit, getters}, {userId, width, height}) {
        const existingImg = getters['getProfilePic'](`${userId}_${width}x${height}`)

        return new Promise((resolve, reject) => {
            if (userId == undefined) reject()
            else if (
                existingImg == undefined 
            ) {
                commit('setProfilePic', {
                    userId: `${userId}_${width}x${height}`, 
                    data: ''
                })
                makeGetReq('settings/profile-pic', {
                    userId,
                    width,
                    height
                })
                .then((results) => {
                    commit('setProfilePic', {
                        userId: `${userId}_${width}x${height}`,
                        data: results.data.data
                    })
                    resolve()
                })
                .catch(err => {
                    console.log(err)
                    reject()
                })
            }
            else resolve()
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