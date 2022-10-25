<template>
    <div class="card">
        <div class="card-head m0 pb16 pr16 pt16 pl16">
            <h5 class="table-head m0">project</h5>
        </div>

        <form class="mr16 ml16 mt16 mb16 pr12 pl12">
            <div class="row mt8">
                <label for="project-title" class="labels c1">title</label>
                <input type="text" id="project-title">
            </div>
            <div class="row mt8">
                <label for="project-client" class="labels c1">client</label>
                <select @change="changeRoute($event)" v-model="some" id="project-client">
                    <option value="/u/clients/create-client">create new client</option>
                </select>
            </div>

            <div class="row mt8">
                <label for="project-tasks" class="labels c1">tasks</label>
                <select @change="changeRoute($event)" type="text" v-model="some" id="project-tasks">
                    <option value="/u/tasks/create-task">create new task</option>
                </select>
            </div>

            <div class="row mt8">
                <label for="project-repeat" class="labels c1">repeat</label>
                <select v-model="projectRepeat" type="text" id="project-repeat">
                    <option value="year">every year</option>
                    <option value="month">every month</option>
                    <option value="day">every day</option>
                </select>
            </div>
            
            <div class="row mt8">
                <label for="repeat-on-date" class="labels c1">repeat on</label>
                <input type="date" id="project-repeat-date">
            </div>

            <button @click.prevent="clear()" class="neutral button">cancel</button>
            <button @click.prevent="proceed(), clear()" class="green ml8 button">create</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'CreateProject',
        data() {
            return {
                projectRepeat: '',
            }
        },
        methods: {
            changeRoute(e) {
                if (e.target.value == '/u/tasks/create-task' || e.target.value == '/u/clients/create-client') this.$router.push(e.target.value)
            }
        }
    }
</script>

<style scoped>
    input {
        width: 40%;
    }
    select, input[type="date"] {
        min-width: 40%;
        max-width: fit-content;
    }
</style>