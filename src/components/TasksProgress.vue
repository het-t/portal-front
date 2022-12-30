<template>
    <div class="prg">
        <circle-progress class="progress" :percent="prg" fill-color="#1baf83"></circle-progress>
        <span>{{ completed }} / {{ total }}</span>
    </div>
</template>

<script>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

    export default {
        name: 'TasksProgress',
        components: {
            CircleProgress
        },
        props: ['total' , 'completed'],
        computed: {
            prg() {
                console.log(this.completed*100 / this.total)
                return this.completed*100 / this.total
            }
        }
    }
</script>

<style>
.progress svg {
    width: 22px;
    height: 22px;
}
.prg {
    display: flex;
    flex-direction: column;
}
.vue3-circular-progressbar {
    height: 30px !important;
    width: 30px !important;
}
</style>