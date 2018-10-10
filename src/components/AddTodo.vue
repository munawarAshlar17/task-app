<template>
    <div class="add-todo-list">
        <NavigationBar></NavigationBar>
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h1>
                        Add Todo List
                    </h1>
                    <input name="todo" class="form-control" placeholder="Enter your task"/>
                    <br>
                    <button class="btn btn-success pull-right">Add Task</button>
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
        components: {Footer, NavigationBar}
    }
</script>

<style scoped>

</style>