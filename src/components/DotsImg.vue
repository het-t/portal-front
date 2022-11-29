<template>
    <td v-click-away="hide" class="dots p0">
        <div class="dots-parent"
            @click.prevent="[$emit('dotsClicked', $event), showDots()]" 
        >
            <font-awesome-icon :class="dotsVisibility" class="dots-img"  
                :icon="['fas', 'ellipsis-vertical']" 
            />
            <!-- <img src="../assets/icons/dots-icon.png" alt=""> -->
        </div>
    </td>
</template>

<script>
import {mixin as VueClickAway} from 'vue3-click-away'
    export default {
        name: 'DotsImg',
        mixins: [VueClickAway],
        data() {
            return {
                dotsVisibility: '',
            }
        },
        methods: {
            showDots() {
                this.dotsVisibility = 'dots-clicked'
            },
            hide() {
                this.dotsVisibility = ''
            }
        }
    }
</script>

<style scoped>
    .dots-img{
        cursor: pointer;
        color: black !important;
    }
    .dots-clicked {
        visibility: visible !important;
    }

    .tr:hover .dots-img {
        visibility: visible;
    }
</style>