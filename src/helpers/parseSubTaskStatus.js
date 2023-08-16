import store from "@/store"

export default function (subTask) {
    if (
        subTask.delegation[0].parentId === null 
        && 
        subTask.delegation[0].childId === null
    ) {
        subTask.delegation = []
        subTask.status = {id: 1, name: 'to do'}
        subTask.isPinned = false
    }
    else {
        let usersDelegationLink = subTask.delegation.find((delegation) => {
            return delegation.parentId === subTask.userId
        })
        
        // if user is not assigned but still have access to that sub-tasks
        // user must be in team of task
        if (!usersDelegationLink) {
            usersDelegationLink = subTask.delegation.find((link) => {
                return link.childId === null
            })
        }
        
        subTask.status = store.getters['tasks/getSubTasksStatuses'].find((status) => {
            return status.id === usersDelegationLink.statusId
        })

        if (usersDelegationLink.isPinned != true) subTask.isPinned = false
        else subTask.isPinned = true
    }
}