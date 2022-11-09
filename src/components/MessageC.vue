<template>
    <div @click.prevent="hideMessage" :class="getMessageData.bgcolor" class="mb8 pr16 pl16 pt16 pb16">
        <h5 class="table-head">{{getMessageData.title}}</h5>
        <p>{{getMessageData.msg}}</p>
        <div id="timer" ref="timer" :style="{width: timer}"></div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'MessageC',
        data() {
            return {
                leftTime: 5000
            }
        },
        computed: {
            ...mapGetters(['getMessageData']),
            timer() {
                return (this.leftTime * 100 / 5000) + '%'
            }
        },
        methods: {
            ...mapMutations(['hideMessage']),
            changeWidth() {
                setInterval(() => {
                    if (this.leftTime > 0)
                    this.leftTime = this.leftTime - 50
                }, 50)
            }
        },
        created() {
            this.changeWidth()
            console.log("message shown", this.getMessageData.title, this.getMessageData.msg, this.getMessageData.bgcolor)
        },
    }
</script>

<style scoped>
    .green {
        background-color: rgb(27, 175, 131);
    }
    .red {
        background-color: rgb(255, 85, 85);
    }
    div {
        width: 200px;
        position: absolute;
        right: 0;
        top: 50px;
        border-radius: 6px 0 0 6px;
    } 
    h5, p {
        color: white !important;
        margin: 0;
    }
    h5 {
        margin-bottom: 12px !important;
    }
    #timer {
        position: absolute;
        top: 0;
        right: 0;
        height: 5px;
    }
    .green #timer {
        background-color: rgb(0, 81, 0);
    }
    .red #timer {
        background-color: red;
    }
</style>