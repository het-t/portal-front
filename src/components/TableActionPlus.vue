<template>
        <router-link ref="focus" :to="url" class="table-action">
            <font-awesome-icon :icon="['fas', 'circle-plus']" class="table-action-plus"></font-awesome-icon>
        </router-link>
</template>

<script>
export default {
    name: 'TableActionPlus',
    props: ['url'],
    mounted() {
        this.$refs['focus'].$el.focus()
    }
}
</script>

<style>
.table-action-plus {
    width: 24px;
    height: 24px;
    color: #2f4050;
}
.table-action a:hover {
    border: solid;
}
</style>