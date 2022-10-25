<template>
    <div class="flex">
        <div class="recordsPerPage">
            <label for="recordsPerPage">entries</label>
            <select @change="getPageData()" id="recordsPerPage" v-model="recordsPerPage" type="number" class="ml8"> 
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
        <ul>
            <li class="neutral">
                <a href="#" @click="pageChange(1)">&lt;&lt;</a>
            </li>
            <li class="neutral" v-for="n in showPage" :key="n">
                <a href="#" :class="(n == currentPage) ? 'green' : ''" @click="pageChange(n)">{{n}}</a>
            </li>
            <li class="neutral">
                <a href="#" @click="pageChange(pageCount)">&gt;&gt;</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'TablePagination',
        data() {
            return {
                pageData: '',
                totalRecords: '',
                currentPage: 1,
                recordsPerPage: 10,
                pageCount: '',
            }
        },
        computed: {
            showPage() {
                let numShown = 5;
                numShown = Math.min(numShown, this.pageCount)
                let first = this.currentPage - Math.floor(numShown / 2)
                first = Math.max(first, 1)
                first = Math.min(first, this.pageCount - numShown + 1)
                return [...Array(numShown)].map((k,i) => i + first)
            }
        },
        props: {
            tableName: String,
        },
        methods: {
            pageChange(page) {
                this.currentPage = page
                this.getPageData()
            },
            getPageData() {
                this.pageCount = Math.ceil(this.totalRecords / this.recordsPerPage)
                axios.get(`/u/api/${this.tableName}`, {
                    params: {
                        from: (this.currentPage-1)*this.recordsPerPage,
                        records_per_page: this.recordsPerPage,
                    },
                    withCredentials: true
                })
                .then((activities) => {
                    this.$emit("tableData", activities.data)
                    console.log("table data", activities.data)
                });
            },
        },
        created() {
            axios.get(`/u/api/${this.tableName}/count`, {
                withCredentials: true
            })
            .then((count) => {
                this.totalRecords = count.data[0].count
                this.pageCount = Math.ceil(this.totalRecords / this.recordsPerPage)
                console.log("total records: ", this.totalRecords)
                console.log("page count:", this.pageCount)
            })
            this.getPageData()
        }
    }
</script>

<style scoped>
    .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .recordsPerPage {
        display: flex;
        align-items: center;
        margin: 13px 0;
    }
    select {
        padding: 4px;
    }
    ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    li {
        list-style: none;
        border: solid 1px #e7eaec;
    }
    li a {
        padding: 4px 10px;
    }
    a:active, .current {
        background-color: #e7eaec;
        color: black;
    }
</style>>