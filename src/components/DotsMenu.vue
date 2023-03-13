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
.dots-menu .fa-stack {
    height: 13px;
    width: 13px;
}
.dots-menu .svg-inline--fa.fa-stack-2x {
    height: 13px !important;
    width: 13px !important; 
}
.dots-menu .svg-inline--fa.fa-stack-1x {
    height: 13px !important;
    width: 13px !important; 
}
.dots-menu ul {
    list-style: none;
    padding: 12px 4px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.dots-menu {
    position: absolute;
    right: 60px;
    z-index: 99; 
    border: solid 1px #e7eaec;
    box-shadow: 1px black; 
    box-shadow: 1px 1px 1px 1px #d2d2d2;
    background-color: white;
    filter: none;
    text-transform: capitalize;
}
.dots-menu {
    color: grey;
}
.dots-menu li {
    margin: 0 12px;
    cursor: pointer;
    display: flex;
    height: 36px;
    gap: 8px;
    align-items: center;
}
.dots-menu .fa-2x {
    font-size: 13px;
}
.dots-menu svg {
    width: 13px;
    height: 13px;
}

</style>