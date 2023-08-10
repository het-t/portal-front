<template>
    <table-main>
        <template #thead> 
            <tr>
                <th>description</th>
                <th>activity</th>
                <th>time</th>
            </tr>
        </template>

        <template #tbody>
            <tr v-for="(subTask, index) in subTasks" :key="index" class="tr">
                <td v-if="subTask.description != '_#_*&^'">{{ subTask.description }}</td>
                <td v-else>{{ task.title }}</td>
                <td>
                    <template v-if="subTask.msg === null">
                        {{ subTask.action }} {{ subTask.key }}
                        <span v-if="subTask.action == 'updated'">
                            from
                            {{ subTask.before || '-' }} to {{ subTask.after || '-' }}
                        </span>
                    </template>

                    <template v-else>
                        {{ subTask.msg }}
                    </template>
                </td>
                <td>
                    {{new Date(new Date(subTask.timestamp).toISOString().replaceAll('T', ' ').replaceAll('Z', ' ')).toLocaleString()}}    
                </td>
            </tr>
        </template>
    </table-main>
</template>

<script setup>
import TableMain from './TableMain.vue';
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    taskId: {
        type: Number
    }
})

const store = useStore()

const subTasks = computed(() => store.getters['workDiary/getData'](props.taskId))

</script>