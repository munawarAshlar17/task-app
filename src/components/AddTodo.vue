<template>
    <div class="add-todo-list">
        <NavigationBar></NavigationBar>
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h1>
                        Add Todo List
                    </h1>
                    <div v-if="submitted">
                        <div class="alert alert-success">
                            <strong>Success!</strong> Your task has added.
                        </div>
                    </div>
                    <br>
                    <input name="todo" class="form-control" placeholder="Enter your task..." v-model="tasks.name" >
                    <br>

                    <button class="btn btn-success pull-right" v-on:click.prevent="postTask" >Add Task</button>

                    <button class="btn btn-danger cancel" v-on:click="cancelTask">Cancel</button>



                </div>
            </div>
            <div class="row">

                <div class=" col-md-6 col-md-offset-3" v-if="!submitted">
                    <hr>
                    <div class="panel panel-default">

                        <div class="panel-body">
                            <h2>Task Preview</h2>
                            <span><h5> Task: {{this.tasks.name}}</h5> </span>
                        </div>
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
        name: "AddTodo",
        components: {Footer, NavigationBar},

        data(){
            return{
                submitted: false,
                tasks:
                    {
                        name: '',
                    },

            }
        },
        methods:{

            postTask()
            {
                this.$http.post('https://vueapp-32d4d.firebaseio.com/tasks.json',this.tasks).then(function () {
                    this.submitted=true;
                    this.tasks.name='';
                });
            },
            cancelTask()
            {
                return this.tasks.name='';
            }
        }
    }
</script>

<style scoped>
    .cancel{
        margin-left:575px;
    }
</style>