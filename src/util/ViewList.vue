<template>
    <div class="ct-view-list">
        <div 
            v-for="(category) in state.categories"
            :key="category"
            class="categorical-data"
        >
            <div class="category">
                <div
                    @click="state.carets[category] = !state.carets[category]" 
                    class="caret"
                    :class="state.carets[category] === true ? 'up' : 'down'"
                >
                    <font-awesome-icon 
                        :icon="['fas', 'caret-down']"
                    />
                </div>
    
                <div class="title">
                    {{ category }}
                </div>
            </div>

            <div class="data-container" v-if="state.carets[category] === true">
                <div
                    class="data" 
                    v-if="state.data[category]?.length > 0"
                >
                    <div
                        v-for="(record) in state.data[category]"
                        :key="record.id"
                    >   
                        <slot name="record" :record="record">
                            {{ record }}
                        </slot>
                    </div>
                </div>
    
                <div v-else>
                    No Sub-Task
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, nextTick, onMounted, reactive, watch } from 'vue';

const state = reactive({
    data: {
        'Pinned': [],
        'No Category': [],
    },
    carets: {
        'Pinned': true,
        'No Category': false
    },
    targetWay: [],
    categories: []
})

const props = defineProps({
    categories: {
        type: Array
    },
    dataRaw: {
        type: Array
    },
    groupBy: {
        type: String
    },
    regroupFlag: {
        type: Number
    },
    pathToPin: {
        type: String,
        default: 'isPinned'
    }
})

watch(
    () => props.dataRaw,
    (newValue) => {
        if (props.categories?.length > 0) state.categories.push(...props.categories)
        state.categories.unshift('Pinned')
        state.categories.push('No Category')
        if (newValue?.length > 0) groupDataRawByCategory(newValue)
    }
)

watch(
    () => props.regroupFlag,
    () => {
        state.data = {}
        state.data['Pinned'] = []
        state.data['No Category'] = []
        
        groupDataRawByCategory(props.dataRaw)
    }
)

onMounted(() => {
    nextTick(() => {
        groupDataRawByCategory(props.dataRaw)
    })
})

function groupDataRawByCategory(dataRaw) {
    state.targetWay = props.groupBy.split('.')
    
    for(let i = 0; i !== props.categories?.length; i++) {
        const category = props.categories[i]

        if (!state.data[category]?.length) {
            state.data[category] = []
        } 

        if (!(
            state.carets[category] === true 
            || state.carets[category] === false
        )) {
            state.carets[category] = false
        }
    }

    for(let i = 0; i!==dataRaw.length; i++ ) {
        const record = dataRaw[i]
        
        if (record[props.pathToPin] == true) {
            state.data['Pinned'].push(record)
        }
        
        else {
            const category = parseTargetProperty(record)
            
            if (props.categories.includes(category)) {
                state.data[category].push(record)
            }
            else {
                state.data['No Category'].push(record)
            }
        }
    }
}

function parseTargetProperty(source) {
    let _value = source

    for (let i = 0; i!=state.targetWay?.length; i++) {
        _value = _value[state.targetWay[i]]
    }

    return _value
}
</script>

<style scoped>
.ct-view-list {
    color: #676a6c;
    background: #fff;
    padding: 13px;
    display: flex;
    flex-direction: column;
    gap: 26px;
}

.ct-view-list .categorical-data {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.ct-view-list .category {
    display: flex;
    align-content: center;
    gap: 13px;
}

.ct-view-list .category .title {
    font-weight: 400;
}

.ct-view-list .category .caret {
    cursor: pointer;
    padding: 3px;
    height: 12px;
    width: 15px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;
    margin-bottom: 5px;
}
.ct-view-list .category .caret:hover {
    background-color: rgba(75, 74, 73, 0.2);
}
.ct-view-list .data-container {
    margin-left: 33px;
}
.ct-view-list .caret.up {
    transform: rotateX(180deg);
}
</style>