<script setup>
import { reactive, watch, defineProps } from "vue";

const props = defineProps({
    updateValue: {
        type: String,
        default: '0'
    },
    _k_: {
        type: String
    }
})

const state = reactive({
    currentNum: 0,
    remained: 0,
    i: 0,
    timer: ''
})

watch(
    () => props.updateValue,
    (newValue) => {
        state.remained = newValue

        let quantam = 
            newValue < 0 
                ? 
            Math.floor(Math.min(newValue/10, -100)) 
                : 
            Math.ceil(Math.max(newValue/10, 100))

        state.timer = setInterval(function () {
            if (state.remained == 0 || isNaN(state.remained) || isNaN(state.currentNum)) {
                clearInterval(state.timer)
                state.timer = ''
            }

            else if (state.remained < 0 && state.remained >= quantam) {
                state.currentNum = new Number(state.currentNum) + state.remained
                state.remained = 0
            }
            else if (state.remained > 0 && state.remained <= quantam) {
                state.currentNum = new Number(state.remained) + new Number(state.currentNum)
                state.remained = 0
            }
            else {
                state.currentNum = state.currentNum + quantam
                state.remained = state.remained - quantam
            }
            state.i ++
        }, 300)
    }
)
</script>

<template>
    <div class="transition-num">
        <transition name="slide" mode="out-in">
            <span v-if="state.i % 2 === 0" :key="`${props._k_}-x`" class="amount">
                {{ state.currentNum }}
            </span>

            <span v-else :key="`${props._k_}-y`" class="amount">
                {{ state.currentNum }}
            </span>
        </transition>
    </div>
</template>

<style scoped>
.transition-num {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
span {
    position: relative;
}
.amount {
    font-size: 25px;
    color: rgba(103, 106, 108, 1);
}
.slide-enter-active, .slide-leave-active {
  transition: all 100ms;
}
.slide-leave {
  top: 0px;
  opacity: 1;
} 
.slide-enter {
  top: 2px;
  opacity: 0.5;
}



.slide-enter-to {
  top: 0px;
  opacity: 1;
}

.slide-leave-to {
  top: -6px;
  opacity: 0;
  transform: blur(80px);
}
</style>