import { users } from "@/api"

const state = {
    usersCount: '', //no. of users for table pagination
    users: {},  //data of all visited users table pages 
    allUsers: [],   //list of all users
}

const getters = {
    allUsers(state) {
        return state.allUsers
    },
    usersListGet: (state) => (index) => {
        return state.users[index]
    },
    usersCountGet(state) {
        return state.usersCount
    }
}

const mutations = {
    usersList(state, {index, data}) {
        Object.defineProperty(state.users, index, {
            value: data,
            writable: true,
            enumerable: true,
        })    
    },
    usersCountSet(state, usersCount) {
        state.usersCount = usersCount
    },
    usersAll(state, usersList) {
        state.allUsers = usersList
    }
}

const actions = {
    usersAll({getters, commit}) {
        if (getters['allUsers'].length == 0) {
            users.get({
                from: null,
                recordsPerPage: null,
            })
            .then((res) => {
                commit('usersAll', res?.data?.usersList)
            })
        }
    }
}
 
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}