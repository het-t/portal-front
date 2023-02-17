<template>
    <div>
        <div ref="menu">
            <dots-menu v-if="menuVisibisility == true">
                <template #links>
                    <li @click.prevent="deleteOrg">
                        <font-awesome-icon
                            class="menu-icons" 
                            :icon="['fas', 'trash']"
                        ></font-awesome-icon>
                        Delete
                    </li>
                </template>
            </dots-menu>
        </div>

        <table-main>
            <template #thead>
                <tr class="table-heading">
                    <th>
                        <div class="flex">
                            <table-sort :key="i" @clicked="j=!j; p=!p; sort();" sortType="string" sortBy="id"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[0]" ref="idH" class="header p0" type="text" required>
                                <span @click="$refs['idH'].focus()" class="floating-label">Id</span>
                            </div>
                        </div>
                    </th>

                    <th>
                        <div class="flex">
                            <table-sort :key="i" @clicked="j=!j; p=!p; sort();" sortType="string" sortBy="name"></table-sort>

                            <div class="floating-container">
                                <input v-debounce:700ms.lock="sort" v-model="filterFor[1]" ref="nameH" class="header p0" type="text" required>
                                <span @click="$refs['nameH'].focus()" class="floating-label">Name</span>
                            </div>
                        </div>
                    </th>
                    <div style="border: none !important;"></div>
                </tr>
            </template>

            <template #tbody>
                <template v-for="(org, index) in orgsList" :key="index">
                    <tr class="tr hidden-tr-parent"
                        @click.prevent="editOrg(org.id)"
                        @keyup.enter="editOrg(org.id)"
                    >
                        <td>{{ org.id }}</td>
                        <td>{{ org.name }}</td>
                        <div class="dots p12">
                            <dots-img 
                                @openMenu="menu($event, {org: org.name, orgId: org.id, visibility: true})" 
                                @hideMenu="menu($event, {org: org.name, orgId: org.id, visibility: false})" 
                            />
                        </div>
                    </tr>
                </template>
            </template>

            <table-pagination 
                :filters="filterFor"
                @tableData="orgsList = $event"
                :key="p"
                tableName="orgs"
                :noCaching="true"
            ></table-pagination>
        </table-main>
    </div>
</template>

<script>
import TableMain from './TableMain.vue';
import TablePagination from './TablePagination.vue';
import TableSort from './TableSort.vue';
import DotsImg from './DotsImg.vue';
import DotsMenu from './DotsMenu.vue';

    export default {
        name: 'OrganizationsList',
        data() {
            return {
                orgsList: [],
                filterFor: ['', ''],

                i:0, j:0, p:0,
                menuVisibisility: false,
            }
        },
        components: {
            TableMain,
            TablePagination,
            TableSort,
            DotsImg,
            DotsMenu
        },
        methods: {
            sort() {
                this.p = !this.p
            },
            menu(e, {org, orgId, visibility}) {
                this.menuVisibisility = visibility
                this.selectedOrgId = orgId
                this.selectedOrg = org
                if (visibility == true) e.target.parentElement.append(this.$refs['menu'])
            },
            editOrg(orgId) {
                this.$router.push(`/u/admin/orgs/${orgId}`)
            },
        }
    }
</script>

<style scoped>
@import '../assets/stylesheet/nth-child-no-border.css';
.tr:hover .dots img {
    visibility: visible !important;
}
.hide {
    display: none !important;
}
</style>