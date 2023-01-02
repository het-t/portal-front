import { roles } from "@/api"

const state = {
    rolesCount: '', //no. of roles
    roles: {},      //table data of visited pages
    allRoles: [],   //all roles
    rolesData: {},   //list of data of roles selected to edit
    sortBy: 'id',
    sortOrder: 0,    //0-desc, 1-asc
    currentPage: '',
    paginationKey: 0
}

const getters = {
    allRoles(state) {
        return state.allRoles
    },
    rolesCountGet(state) {
        return state.rolesCount
    },
    rolesListGet: (state) => (index, sortBy, sortOrder, filters) => {
        return state.roles[`${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}`]
    },
    rolesDataGet: (state) => (index) => {
        return state.rolesData[index]
    },
    sortGet(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    },
    getKey(state) {
        return state.paginationKey
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
    rolesList(state, {index, sortBy, sortOrder, filters, data}) {
        Object.defineProperty(state.roles, 
            `${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}`, {
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
    },
    sortSet(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    deleteRole(state, {roleId, filters}) {
        const path = state.currentPage+'_'+state.sortBy+'_'+state.sortOrder+'_'+filters[0]+'_'+filters[1]
        state.roles[path].splice(state.roles[path].findIndex(role => role.id == roleId), 1)
    },
    currentPageSet(state, {index}) {
        state.currentPage = index
    },
    refetch(state, {roleId}) {
        state.roles = {}
        state.rolesCount = undefined
        state.allRoles = {}

        if (roleId) state.rolesData[roleId] = undefined
        else state.rolesData = {}

        if (state.paginationKey == 0) state.paginationKey = 1
        else if (state.paginationKey == 1) state.paginationKey = 0
    }
}

const actions = {
    rolesAll({getters, commit}) {
        return new Promise((resolve, reject) => {
            if (getters['allRoles']?.length == 0) {
                roles.get({
                    from: null,
                    recordsPerPage: null,
                    filters: ['', '']
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
    rolesDataSet({getters, commit}, {roleId, force}) {
        const res = getters['rolesDataGet']?.(roleId)
        
        return new Promise((resolve, reject) => {
            if ((force == true) || (res == undefined) || res == '') {
                roles.getData({
                    roleId
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