<template>
    <div class="taska-list bg-grey-lightest text-justify font-sans">
        <NavigationBar></NavigationBar>
        <div class="container mx-auto px-4">
            <div class="row">
                <br>
                <h1 class="text-center">List of Tasks</h1>
                <br>
                <div class="flex">
                    <!--<div class="w-full w-1/3  "></div>-->
                    <div class="w-full w-1 bg-grey-light p-4">
                        <div v-bind:key="task.id" v-for="task in taskslist" class="single-blog">
                            <router-link class="no-underline text-blue-darkest text-lg font-semibold capitalize hover:text-blue-light text-center" v-bind:to="'/task/edit/'+ task.id"><span class="dot"></span> {{task.name}} <i class="far fa-edit"></i></router-link>
                        </div>
                    </div>
                    <!--<div class="w-full w-1/3"></div>-->

                </div>
            </div>

        </div>
<br>
<br>
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
        padding: 10px;
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