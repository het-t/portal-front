<template>
        <router-link :to="url" class="table-action">
            <img src="../assets/icons/plus-icon.png" alt="">
        </router-link>
</template>

<script>
export default {
    name: 'TableActionPlus',
    props: ['url']
}
</script>

<style>
.table-action img {
    width: 24px;
    height: 24px;
    filter: invert(0.2);
}
</style>