import store from "@/store"


export default function flatOutDelegation(rawDelegation, subTaskId, delegationCache = {}) {
    const getUsers = store.getters['users/getList']({})

    if (delegationCache[subTaskId]?.length) 
        return delegationCache[subTaskId]

    let delegation = []
    if (rawDelegation.length === 0) return delegation
    if (rawDelegation.length === 1) {
        delegation = [rawDelegation[0].parentId]

        store.dispatch('images/fetchProfilePic', {
            userId: delegation[0],
            width: 50,
            height: 50
        })
    }
    else if (rawDelegation.length > 1) {
        let delegationMap = {}

        rawDelegation.map((link) => {
            delegationMap[link.childId] = link.parentId
        })

        const result = []
        
        let parent = 'null'
        while (delegationMap[parent] !== undefined) {
            if (parent !== 'null') result.push(parent)
            parent = delegationMap[parent]
        }
        result.push(parent)
        result.reverse()

        delegation = result

        delegation.map((userId) => {
            store.dispatch('images/fetchProfilePic', {
                userId,
                width: 50,
                height: 50
            })
        })
    }

    delegation = delegation.map((userId) => {
        return getUsers.filter((user) => {
            return user.id === userId
        })?.[0]
    })

    delegationCache[subTaskId] = delegation

    return delegation
}