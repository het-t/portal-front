<template>
    <div id="breadcrumb" class="pr24 pl24 pt16 pb16">
        <h2 class="m0">{{$route?.meta?.breadcrumb?.title}}</h2>
        
        <div class="route-path mt16">
            <p class="route-name m0" 
                v-for="(route, index) of $route?.meta?.breadcrumb?.path" :key="index"
                @click.prevent="routeChange(route?.route)"
            >
                {{route?.text}}
            <span class="mr8 ml8">/</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheBreadcrumb',
    methods: {
        routeChange(path, args) {
            console.log(path)
            if (args != undefined) this.$router.push(path)
            else this.$router.push(path)
        }
    }
}
</script>

<style scoped>
#breadcrumb {
    width: 100%;
    height: 80px;
    background-color: #fff;
    color: #676a6c !important;
    font-size: 14px;
    text-transform: capitalize;
    color: inherit;
}
.route-path {
    display: flex;
}
.route-name {
    cursor: pointer;
}
h2 {
    font-weight: 300;
}
</style>