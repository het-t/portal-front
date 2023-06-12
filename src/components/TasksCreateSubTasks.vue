<div class="fg pr16 sub-tasks-scroll">
    <div>   
        <div class="row mt8 mb16">
            <label :for="'task-sub-task'+uk" class="labels c1">sub task</label>
            <div style="width:80%; display:flex; align-items: center;">
                <input @keyup.enter="addSubTask()" v-model="newSubTask" style="width: 100%" type="text" :id="'task-sub-task'+uk">
                <font-awesome-icon tabindex="0" class="icon pointer add-st ml8" @keyup.enter="addSubTask()" @click.prevent="addSubTask()" icon="fa-solid fa-plus"></font-awesome-icon>
            </div>
        </div>
    </div>

    <div v-if="subTasks" class="grid-wrapper">
        <div v-for="(task, index) in subTasks" :key="index" class="mb8">
            <div class="grid" v-if="task.description != '_#_*&^'">

                <font-awesome-icon tabindex="0" icon="fa-solid fa-minus"
                    @keyup.enter="removeSubTask(index)"
                    @click.prevent="removeSubTask(index)" 
                    class="pointer icon rmst"
                ></font-awesome-icon>

                <div class="pointer"
                    tabindex="0"
                    @keyup.enter="toggleDisplaySubTask(index)"
                    @click.prevent="toggleDisplaySubTask(index)"
                >
                    
                    <p contentEditable="true"
                        class="st-description"
                        :class="task.statusId == 5 || task.statusId == 6 ? 'done-st' : ''"
                        @input="updateSubTaskTitle(task, $event)"
                    >{{ task.description }}</p>
                    
                    <span v-if="task?.status != undefined" class="ml8 st_status" :class="task.status">{{ task.status }}</span>
                </div>
                
                <div style="overflow: hidden; display: flex; justify-content: flex-end;">
                    <div 
                        v-for="(user, index) in task.assignedTo" :key="user.id" 
                        :style="getStyle(task.assignedTo.length - index - 1)"
                        style="height: 36px; width: 36px; clip-path: circle(); position: relative; background-color: white;"
                    >
                        <font-awesome-icon 
                            v-if="$store.getters['images/getProfilePic'](`${user.id}_50x50`) == undefined || 
                            $store.getters['images/getProfilePic'](`${user.id}_50x50`) == ''"
                            :key="user.id"
                            class="profile-pic" style="border-radius: 100%; width: 36px; height: 36px;"
                            :icon="['fas', 'user']"
                        ></font-awesome-icon>

                        <img v-else :src="$store.getters['images/getProfilePic'](`${user.id}_50x50`)"
                            loading="lazy" style="width: 36px; height: 36px; border-radius: 100%;"
                        >
                    </div>
                </div>
            </div>

            <div v-if="task.description != '_#_*&^' && show == index"
                class="hide ml24"
                :class="show == index ? 'show' : 'hide'" 
            >
                <div class="ml16">
                    <select v-model="task.statusId" class="sub-task-extra">
                        <option v-for="(status, index) in subTaskStatuses" :value="status.id" :key="index.toString()+uk">
                            {{status.status}}
                        </option>
                    </select>
                </div>

                <div class="ml16">
                    <vue-multiselect 
                        multiple 
                        v-model="task.assignedTo" 
                        :options="getUsers" 
                        :custom-label="labelForCoordinator" 
                        track-by="id" 
                        placeholder="Assigend To" 
                        class="sub-task-extra options-list multiselect__tag_bg"
                    >
                        <template #noResult>
                            Oops! No user found. Consider creating new user
                        </template>

                        <template v-slot:option="props">
                            <span class="p0 m0" style="height: 0 !important; width: 0 !important;" :class="props.option.isActive == 0 ? 'not-active' : ''">
                                {{props.option.firstName}} {{props.option.lastName}} ({{props.option.id}})
                            </span>
                        </template>
                    </vue-multiselect>
                </div>
                
                <div class="ml16">
                    <input v-model="task.cost" type="number" :id="'sub-task-cost'+uk" placeholder="Cost" class="sub-task-extra">
                </div>

                <div class="ml16">
                    <input v-model="task.comments" class="sub-task-extra" type="text" placeholder="Comments">
                </div>
            </div>
        </div>
    </div>
</div>


<script setup>
import {reactive, defineProps} from 'vue'

const props = defineProps({
    subTasksList: {
        type: Array,
    }
})

const state = reactive({
    show: -1
})

function toggleDisplaySubTask(index) {
    if (state.show == index) this.show = -1
    else state.show = index
}

</script>