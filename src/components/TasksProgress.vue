<template>
    <div class="prg">
        <div class="flex" :title="parseFloat(completed * 100 / total).toFixed(2)+'%'">
            <circle-progress class="progress" :percent="prg" fill-color="#1baf83"></circle-progress>
            <span style="font-size: 12px;">{{ completed }} / {{ total }}</span>
        </div>

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
    width: 20px;
    height: 20px;
}
.prg {
    display: flex;
    flex-direction: column;
}
.vue3-circular-progressbar {
    height: 30px !important;
    width: 30px !important;
}
.flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
}
</style>