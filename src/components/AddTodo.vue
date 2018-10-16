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




                </div>
            </div>

            <div>
                <h2>Search and add a pin</h2>
                <label>
                    <gmap-autocomplete
                            @place_changed="setPlace" class=" change-height">
                    </gmap-autocomplete>
                    &nbsp;
                    &nbsp;
                    <button @click="addMarker" class="btn btn-primary button" >Add Place</button>
                </label>
                <br/>

            </div>
            <br>
            <gmap-map
                    :center="center"
                    :zoom="12"
                    style="width:100%;  height: 400px;"
            >
                <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="center=m.position"
                ></gmap-marker>
            </gmap-map>
            <br>
            <br>
            <button class="btn btn-success pull-right" v-on:click.prevent="postTask" >Add Task</button>

            <button class="btn btn-danger cancel" v-on:click="cancelTask">Cancel</button>

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

        data() {
            return {
                submitted: false,
                tasks:
                    {
                        name: '',
                        lat:'',
                        lng:'',
                        place_name:'',
                    },
                center: { lat: 37.0902, lng: 95.7129},
                markers: [],
                places: [],
                currentPlace: null
            }
        },
        mounted() {
            this.geolocate();
        },



        methods: {

            postTask() {
                this.$http.post('https://task-219514.firebaseio.com/tasks.json',
                    {
                        name:this.tasks.name,
                        lat:this.lat,
                        lng:this.lng,
                        place_name:this.place_name,
                    }
                ).then(function () {
                    this.submitted = true;
                    this.tasks.name = '';
                });
            },
            cancelTask() {
                return this.tasks.name = '';
            },
            setPlace(place) {
                this.currentPlace = place;
                this.lat=this.currentPlace.geometry.location.lat();
                this.lng=this.currentPlace.geometry.location.lng();
                this.place_name=this.currentPlace.formatted_address;

            },
            addMarker() {
                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng()
                    };
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                }
            },
            geolocate: function() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            }
        }

    }
</script>


<style scoped>

    .vue-map-container {
        height: 450px;
        max-width: 992px;
        width: 100%;
    }
    .cancel{
        margin-left:950px;
    }
    .change-height{
        height: 40px;
    }
    .button{
        margin-top: -15px;
    }

</style>

