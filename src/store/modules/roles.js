import { roles } from "@/api"

const state = {
    rolesCount: '', //no. of roles
    roles: {},      //table data of visited pages
    allRoles: [],   //all roles
    rolesData: {}   //list of data of roles selected to edit
}

const getters = {
    allRoles(state) {
        return state.allRoles
    },
    rolesCountGet(state) {
        return state.rolesCount
    },
    rolesListGet: (state) => (index) => {
        return state.roles[index]
    },
    rolesDataGet: (state) => (index) => {
        return state.rolesData[index]
    }
}

const mutations = {
    RESET_STATE(state) {
        state.rolesCount = ''
        state.roles = {}
        state.allRoles = []
        state.rolesData = {}
    },
    rolesCountSet(state, rolesCount) {
        state.rolesCount = rolesCount
    },
    rolesList(state, {index, data}) {
        Object.defineProperty(state.roles, index, {
            value: data,
            writable: true,
            enumerable: true,
        })
    },
    rolesAll(state, rolesList) {
        state.allRoles = rolesList
    },
    rolesDataSet(state, {index, data}) {
        Object.defineProperty(state.rolesData, index, {
            value: data,
            writable: true,
            enumerable: true,
        })
    }
}

const actions = {
    rolesAll({getters, commit}) {
        return new Promise((resolve, reject) => {
            if (getters['allRoles'].length == 0) {
                roles.get({
                    from: null,
                    recordsPerPage: null,
                })
                .then((res) => {
                    commit('rolesAll', res?.data?.rolesList)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
            }
            else resolve()
        })
    },
    rolesDataSet({getters, commit}, {roleId}) {
        const res = getters['rolesDataGet']?.(roleId)
        
        return new Promise((resolve, reject) => {
            if (res == undefined || res == '') {
                roles.getData({
                    editRoleId: roleId
                })
                .then((res) => {
                    commit('rolesDataSet', {index: roleId, data: res.data.roleData})
                    resolve()
                })
                .catch(err => {
                    reject(err)
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