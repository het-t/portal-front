<template>
    <div class="card">
        <div v-if="(displayHead != 'false')" 
            class="card-head m0 pb16 pt16 pr16 pl16">
            <div class="skeleton table-head m0"></div>
        </div>
        
        <div class="table-tabs">
            <button v-for="n in buttonsIndex" :key="n" class="skeleton button neutral tab">.</button>
        </div>

        <div>
            <form class="mt16 pb16 pr16 pl16">
                <div class="pl16 pb16">
                    <div class="fg">
                        <div v-for="n in 5" :key="n" class="row mt8">
                            <label class="skeleton labels c1"></label>
                            <label class="skeleton input ml16"></label>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'SkeletonForm',
        props: {
            displayHead: String,
            buttonsIndex: Number
        }
    }
</script>

<style scoped>
.labels { width: 20%; height: 34px;}
.input{ width: 80%; height: 34px;}
.table-tabs {
    display: flex;
}
.tab {
    padding: auto;
    width: 50%;
    background-color: white;
    border-radius: 0;
}
.skeleton {
    height: 34px; 
    animation: pulse-bg 1s infinite;
    border-radius: 4px;
}
@keyframes pulse-bg {
    0% {
    background-color: #ddd;
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: #ddd;
  }
}
</style>