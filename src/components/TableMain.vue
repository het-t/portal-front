<template>
        <div class="card">

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