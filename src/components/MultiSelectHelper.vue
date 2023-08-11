<script setup>
import { onMounted, onUnmounted, reactive, watch, ref, nextTick } from 'vue';

const state = reactive({
    visibility: false,
    showOptions: false,
    filterString: '',
    filterOptions: [],
    closeOnSelectingOption: false,
    buttons: [],
    showComponent: false
})

const props = defineProps({
    options: {
        type: Array,
        default: null
    },
    labelBy: {
        type: Function,
        defaut: null
    },
    id: {
        type: String,
        default: Date.now()
    },
    placeholder: {
        type: String,
        default: 'Type Here'
    }
})

const inputBox = ref(null)

const emits = defineEmits([
    'select'
])
watch(
    () => state.filterString,
    () => {
        filterWithFilterString()
    }
)

onMounted(() => {
    document.addEventListener('click', handleClick)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClick)
})

function handleClick(e) {
    const optionsList = document.getElementById(
        "multiselecthelper__options_list".concat(props.id)
    );

    if (
        document.getElementById('multiselect__open_btn'.concat(props.id))?.contains(e.target) === true
        || document.getElementById('multiselecthelper__input_wrapper'.concat(props.id))?.contains(e.target) === true
        ) {
        nextTick(function () {
            inputBox.value.focus()
        })
        state.showComponent = true
    }

    else if (
        state.closeOnSelectingOption === false
        && optionsList?.contains(e.target)
    ) {
        state.showComponent = false
    }

    else {
        state.showComponent = false
    }
}

function labelOptionFn(option) {
    return props.labelBy(option)
}

function filterWithFilterString() {
    state.filterOptions = props.options.filter((option) => {
        let optionLabel;
        if (props.labelBy !== null) {
            optionLabel = labelOptionFn(option)
        }
        else optionLabel = option

        return optionLabel?.toLowerCase()?.includes(state.filterString?.trim()?.toLowerCase())
    })
}

function getOptions() {
    if (state.filterString === '') return props.options
    return state.filterOptions
}

function optionSelected(option) {
    state.showComponent = false
    state.filterOptions = []
    state.filterString = ''
    emits('select', option)
}
</script>
 
<template>
    <div 
        v-show="state.showComponent === false"
        style="display: flex; align-items: center;"
        :id="'multiselect__open_btn'.concat(props.id)"
    >
        <slot name="multiselect__open_btn"></slot>
    </div>

    <div class="multiselecthelper" v-show="state.showComponent === true">
        <div style="position: absolute; border: solid 1px #e0e0e0;">
            <div
                :id="'multiselecthelper__input_wrapper'.concat(props.id)"
                class="multiselecthelper__input_wrapper"
            >

                <input 
                    :placeholder="props.placeholder"
                    ref="inputBox"
                    v-model="state.filterString"
                    :id="'multiselect_input'.concat(props.id)" 
                    class="multiselecthelper__input"
                    autocomplete="off"
                >
            </div>
        
            <div 
                class="multiselecthelper__options_list"
                :id="'multiselecthelper__options_list'.concat(props.id)"
            >

                <div
                    v-if="getOptions()?.length === 0"
                    class="multiselecthelper__option"
                >
                    no matching option found
                </div>

                <div 
                    v-for="(option, index) in getOptions()" 
                    :key="index"
                    class="multiselecthelper__option"
                    @click="optionSelected(option)"
                >
                    <slot name="multiselecthelper__option" :option="option">
                        {{ props.labelBy === null ? option : labelOptionFn(option) }}
                    </slot>
                    
                </div>

                

                <template v-if="state.buttons?.length > 0">
                    <div
                        v-for="(button, index) in state.buttons"
                        :key="index"
                        class="multiselecthelper__button"
                    >
                        {{ button }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>

.multiselecthelper {
    position: relative;
}
.multiselecthelper__options_list {
    position: relative;
    z-index: 999;
    border: solid 1px #e0e0e0;
    width: 200px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    text-overflow: ellipsis;
    background-color: white;
}
.multiselecthelper__option {
    border-bottom: solid 1px #e0e0e0;
    padding: 8px 12px;
    box-sizing: border-box;
    cursor: pointer;
    text-align: left !important;
}
.multiselecthelper__input {
    padding: 6px;
    border: none;
    border-bottom: solid 1px #e0e0e0;
    width: 200px;
    cursor: pointer;
    position: relative;
    top: 0;
    z-index: 2;
    background-color: white;
}
.multiselecthelper__input_wrapper:focus>.multiselecthelper__input {
    display: block;
}
.multiselecthelper__input_wrapper {
    display: flex; 
    align-items: center;
    position: relative;
    height: 26px;
    top: 0;
}
</style>