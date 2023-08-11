<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { tasks } from "../api";
import VueMultiselect from 'vue-multiselect';

const props = defineProps({
    editTaskId: {
        type: Number,
        default: null
    }
})
const store = useStore()

const users = computed(() => 
    store.getters['users/getList']({})?.filter((user) => {
        return state.team?.map(user => user.id)?.includes(user.id) === false
    })
)

const state = reactive({
    team: [],
    showUsersOptions: false
})

await componentPromiseGen();

function componentPromiseGen() {
    return tasks.getTeam({
        taskId: props.editTaskId
    })
    .then((res) => {
        state.team = res.data
        const p = []
        res.data?.map((user) => {
            p.push(
                store.dispatch('images/fetchProfilePic', {
                    userId: user.id,
                    width: 50,
                    height: 50
                }, {root: true})
            )
        })
    })
}

function addUser(user) {
    tasks.addInTeam({
        taskId: props.editTaskId,
        userId: user.id
    })
    .then(() => {
        return componentPromiseGen()
    })
    .then(() => {
        store.commit('tasks/flush', {
            taskId: props.editTaskId,
            list: true
        })
    })
}

function removeUser(user) {
    tasks.removeFromTeam({
        taskId: props.editTaskId,
        userId: user.id
    })
    .then(() => {
        return componentPromiseGen()
    })
    .then(() => {
        store.commit('tasks/flush', {
            taskId: props.editTaskId,
            list: true
        })
    })
}

const taskTeamAddUser = ref(null)

function handleClick(e) {
    if (taskTeamAddUser.value.contains(e.target) === false) {
        state.showUsersOptions = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClick);
})
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick)
})
</script>

<template>
    <div class="task-team-main">

        <div
            v-for="user in state.team" :key="user.id"
            class="user-wrapper"
        >
            <font-awesome-icon 
                v-if="store.getters['images/getProfilePic'](`${user.id}_50x50`) == undefined ||
                    store.getters['images/getProfilePic'](`${user.id}_50x50`) == ''"
                :key="user.id"
                class="profile-pic" style="border-radius: 100%; width: 18px; height: 18px;"
                :icon="['fas', 'user']"
            ></font-awesome-icon>

            <img v-else :src="store.getters['images/getProfilePic'](`${user.id}_50x50`)"
                loading="lazy" style="width: 24px; height: 24px; border-radius: 100%;"
            >

            <span style="text-transform: capitalize;">
                {{ user.firstName?.toLowerCase() }} {{ user.lastName?.toLowerCase() }}
            </span>

            <font-awesome-icon @click.stop="removeUser(user)" :icon="['fas', 'xmark']" class="remove"/>
        </div>

        <div
            @click="state.showUsersOptions = true"
            class="sub-task-delegation-add"
            ref="taskTeamAddUser"
        >
            <div v-show="state.showUsersOptions === false" class="task-team-add-btn-icon" :style="state.team.length === 0 ? 'visibility: visible;' : ''">
                <font-awesome-icon :icon="['fas', 'plus']" />
            </div>

            <vue-multiselect
                v-if="state.showUsersOptions === true"
                @select="addUser($event)"
                :custom-label="(user) => user.firstName + '' + user.lastName"
                :options="users.filter((user) => user.isActive === 1 && state.team.includes(user) === false)"
                style="min-width: 200px;"
            >
                <template v-slot:option="{option}">
                    <div style="text-transform: capitalize; display: flex; gap: 13px; text-wrap: nowrap;">
                        <font-awesome-icon 
                            v-if="store.getters['images/getProfilePic'](`${option.id}_50x50`) == undefined ||
                                store.getters['images/getProfilePic'](`${option.id}_50x50`) == ''"
                            class="profile-pic" style="border-radius: 100%; width: 24px; height: 24px;"
                            :icon="['fas', 'user']"
                        ></font-awesome-icon>

                        <img v-else :src="store.getters['images/getProfilePic'](`${option.id}_50x50`)"
                            loading="lazy" style="width: 24px; height: 24px; border-radius: 100%;"
                        >

                        {{ option.firstName.toLowerCase() }} {{ option.lastName.toLowerCase() }}
                    </div>
                </template>
            </vue-multiselect>
        </div>

        <span v-if="state?.team?.length === 0">No One In Team Yet</span>
    </div>
</template>

<style scoped>
.task-team-main {
    flex-wrap: wrap; 
    padding: 13px; 
    border: solid 1px #e0e0e0; 
    background-color: white; 
    color: #676a6c; 
    display: flex; 
    gap: 13px; 
    align-items: center;
}
.task-team-add-btn-icon {
    visibility: hidden;
}
.task-team-add-btn-icon:hover {
    background-color: rgba(73, 74, 75, 0.2);
}
.task-team-main:hover .task-team-add-btn-icon {
    visibility: visible !important;
}
.user-wrapper {
    display: flex; 
    align-items: center; 
    gap: 6px;
}
.user-wrapper .remove {
    visibility: hidden;
    padding: 1px 3px;
    border-radius: 3px;
}
.user-wrapper .remove:hover {
    cursor: pointer;
    background-color: rgba(73, 74, 75, 0.2);
}
.user-wrapper:hover .remove,
.user-wrapper:focus .remove {
    visibility: visible !important;
}
.task-team-add-btn-icon {
    width: fit-content; 
    cursor: pointer; 
    border: solid 1px rgba(103, 106, 108, 0.5); 
    border-radius: 9px; 
    text-align: center; 
    vertical-align: center; 
    height: 18px;
    width: 18px;
}
</style>

<style>
.task-team-main .multiselect__content-wrapper {
    display: block !important;
}
</style>