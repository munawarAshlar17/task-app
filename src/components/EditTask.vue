<!--<template>-->
    <!--<div class="edit-task">-->
        <!--<NavigationBar></NavigationBar>-->
        <!--<div class="container-fluid">-->
            <!--<div class="row">-->
                <!--<div class="col-md-8 col-md-offset-2">-->
                    <!--<input name="todo" class="form-control" placeholder="Enter your task..." v-model="tasks.name" >-->
                    <!--<br>-->

                    <!--<button class="btn btn-success pull-right" v-on:click.prevent="postTask" >Edit Task</button>-->

                    <!--<button class="btn btn-danger cancel" v-on:click="cancelTask">Cancel</button>-->


                <!--</div>-->
            <!--</div>-->

        <!--</div>-->
        <!--<Footer></Footer>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import NavigationBar from "../Layout/NavigationBar";-->
    <!--import Footer from "../Layout/Footer";-->
    <!--export default {-->
        <!--components: {Footer, NavigationBar},-->
        <!--name: "EditTask",-->
        <!--data(){-->
            <!--return {-->
                <!--id: this.$route.params.id,-->
                <!--tasks:{-->

                <!--},-->


            <!--}-->
        <!--},-->
        <!--created(){-->
            <!--this.$http.get('https://vueapp-32d4d.firebaseio.com/tasks/'+ this.id+'.json').then(function (data)-->
            <!--{-->
                <!--return data.json();-->

            <!--}).then(function (data) {-->
                <!--this.tasks=data;-->

            <!--})-->
        <!--},-->
        <!--methods:-->
            <!--{-->
                <!--postTask()-->
                <!--{-->
                    <!--this.$http.post('https://vueapp-32d4d.firebaseio.com/tasks/'+ this.id,this.tasks.name).then(function () {-->
                        <!--this.submitted=true;-->

                    <!--});-->
                <!--},-->
                <!--cancelTask()-->
                <!--{-->
                    <!--return this.tasks.name='';-->
                <!--}-->
            <!--}-->


    <!--}-->
<!--</script>-->

<!--<style scoped>-->
    <!--.cancel{-->
        <!--margin-left:975px;-->
    <!--}-->
<!--</style>-->