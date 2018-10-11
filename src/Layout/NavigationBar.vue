<template>
    <div class="navigation-bar">
        <div class="header container-fluid">
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">Vue Application</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li ><router-link to="/">Home Page</router-link></li>
                        <li><router-link to="/addtodo">Add Task</router-link></li>
                        <li><router-link to="tasks/list">Tasks List</router-link></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavigationBar"
    }
</script>

<style scoped>
    li{
        margin-top: 5px;
    }
</style>