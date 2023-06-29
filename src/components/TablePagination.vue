<template>
    <div class="flex table-pagination">
        <div class="recordsPerPage">
            <label for="recordsPerPage">entries</label>
            <select 
                v-model="localRecordsPerPage"
                @change="pageSizeChange" 
                id="recordsPerPage"
            > 
                <option :value=50>50</option>
                <option :value=100>100</option>
                <option :value=150>150</option>
                <option :value=200>200</option>
            </select>
        </div>

        <ul>
            <li class="neutral">
                <button @click="pageChange(1)">&lt;</button>
            </li>

            <li class="neutral" v-for="n in showPage()" :key="n">
                <button 
                    @click="pageChange(n)"
                    :class="(n == currentPage) ? 'green' : ''" 
                >{{n}}</button>
            </li>

            <li class="neutral">
                <button @click="pageChange(totalPages)">&gt;</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {onMounted, defineProps, computed, defineEmits, watch, ref} from 'vue'
import { useStore } from 'vuex';
import { debounce } from 'vue-debounce';

const emits = defineEmits(['tableData'])

const store = useStore()

const localRecordsPerPage = ref(50)

const props = defineProps({
    storeName: String,
    storeActionToFetchData: {
        type: String,
        default: 'fetchList'
    },
    storeGetterToGetData:  {
        type: String,
        default: 'getList'
    },
    storeActionToFetchNoOfRecords:  {
        type: String,
        default: 'fetchCount'
    },
    storeGetterToGetNoOfRecords:  {
        type: String,
        default: 'getCount'
    }
})


const debouncedApiCall = debounce(() => {
    getData(false);
}, 700);
    
const filters = computed(() => store.getters[props.storeName + '/getFilters'])

watch(
    filters.value, 
    () => {
        debouncedApiCall()
    },     
    {deep: true}
)

const sorting = computed(() => store.getters[props.storeName + '/getSort'])

watch(
    sorting,
    () => {
        debouncedApiCall()
    },
    {deep: true}
)
const recordsPerPage = computed(() => store.getters[props.storeName + '/getRecordsPerPage'])
watch(
    recordsPerPage,
    () => {
        getData(false)
    }
)
function pageSizeChange() {
    store.commit(props.storeName + '/setRecordsPerPage', localRecordsPerPage.value)
    getData(false)
}

const noOfRecords = computed(() => store.getters[props.storeName + '/' + props.storeGetterToGetNoOfRecords])
const totalPages = computed(() => Math.ceil(noOfRecords.value / recordsPerPage.value))

const currentPage = computed(() => store.getters[props.storeName + '/getCurrentPage'])
watch(
    currentPage,
    () => {
        getData(false)
    }
)

function showPage() {
    if (!isNaN(totalPages.value)) {
        let numShown = 5;
        numShown = Math.min(numShown, totalPages.value)
        let first = currentPage.value - Math.floor(numShown / 2)
        first = Math.max(first, 1)
        first = Math.min(first, totalPages.value - numShown + 1)
        return [...Array(numShown)].map((k,i) => i + first)
    }
    return 1
}

function pageChange(n) {
    store.commit(`${props.storeName}/setCurrentPage`, n)
}

function getData(force) {
    const dataGetter = computed(() => store.getters[props.storeName + '/' + props.storeGetterToGetData])

    store.dispatch(props.storeName + '/' + props.storeActionToFetchData, {
        recordsPerPage: recordsPerPage.value,
        force
    })
    .then(() => {
        emits('tableData', dataGetter.value({
            from: (currentPage.value-1)*recordsPerPage.value,
            to: (currentPage.value-1)*recordsPerPage.value + recordsPerPage.value,
            all: false
        }))
    })
}

function fetchCount() {
    return store.dispatch(props.storeName + '/' + props.storeActionToFetchNoOfRecords, {
        filters: filters.value
    })
}

onMounted(() => {
    fetchCount()
    .then(() => {
        getData(false)
    })
})
</script>

<style scoped>
    .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .recordsPerPage {
        display: flex;
        column-gap: 8px;
        row-gap: 8px;
        align-items: center;
        margin: 13px 0;
    }
    select {
        padding: 4px;
    }
    ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    li {
        list-style: none;
        border: solid 1px #e7eaec;
        margin: 0 1px;
    }
    li button, button:hover, button:focus {
        padding: 4px 10px;
        border: none !important;
    }
    button:active, .current {
        background-color: #e7eaec;
        color: black;
    }
    button {
        color: grey;
    }
</style>