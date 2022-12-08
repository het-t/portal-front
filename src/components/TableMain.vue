<template>
        <div class="card">
            <div class="card-head m0 pb16 pt16 pr16 pl16">
                <h5 class="table-head m0">
                    <slot name="table-heading"></slot>
                </h5>
                <slot name="table-action"></slot>
            </div>

            <!-- <TableFilter :tableData="rolesList" @filtered="filteredRolesList = $event" class="mr16 ml16 mt16 actions"/> -->

            <div class="mr16 ml16 mt16">
                <table>
                    <thead>
                        <slot name="thead"></slot>
                    </thead>

                    <tbody>
                        <slot name="tbody"></slot>
                    </tbody>
                </table>
                
                <slot></slot>
            </div>
        </div>

</template>

<script>
    export default {
        name: 'TableMain',
    }
</script>