<template>
        <div class="card">

            <div class="mr16 ml16 mt16">
                <div class="table-main-head ml16 mb16">
                    <slot name="tableHeader"></slot>
                </div>
                
                <table style="min-height: 400px; width: 100%; overflow-x: auto;">
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

<style>
.table-main-head .icon {
    width: 16px;
    height: 16px;
    border: solid 1px #c2c2c2;
    border-radius: 100%;
    padding: 4px;
    cursor: pointer;
}
.table-main-head h2 {
    font-weight: 300;
}
</style>