<template>
    <table-main class="pb16">
        <template #thead>
            <tr class="mr16 mt16 ml16">
                <th class="skeleton"></th>
            </tr>
        </template>

        <template #tbody>
            <tr class="tr" v-for="n in 10" :key="n">
                <td class="skeleton"></td>
            </tr>
        </template>   

    </table-main>
</template>

<script>
    import TableMain from '../components/TableMain.vue'
    export default {
        components: { TableMain },
        name: 'SkeletonCard'
    }
</script>

<style scoped>
@import "../assets/stylesheet/skeleton-card.css";
.table-head {
    width: 100px;
    height: 24px;
}
.skeleton {
    animation: pulse-bg 1s infinite;
    border-radius: 4px;
}
tr {
    height: 42px;
    padding: 0 !important;
}
.table-action {
    width: 24px;
    height: 24px;
    border-radius: 100%;
}
</style>