<script setup>
import { onMounted, onUnmounted, reactive, watch, ref, nextTick } from 'vue';

const state = reactive({
    showOptions: false,
    id: 'assignTo',
    filterString: '',
    filterOptions: [],
    options: ['a', 'b', 'c'],
    labelBy: null,
    closeOnSelectingOption: false,
    buttons: [],
    showInput: false
})

const inputBox = ref()

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
        "multiselecthelper__options_list".concat(state.id)
    );

    if (
        document.getElementById('multiselecthelper__input_wrapper'.concat(state.id))?.contains(e.target) === true
    ) {
        state.showInput = true
        nextTick(function () {
            inputBox.value.focus()
        })
        state.showOptions = true
    }

    else if (
        state.closeOnSelectingOption === false
        && optionsList.contains(e.target)
    ) {
        state.showOptions = true;
    }

    else {
        state.showInput = false
        state.showOptions = false
    }
}

function labelOptionFn(option) {
    return option[state.labelBy]
}

function filterWithFilterString() {
    state.filterOptions = state.options.filter((option) => {
        let optionLabel;
        if (state.labelBy !== null) {
            optionLabel = labelOptionFn(option)
        }
        else optionLabel = option

        return optionLabel.includes(state.filterString)
    })
}

function getOptions() {
    if (state.filterString === '') return state.options
    return state.filterOptions
}
</script>
 
<template>
    <div class="multiselectorhelper">

        <div
            style="position: relative; width: 100%; height: 50px;"
            :id="'multiselecthelper__input_wrapper'.concat(state.id)"
            class="multiselecthelper__input_wrapper"
        >
            <div 
                style="width: 100%; height: 50px; position: absolute; z-index: 1; top: 0; border: solid 1px #e0e0e0;"
            >

            <input 
                ref="inputBox"
                v-show="state.showInput === true"
                v-model="state.filterString"
                :id="'multiselect_input'.concat(state.id)" 
                class="multiselecthelper__input"
            >
            </div>
        </div>
       

        <div 
            class="multiselecthelper__options_list"
            :id="'multiselecthelper__options_list'.concat(state.id)"
            v-if="state.showOptions === true"
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
            >
                {{ state.labelBy === null ? option : labelOptionFn(option) }}
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
</template>

<style scoped>
.multiselectorhelper {
    position: relative;
    top: 0;
    right: 0;
}
.multiselecthelper__options_list {
    position: absolute;
    z-index: 999;
    border: solid 1px #e0e0e0;
    width: 100%;
    background-color: white;
}
.multiselecthelper__option {
    border-bottom: solid 1px #e0e0e0;
    padding: 8px 12px;
    box-sizing: border-box;
    cursor: pointer;
}
.multiselecthelper__input {
    width: 100% !important;
    cursor: pointer;
    position: absolute;
    top: 0;
    z-index: 2;
    background: none !important;
}
.multiselecthelper__input_wrapper:focus>.multiselecthelper__input {
    display: block;
}
</style>