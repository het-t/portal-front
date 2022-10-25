<template>
    <div class="alert">
        <p>
            {{msg}}
        </p>
        <button class="positive" @click="fn(...fnParam)">proceed</button>
        <button class="negative" @click="$emit('close-alert')">cancel</button>
    </div>
</template>

<script>
    export default {
        name: 'AlertC',
        props: {
            msg: String,
            fn: Function,
            fnParam: JSON,
        },
    }
</script>

<style scoped>
.alert {
    width: 50%;
    height:50%;
    position: absolute;
    margin: auto;
    color: whitesmoke;
    background-color:#141c3d;
}
</style>