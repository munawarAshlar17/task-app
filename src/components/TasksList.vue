<template>
    <div class="taska-list">
        <NavigationBar></NavigationBar>
        <div class="container-fluid">
            <div class="row">
                <h1>List of Tasks</h1>
                <div class="col-md-8 col-md-offset-2">
                    <div v-bind:key="task.id" v-for="task in taskslist" class="single-blog">
                        <router-link v-bind:to="'/task/edit/'+ task.id"><span class="dot"></span> Task: {{task.name}}</router-link>
                    </div>



                </div>
            </div>

        </div>

        <Footer></Footer>
    </div>
</template>

<script>
    import NavigationBar from "../Layout/NavigationBar";
    import Footer from "../Layout/Footer";
    export default {
        name: "TasksList",
        components: {Footer, NavigationBar},

        data(){
            return {

                taskslist:[],
                x:0

            }
        },
        created(){
            this.$http.get('https://task-219514.firebaseio.com/tasks.json').then(function (data) {
                return data.json();

            }).then(function (data) {
                var tasks=[];
                for(let key in data)
                {
                    data[key].id=key;
                    tasks.push(data[key]);
                }
                this.taskslist=tasks;

            });

        },
    }

</script>

<style scoped>
    .single-blog{
        padding: 20px;
        margin: 20px 0;
        box-sizing: border-box;
        background: #eee;
    }
    .dot {
        height: 6px;
        width: 6px;
        background-color: #333;
        border-radius: 50%;
        display: inline-block;
    }

</style>