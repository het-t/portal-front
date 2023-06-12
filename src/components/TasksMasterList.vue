<template>
    <div>
        <div ref="menu">
            <DotsMenu v-if="state.menuDisplay === true">
                <template #links>
                    <li @click="deleteTasksMaster(editTasksMasterId)">
                        <font-awesome-icon 
                            class="menu-icons"
                            :icon="['fas', 'trash']"
                        />
                        Delete
                    </li>
                </template>
            </DotsMenu>
        </div>

        <TableMain>
            <template #thead>
                <tr>
                    <th>
                        <div class="flex">
                            <TableSort
                                sortType="string"
                                sortBy="name"
                                storeName="tasksMaster"
                            ></TableSort>

                            <div class="floating-container">
                                <input type="text" class="header p0" required>
                                <span class="floating-label">name</span>
                            </div>
                        </div>
                    </th>
                    <th></th>
                </tr>
            </template>


            <template #tbody>
                <template v-for="(taskMaster) of taskMasterList" :key="taskMaster.id">
                    <tr 
                        class="tr edit-user-tr"

                    >
                        <td>{{ taskMaster.title }}</td>
                        <DotsImg
                            :key="taskMaster.id"
                            @openMenu="toggleMenuDisplay($event, true)"
                            @hideMenu="toggleMenuDisplay($event, false)"
                        ></DotsImg>
                    </tr>
                </template>
            </template>

            <TablePagination 
                storeName="tasksMaster"
            />
        </TableMain>
    </div>
</template>

<script setup>
import TableMain from './TableMain.vue'
import TableSort from './TableSort.vue'
import TablePagination from './TablePagination.vue'
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import DotsImg from './DotsImg.vue'
import DotsMenu from './DotsMenu.vue'

const store = useStore()

const state = reactive({
    menuDisplay: false
})
const menu = ref(null)

const taskMasterList = computed(() => {
    const currentPage = store.getters['tasksMaster/getCurrentPage']
    const recordsPerPage = store.getters['tasksMaster/getRecordsPerPage']
    const from = (currentPage-1)*recordsPerPage

    return store.getters['tasksMaster/getList']({
        from,
        to: from + recordsPerPage
    })
})

function toggleMenuDisplay(e, visibility) {
    state.menuDisplay = visibility
    if(visibility === true) {
        console.log(e.target.parentElement.parentElement.appendChild(menu.value))
    }
} 
</script>

<style scoped>
@import '../assets/stylesheet/nth-child-no-border.css';

.flex { 
    display: flex;
}
</style>