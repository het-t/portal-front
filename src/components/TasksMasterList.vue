<template>
    <TableMain>
        <template #thead>
            <tr class="table-heading">
                <th>
                    <div class="flex">
                        <TableSort></TableSort>
                    </div>
                </th>
            </tr>
        </template>
    </TableMain>
</template>

<script>
import TableMain from './TableMain.vue'
import TableSort from './TableSort.vue'

export default {
    name: 'TasksMasterList',
    components: {
        TableMain,
        TableSort
    }
}
</script>