<template>
    <div class="mr24 ml24">
        <router-view></router-view>
    </div>
</template>

<script>
import { useMeta } from 'vue-meta'
export default {
    setup() {
        useMeta({title: 'Task Templates'})
    }
}
</script>