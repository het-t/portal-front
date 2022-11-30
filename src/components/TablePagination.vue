<template>
    <div class="flex">
        <div class="recordsPerPage">
            <label for="recordsPerPage">entries</label>
            <select @change="getPageData()" id="recordsPerPage" v-model="recordsPerPage" class="ml8"> 
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
            <li class="neutral" v-for="n in showPage()" :key="n">
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
                currentPage: 1,
                recordsPerPage: 10,
                pageCount: ''
            }
        },
        computed: {
            totalRecords() {
                return this.$store.getters[`${this.tableName}/${this.tableName}CountGet`]
            },
        },
        props: {
            tableName: String,
        },
        methods: {
            showPage() {
                if (!isNaN(this.pageCount)) {
                    let numShown = 5;
                    numShown = Math.min(numShown, this.pageCount)
                    let first = this.currentPage - Math.floor(numShown / 2)
                    first = Math.max(first, 1)
                    first = Math.min(first, this.pageCount - numShown + 1)
                    return [...Array(numShown)].map((k,i) => i + first)
                }
                else {
                    return 0
                }
            },
            pageChange(page) {
                this.currentPage = page
                this.getPageData()
            },
            getPageData() {
                this.pageCount = Math.ceil(this.totalRecords / this.recordsPerPage)
                
                let pageDataStore = this.$store.getters[`${this.tableName}/${this.tableName}ListGet`]?.(this.currentPage)

                if ((pageDataStore == undefined) || (pageDataStore?.length == 0)) {

                    axios.get(`/u/api/${this.tableName}`, {
                        params: {
                            from: (this.currentPage-1)*this.recordsPerPage,
                            recordsPerPage: this.recordsPerPage,
                        },
                        withCredentials: true
                    })
                    .then((res) => {
                        this.$emit("tableData", res.data[this.tableName+'List'])
                        this.$store.commit(`${this.tableName}/${this.tableName}List`, {index: this.currentPage, data: res.data[this.tableName+'List']})
                    })
                } 
                else {
                    this.$emit("tableData", pageDataStore)
                }
                

            },
        },
        created() {
            if (this.totalRecords == '') {
                axios.get(`/u/api/${this.tableName}/count`, {
                    withCredentials: true
                })
                .then((res) => {
                    this.$store.commit(`${this.tableName}/${this.tableName}CountSet`, res?.data?.count)
                })
                .then(() => {
                    this.getPageData()
                })
            }
            else {
                this.getPageData()
            }            
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