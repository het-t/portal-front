<template>
    <td v-click-away="hide" @click.stop="showDots($event)" class="dots-parent p0">
        <div class="dots-parent">
            <font-awesome-icon :class="dotsVisibility" class="dots-img"  
                :icon="['fas', 'ellipsis-vertical']" 
            />
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
            showDots(e) {
                this.dotsVisibility = 'dots-clicked'
                this.$emit('openMenu', e)
            },
            hide(e) {
                this.dotsVisibility = ''
                this.$emit('hideMenu', e)
            }
        }
    }
</script>

<style scoped>
    td {
        padding: 0 !important;
    }
    .dots-img{
        cursor: pointer;
        padding: 4px;
        /* background-color: rgba(192, 192, 192, 0.587); */
        border: solid 1px white;
    }
    .dots-parent .dots-img {
        color: grey !important;
    }
    .dots-parent:hover .dots-img {
        color: rgb(32, 32, 32) !important;
    }
    .dots-clicked {
        visibility: visible !important;
    }

    .tr:hover .dots-img {
        visibility: visible;
        /* border: solid 1px rgb(198, 198, 198); */
    }
</style>