<template>
    <div class="flex table-pagination">
        <div class="recordsPerPage">
            <label for="recordsPerPage">entries</label>
            <select @change="getPageData()" id="recordsPerPage" v-model="recordsPerPage"> 
                <option :value=50>50</option>
                <option :value=100>100</option>
                <option :value=150>150</option>
                <option :value=200>200</option>
            </select>
        </div>
        <ul>
            <li class="neutral">
                <button @click="pageChange(1)">&lt;</button>
            </li>
            <li class="neutral" v-for="n in showPage()" :key="n">
                <button :class="(n == currentPage) ? 'green' : ''" @click="pageChange(n)">{{n}}</button>
            </li>
            <li class="neutral">
                <button @click="pageChange(pageCount)">&gt;</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from '../api/axiosInstance.js'

    export default {
        name: 'TablePagination',
        data() {
            return {
                pageData: '',
                currentPage: 1,
                recordsPerPage: 50,
                pageCount: '',
                noCachingTotalRecords: ''
            }
        },
        computed: {
            totalRecords() {
                if (this.noCachingTotalRecords != '') return this.noCachingTotalRecords
                return this.$store.getters?.[`${this.tableName}/${this.tableName}CountGet`]
            },
            isStoreAvailable() {
                return !(this.noCaching == true)
            }
        },
        props: {
            tableName: String,
            sortBy: String,
            sortOrder: Number,
            filters: Array,
            noCaching: Boolean
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
                if (this.isStoreAvailable) this.$store.commit(`${this.tableName}/currentPageSet`, {index: page})
                this.getPageData()
            },
            getPageData() {
                this.pageCount = Math.ceil(this.totalRecords / this.recordsPerPage)

                let {sortBy, sortOrder} = this.$store.getters?.[`${this.tableName}/sortGet`] ?
                                        this.$store.getters?.[`${this.tableName}/sortGet`] :
                                        {}

                let pageDataStore = this.$store.getters?.[`${this.tableName}/${this.tableName}ListGet`]?.(this.currentPage, sortBy, sortOrder, this.filters)

                if ((
                    (pageDataStore == undefined) || 
                    (pageDataStore?.length == 0) || 
                    (pageDataStore?.length < this.recordsPerPage && pageDataStore?.length >= 50)
                ) || !this.isStoreAvailable) {
                    axios.get(`${this.tableName}`, {
                        params: {
                            from: (this.currentPage-1)*this.recordsPerPage,
                            recordsPerPage: this.recordsPerPage,
                            sortBy,
                            sortOrder,
                            filters: this.filters
                        },
                        withCredentials: true
                    })
                    .then((res) => {
                        if (this.isStoreAvailable) {
                            this.$store.commit(`${this.tableName}/${this.tableName}List`, {
                                index: this.currentPage, 
                                sortBy, 
                                sortOrder,
                                filters: this.filters,
                                data: res.data[this.tableName+'List']
                            })   
                        }
                        this.$emit("tableData", res.data[this.tableName+'List'])                
                    })
                } 
                else {
                    this.$emit("tableData", pageDataStore)
                }
            },
        },
        created() {
            if (this.isStoreAvailable){ 
                const currentPageInStore = this.$store.getters[`${this.tableName}/getCurrentPage`]

                if (currentPageInStore == '' || currentPageInStore == undefined) {
                    this.$store.commit(`${this.tableName}/currentPageSet`, {index: this.currentPage})
                }
                else this.currentPage = currentPageInStore
            }

            if (this.totalRecords == '' || this.totalRecords == undefined) {
                axios.get(`${this.tableName}/count`, {
                    params: {
                        filters: this.filters
                    },
                    withCredentials: true
                })
                .then((res) => {
                    this.noCachingTotalRecords = res.data.count
                    if (this.isStoreAvailable)this.$store.commit?.(`${this.tableName}/${this.tableName}CountSet`, res?.data?.count)
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
        column-gap: 8px;
        row-gap: 8px;
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
        margin: 0 1px;
    }
    li button, button:hover, button:focus {
        padding: 4px 10px;
        border: none !important;
    }
    button:active, .current {
        background-color: #e7eaec;
        color: black;
    }
    button {
        color: grey;
    }
</style>>