<template>
    <vue-ellipse-progress :progress="50"></vue-ellipse-progress>
    <!-- <div class="flex">
        <div>
            <div class="base-timer">
                <svg
                class="base-timer__svg"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <g class="base-timer__circle">
                        <circle
                        class="base-timer__path-elapsed"
                        cx="32"
                        cy="32"
                        r="25"
                        />
                        <path
                            :stroke-dasharray="length"
                            class="base-timer__path-remaining"
                            d="
                            M 32, 32
                                m -25, 0
                                a 25,25 0 1,0 50,0
                                a 25,25 0 1,0 -50,0
                        "></path>

                    </g>

                </svg>
            </div>
        </div>
        <p class="m0 ml16">
            1/2
        </p>
    </div> -->
</template>

<script>
    import VueEllipseProgress from 'vue-ellipse-progress'

    export default {
        name: 'TasksProgress',
        components: {
            VueEllipseProgress
        },
        data() {
            return {
                length: 2*3.14*12.5
            }
        },
        computed: {
            circleDasharray() {
                return 5
            },
        }
    }
</script>

<style scoped>
.flex {
    display: flex;
    align-items: center;
}
.base-timer {
  position: relative;
  width: 24px;
  height: 24px;
}
  .base-timer__circle {
    fill: none;
    stroke: none;
  }
  .base-timer__path-elapsed {
    stroke-width: 7px;
    stroke:#c3c3c3;
  }

  .base-timer__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    stroke: rgb(65, 184, 131);
  }
  .base-timer__svg {
    transform: scaleX(-1);
  }


</style>