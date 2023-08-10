<script setup>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { tasks } from "../api";


const state = reactive({
    logs: [],
})

const props = defineProps({
    taskId: {
        type: Number
    }
})

const store = useStore()

onMounted(function () {
    tasks.getLogs({
        taskId: props.taskId
    })
    .then((res) => {
        state.logs = res.data
    })
})
</script>

<template>
    <div style="height: 100%; display: flex; flex-direction: column; gap: 6px; color: #676a6c; text-transform: capitalize;">
        <div 
            style="height: 100%; overflow-y: auto; overflow-x: hidden; display: flex; justify-items: center; flex-direction: column; gap: 18px;"
        >
            <div
                v-for="(log, index) in state.logs"
                :key="index"    
            >
                <div style="display: flex; gap: 13px;">
                    <div>
                        <font-awesome-icon 
                            v-if="store.getters['images/getProfilePic'](`${log.user.id}_50x50`) == undefined ||
                                store.getters['images/getProfilePic'](`${log.user.id}_50x50`) == ''"
                            :key="index"
                            class="profile-pic" style="border-radius: 100%; width: 18px; height: 18px;"
                            :icon="['fas', 'user']"
                        ></font-awesome-icon>

                        <img v-else :src="store.getters['images/getProfilePic'](`${log.user.id}_50x50`)"
                            loading="lazy" style="width: 24px; height: 24px; border-radius: 100%;"
                        >
                    </div>

                    <div>
                        {{ log.subTask ? log.subTask + ' - ' : '' }}

                        {{ log.msg }}
                        
                        <span class="secondary-timestamp">
                            {{ log.user.firstname + ' ' + log.user.lastname }}
                            {{new Date(new Date(log.timestamp).toISOString().replaceAll('T', ' ').replaceAll('Z', ' ')).toLocaleString()}}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>