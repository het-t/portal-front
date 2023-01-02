import { users } from "@/api"

//create user usersCount+1, users: {}, allUsers: [], usersData: as it is
//edit user   usersCount as it is, users: {}, allUsers: [], usersData: deleted that user
//delete user  usersCount-1  users:{} delete that user, allUsers:delete that user, usersData: delete that user

const state = {
    usersCount: '', //no. of users for table pagination
    users: {},  //data of all visited users table pages 
    allUsers: [],   //list of all users
    usersData: {},  //list of data of users selected to edit
    sortBy: 'id',
    sortOrder: 0,    //0-desc, 1-asc
    currentPage: '',
    paginationKey: 0
}

const getters = {
    allUsers(state) {
        return state.allUsers
    },
    usersListGet: (state) => (index, sortBy, sortOrder, filters) => {
        return state.users[`${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}`]
    },
    usersCountGet(state) {
        return state.usersCount
    },
    usersDataGet: (state) => (index) => {
        return state.usersData[index]
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
        state.usersCount = ''
        state.users = {}
        state.allUsers = []
        state.usersData = {}
    },
    deleteUser(state, {userId, filters}) {
        const path = state.currentPage+'_'+state.sortBy+'_'+state.sortOrder+'_'+filters[0]+'_'+filters[1]+'_'+filters[2]
        state.users[path].splice(state.users[path].findIndex(user => user.id == userId), 1)
    },
    usersList(state, {index, sortBy, sortOrder, filters, data}) {
        Object.defineProperty(state.users, 
            `${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}`, {
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
    },
    usersDataSet(state, {index, data}) {
        Object.defineProperty(state.usersData, index, {
            value: data,
            writable: true,
            enumerable: true,
        })
    },
    sortSet(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    currentPageSet(state, {index}) {
        state.currentPage = index
    },
    refetch(state, {userId}) {
        state.users = {}
        state.usersCount = undefined
        state.allUsers = undefined

        if (userId) state.usersData[userId] = {}
        else state.userData = undefined
        
        if (state.paginationKey == 0) state.paginationKey = 1
        else if (state.paginationKey == 1) state.paginationKey = 0
    }
}

const actions = {
    usersAll({getters, commit}) {
        return new Promise((resolve, reject) => {
            if (getters['allUsers']?.length == 0) {
                users.get({
                    from: null,
                    recordsPerPage: null,
                    filters: ['', '', '']
                })
                .then((res) => {
                    commit('usersAll', res?.data?.usersList)
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
            }
            else resolve()
        })
    },
    usersDataSet({getters, commit}, {userId, force}) {
        const res = getters['usersDataGet']?.(userId)
        
        return new Promise((resolve, reject) => {
            if (res == undefined || res == '' || force == true) {
                users.getData({
                    editUserId: userId
                })
                .then((res) => {
                    commit('usersDataSet', {index: userId, data: res.data.userData})
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