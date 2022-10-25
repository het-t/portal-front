<template>
    <div class="sort ml24">
        <button>
            <img @click.prevent="rotateImg" ref="sortImg" src="../assets/icons/sorting.png" alt="" class="sorting-img" />
        </button>
    </div>
</template>
<script>
    export default {
        name: 'TableSort',
        data() {
            return {
                sortStatus: false,
                sortedData: []
            }
        },
        props: {
            tableData: JSON,
            keyToSort: String
        },
        methods: {
            rotateImg() {
                console.log("rotating")
                this.sort = !this.sort
                if (this.sort) {
                    this.$refs.sortImg.classList.add('tr-th-rotated') 
                }
                else {
                    this.$refs.sortImg.classList.remove('tr-th-rotated')
                }
                this.$emit("sorted", this.sortData().reverse())
                this.sortedData = this.tableData
            },
            sortData() {
                this.sortedData = this.tableData
                for (let i = 1; i!=this.tableData.length; i++) {
                    let key = this.tableData[i]
                    let j;
                    for (j=i-1; j>=0; j--) {
                        if (this.tableData[j] > this.tableData[i]) {
                            this.sortedData[j+1] = this.tableData[j]
                        }
                        else break
                    }
                    this.sortedData[j+1] = key

                }
                return this.sortedData
            }
        }
    }
</script>

<style scoped>
    button {
        border: none;
        cursor: pointer;
        background-color: white;
        padding: 3px;
        width: 19px;
        height: 19px;
        padding:auto;
    }
</style>