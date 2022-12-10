<template>
    <div class="sort ml8" @click="rotateImg" @keyup.enter="rotateImg">
        <div v-if="sortType == 'string'">
            <font-awesome-icon v-if="sortOrder == 1" class="sort-btn" icon="fa-solid fa-arrow-down-a-z" />
            <font-awesome-icon v-else class="sort-btn" icon="fa-solid fa-arrow-up-a-z" />
        </div>

        <div v-else-if="sortType == 'number'">
            <font-awesome-icon v-if="sortOrder == 1" class="sort-btn" icon="fa-solid fa-arrow-down-1-9" />
            <font-awesome-icon v-else class="sort-btn" icon="fa-solid fa-arrow-up-1-9" />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TableSort',
        props: ['sortBy', 'storeName', 'sortType'],
        data() {
            return {
                sortOrder: 0
            }
        },
        methods: {
            rotateImg() {
                this.sortOrder === 1 ? this.sortOrder = 0 : this.sortOrder = 1
                this.$emit('clicked')
                this.$store.commit(`${this.storeName}/RESET_STATE`, {isMaster: false})
                this.$store.commit(`${this.storeName}/sortSet`, {
                    sortBy: this.sortBy, 
                    sortOrder: this.sortOrder
                })
                // this.$emit("sorted", this.sortData().reverse())
            },
        },
        updated() {
            console.log("updated")
        }
    }
</script>

<style scoped>
    .sort-btn {
        color: #c2c2c2;
    }
    .sort:hover, .sort:focus {
        cursor: pointer;
    }
</style>