<script setup>
import { computed, inject, nextTick, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { tasks } from "../api/index.js";

const props = defineProps({
    taskId: {
        type: Number
    }
})

const commentBox = ref('')

const store = useStore()
const toast = inject('toast')

const state = reactive({
    createComment: false,
    disableButtons: false
})

const comments = computed(() => {
    return store.getters['tasksComments/getList'](props.taskId)
})

onMounted(function () {
    store.dispatch('tasksComments/fetchList', {
        taskId: props.taskId
    })
})

function addComment() {
    const comment = commentBox.value.innerText
    commentBox.value.innerText = ''

    state.disableButtons = true
    state.createComment = false

    tasks.addComment({
        taskId: props.taskId,
        comment
    })
    .then((res) => {
        toast.success('Success')

        store.commit('tasksComments/addComment', {
            taskId: props.taskId,
            data: {
                id: res.data.createdCommentId,
                comment,
                datetime: new Date().toUTCString(),
                user: store.getters['getPersonalDetails']
            }
        })
    })
    .catch(() => {
        toast.error(`Oops! We can't perform this action right now`)
    })
    .finally(() => {
        state.disableButtons = false
    })
}
</script>

<template>
    <div style="color: #676a6c; text-transform: capitalize; max-height: 400px; overflow-y: auto; overflow-x: hidden;">
        <div style="display: flex; flex-direction: column; gap: 6px;">
            
            <div    
                v-if="state.createComment === false" 
                style="display: flex; gap: 6px; align-items: center;"
            >
                <div 
                    @click.prevent="state.createComment = true, nextTick(() => commentBox.focus())"
                    class="add-comment-btn"
                >
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </div>
    
                <span v-if="comments?.length === 0">No Comments Yet</span>
            </div>    

            <div v-if="state.createComment === true">
                <div ref="commentBox" contenteditable="true" style="min-height: 26px; width: 100%;"></div>

                <div style="display: flex; gap: 6px;">
                    <button 
                        @click.prevent="addComment"
                        class="button green"
                        :disabled="state.disableButtons === true"
                    >
                        Save
                    </button>
                
                    <button 
                        @click.prevent="state.createComment = false, nextTick(() => commentBox.innerText = '')"
                        class="button neutral"
                        :disabled="state.disableButtons === true"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 13px; margin-top: 13px;">
                <div
                    v-for="(comment, index) in comments"
                    :key="index"
                    style="display: flex; gap: 13px;"
                >

                    <div>
                        <font-awesome-icon 
                            :icon="['fas', 'user']" 
                        />
                    </div>

                    <div>
                        {{comment.comment}}

                        <span class="secondary-timestamp">
                            {{ comment.user.firstName + ' ' + comment.user.lastName }}
                            {{ new Date(new Date(comment.datetime).toISOString().replaceAll('T', ' ').replaceAll('Z', ' ')).toLocaleString() }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div[contenteditable="true"]:empty::after {
    content: "Type Your Comment";
}
button {
    padding: 6px !important;
}
.add-comment-btn {
    width: fit-content; 
    cursor: pointer; 
    border: solid 1px rgba(103, 106, 108, 0.5); 
    border-radius: 9px; 
    text-align: center; 
    vertical-align: center; 
    height: 18px;
    width: 18px;
}
.add-comment-btn:hover {
    background-color: rgba(74, 73, 72, 0.2);
    color: #676a6c;
}
</style>