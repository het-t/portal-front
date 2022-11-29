<template>
        <router-link :to="url" class="table-action">
            <font-awesome-icon :icon="['fas', 'circle-plus']" class="table-action-plus"></font-awesome-icon>
        </router-link>
</template>

<script>
export default {
    name: 'TableActionPlus',
    props: ['url']
}
</script>

<style>
.table-action-plus {
    width: 24px;
    height: 24px;
    color: #2f4050;
}
</style>