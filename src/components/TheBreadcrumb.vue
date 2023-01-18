<template>
    <div id="breadcrumb" class="pr24 pl24 pt16">
        <div class="flex">
            <h2 class="m0">{{$route?.meta?.breadcrumb?.title}}</h2>
            <font-awesome-icon v-if="$route?.meta?.breadcrumb?.action"
                @keyup.enter="routeChange($route?.meta?.breadcrumb?.actionUrl)"
                @click.prevent="routeChange($route?.meta?.breadcrumb?.actionUrl)"
                tabindex="1" 
                class="icon ml16" 
                icon="fa-solid fa-plus"
            ></font-awesome-icon>
        </div>
        
        <div class="flex mt8">
            <div v-for="(route, index) of $route?.meta?.breadcrumb?.path" :key="index"
                class="flex"
            >
                <p class="route-name m0" 
                    tabindex="0"
                    @keyup.enter="routeChange(route?.route)"
                    @click.prevent="routeChange(route?.route)"
                >
                    {{route?.text}}
                </p>

                <span class="m0">/</span>
            </div>
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
    },
}
</script>

<style scoped>
#breadcrumb {
    width: 100%;
    color: #676a6c !important;
    font-size: 14px;
    text-transform: capitalize;
    color: inherit;
}
.flex {
    gap: 8px;
    display: flex;
    align-items: center;
}
.route-name {
    cursor: pointer;
}
h2 {
    font-weight: 300;
}
.icon {
    width: 16px;
    height: 16px;
    border: solid 1px #c2c2c2;
    border-radius: 100%;
    padding: 4px;
    cursor: pointer;
}
p {
    padding: 3px 3px 3px 0;
}
</style>