<template>
    <div>
        <slot name="label"></slot>

        <label class="switch">
            <input :title="name" 
                :id="name" 
                :name="name" 
                :value="currentState" 
                type="checkbox" 
                v-model="currentState" 
                @click="toggleCheckbox"
            >
            <div class="slider round"></div>
        </label>
    </div>
</template>

<script>
export default {
    name: 'ToggleSwitch',
    data() {
        return {
            currentState: true 
        }
    },
    props: {
        value:{
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        toggleCheckbox() {
            this.currentState == true ? this.currentState = false : this.currentState = true
            this.$emit('switchToggled', {'key': this.name, 'value': this.currentState})
        }
    },
    mounted() {
        this.value == 'true' ? this.currentState = true : this.currentState = false
    }
};
</script>

<style>
    @import '../assets/stylesheet/toggle-switch.css';
</style>