<template>
    <div class="dots-menu">
        <ul @click.stop="(true)">
            <slot name="links"></slot>
        </ul>
    </div>
</template>

<script>
    import { mixin as VueClickAway } from "vue3-click-away"

    export default {
        name: "dotsMenu",
        data() {
            return {
                menu: '',
            }
        },
        mixins: [VueClickAway],
    }
</script>

<style>
.dots-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.dots-menu .menu-icons {
    padding: 8px 8px; 
}
.dots-menu {
    position: absolute;
    width: fit-content;
    z-index: 9; 
    border: solid 1px #e7eaec;
    box-shadow: 1px black; 
    box-shadow: 1px 1px 1px 1px #d2d2d2;
    background-color: white;
    filter: none;
    text-transform: capitalize;
}
.dots-menu .menu-icons {
    color: rgb(56, 56, 56);
    width: 18px;
    height: 18px;
    border-bottom: solid 2px #e7eaec;
}
li {
    width: 34px;
    height: 34px;
    cursor: pointer;
}
</style>