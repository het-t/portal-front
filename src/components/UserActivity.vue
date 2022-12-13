<template>
    <div>
        <div class="card">


            <div class="mt16 ml16 mr16">
                <table>
                    <tr>
                        <th>
                            <div class="flex">
                                <table-sort class="inline" @clicked="i=!i; k=!k; m=!m; n=!n; o=!o; p=!p;" :key="j" sortBy="id" sortType="number" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    id
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex">
                                <table-sort class="inline" @clicked="j=!j; k=!k; m=!m; n=!n; o=!o; p=!p;" :key="i" sortBy="user" sortType="string" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="userH" type="text" class="header p0" required>
                                    <span @click="$refs['userH'].focus()" class="floating-label">user</span>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex">
                                <table-sort class="inline" @clicked="i=!i; j=!j; m=!m; n=!n; o=!o; p=!p;" :key="k" sortBy="act" sortType="string" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="activityH" type="text" class="header p0" required>
                                    <span @click="$refs['activityH'].focus()" class="floating-label">activity</span>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex">
                                <table-sort class="inline" @clicked="i=!i; j=!j; k=!k; n=!n; o=!o; p=!p;" :key="m" sortBy="table" sortType="string" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    <input v-debounce:700ms.lock="sort" v-model="filterFor[2]" ref="tableH" type="text" class="header p0" required>
                                    <span @click="$refs['tableH'].focus()" class="floating-label">table</span>
                                </div>
                            </div>
                            
                        </th>
                        <th>
                            <div class="flex">
                                <div class="floating-container">
                                    key
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex">
                                <table-sort class="inline" @clicked="i=!i; j=!j; k=!k; m=!m; o=!o; p=!p;" :key="n" sortBy="details" sortType="string" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    <input v-debounce:700ms.lock="sort" v-model="filterFor[3]" ref="detailsH" type="text" class="header p0" required>
                                    <span @click="$refs['detailsH'].focus()" class="floating-label">details</span>
                                </div>
                            </div>
                            
                        </th>
                        <th class="w">
                            <div class="flex">
                                <table-sort class="inline" @clicked="i=!i; j=!j; k=!k; m=!m; n=!n; p=!p;" :key="o" sortBy="time" sortType="number" storeName="activity"></table-sort>

                                <div class="floating-container">
                                    <input v-debounce:700ms.lock="sort" v-model="filterFor[4]" ref="timeH" type="text" class="header p0" required>
                                    <span @click="$refs['timeH'].focus()" class="floating-label">time</span>
                                </div>
                            </div>
                        </th>
                    </tr>

                    <tr class="tr" v-for="activity in activityData" :key="activity?.id" >
                        <td>
                            {{activity?.id}}
                        </td>

                        <td>
                            {{activity?.email}}
                        </td>

                        <td>
                            {{activity?.activity}}
                        </td>
                        
                        <td>
                            {{activity?.referenceTable}}
                        </td>

                        <td>
                            {{activity?.referenceTablePkId}}
                        </td>

                        <td>
                            {{activity?.detail}}
                        </td>

                        <td class="w">
                            {{(new Date(activity?.datestamp).toLocaleString())}}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="pagination mr16 ml16">
                <TablePagination @tableData="tablePagination($event)"
                    :filters="filterFor"
                    :key="p"
                    tableName="activity"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import TablePagination from './TablePagination.vue'
    import TableSort from './TableSort.vue'

    export default {
        name: "UserActivity",
        data() {
            return {
                activityData: [],

                i:0, j:0, k:0, l:0, m:0, n:0, o:0, p:0,

                filterFor: ['', '', '', '', '']
            };
        },
        methods: {
            tablePagination(event) {
                console.log("in user activity", event)
                this.activityData = event
            },
            sort() {
                this.p = !this.p
            }
        },
        components: { 
            TablePagination,
            TableSort
        }
    }
</script>

<style scoped>
    .flex {
        display: flex;
        align-items: center;
    }
    .w {
        min-width: 150px;
    }
    .entries {
        display: flex;
        flex-direction: row;
        margin: 13px 0;
        align-items: center;
    }
</style>