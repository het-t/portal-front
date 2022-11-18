<template>
    <div class="actions">
        <label for="search" class="mr8">search</label>
        <input v-model="dataToFind" @input="filter" type="text" id="search" class="mr24">
    </div>
</template>

<script>
    export default {
        name: 'TableFilter',
        data() {
            return {
                dataToFind: ''
            }
        },
        props: {
            tableData: JSON
        },
        methods: {
            filter() {
                let filteredData = []
                if (this.dataToFind == '') this.$emit('filtered', this.tableData)
                else {
                    this.tableData.forEach((o) => {
                        let flag = (Object.values(o).join(' ').includes(this.dataToFind))
                        if (flag == true) {
                            filteredData.push(o)
                        }
                    })
                    this.$emit('filtered', filteredData)
                }
            }
        }
}
</script>

<style scoped>
    input {
        width: 200px !important;
    }
</style>