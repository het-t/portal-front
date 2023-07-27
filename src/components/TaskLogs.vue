<template>
    <div class="card">            
        <div class="mr16 ml16 mt16">
            <table>
                <tr>
                    <th>user</th>
                    <th>action</th>
                    <th>sub-task</th>
                    <th>date</th>
                </tr>
                <tr v-for="(logObj, index) in getLogs" :key="index"
                    class="tr">
                    <td :title="`${logObj.user.firstname} ${logObj.user.lastname} (${logObj.user.email})`">
                        <font-awesome-icon 
                            v-if="getProfilePic(`${logObj.user.id}`) == undefined ||
                                getProfilePic(`${logObj.user.id}`) == ''"
                            :key="logObj.user.id"
                            class="profile-pic" style="width: 20px; height: 20px;"
                            :icon="['fas', 'user']"
                        ></font-awesome-icon>

                        <img v-else :src="getProfilePic(`${logObj.user.id}`)"
                            loading="lazy" style="width: 36px; height: 36px; border-radius: 100%;"
                        >
                    </td>

                    <td>
                        <template v-if="logObj?.msg === null">
                            {{(logObj.action + ' ' + logObj.key)}}
                            
                            <span v-if="logObj.after != null">
                                to {{logObj.after}}
                            </span>
                            
                            <span v-if="(logObj.before != null)">
                                from {{logObj.before}}
                            </span>
                        </template>

                        <template v-else>
                            {{ logObj.msg }}
                        </template>
                    </td>

                    <td>
                        {{logObj?.subTask != '_#_*&^' && logObj?.subTask ? logObj.subTask : "N/A"}}
                    </td>
                    
                    <td>{{ new Date(logObj.timestamp).toLocaleString() }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue"
import { useStore } from "vuex"

const props = defineProps({
    taskId: {
        type: Number,
        default: null
    }
})

const store = useStore();

const getLogs = computed(() => store.getters['tasks/getLogs'](props.taskId));

await promiseGen()

function promiseGen() {
    if (isNaN(props.taskId) === false) return store.dispatch('tasks/fetchLogs', {taskId: props.taskId})
    return Promise.resolve()
}

function getProfilePic(userId) {
    const img = store.getters['images/getProfilePic'](`${userId}_50x50`)
    if (!img) {
        store.dispatch('images/fetchProfilePic', {
            userId,
            width: 50,
            height: 50
        })
    }
    return store.getters['images/getProfilePic'](`${userId}_50x50`)
}
</script>

<style scoped>
td {
    vertical-align: middle;
}
tr th:not(:nth-last-child(1)),
tr td:not(:nth-last-child(1)) {
    border-right: solid 1px #eeeeee;
}
</style>