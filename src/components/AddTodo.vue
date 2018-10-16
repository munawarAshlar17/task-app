<template>
    <div class="add-todo-list  bg-grey-lightest text-justify font-sans">
        <NavigationBar></NavigationBar>
        <div class="container mx-auto">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h1 class="text-center">
                        Add Todo List
                    </h1>
                    <div v-if="submitted">
                        <div class="bg-green-lightest border border-green-light text-green-dark px-4 py-3 rounded relative" role="alert">
                            <strong class="font-bold">Success!</strong>
                            <span class="block sm:inline">Task added.</span>
                            <span class="absolute pin-t pin-b pin-r px-4 py-3">
                            <svg class="fill-current h-6 w-6 text-green" viewBox="0 0 20 20"></svg>
                             </span>
                        </div>
                    </div>
                    <br>
                    <label class="block text-grey-darker text-sm font-bold mb-2" >
                        Enter Task
                    </label>
                    <input name="todo" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your task..." v-model="tasks.name" >
                    <br>




                    <div>
                        <br>
                        <label class="block text-grey-darker text-sm font-bold mb-2" >
                            Task Location
                        </label>
                        <label>
                            <gmap-autocomplete
                                    @place_changed="setPlace" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline change-height">
                            </gmap-autocomplete>
                            <br>
                            <br>
                            <button @click="addMarker" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full float-right " >Add Place</button>
                        </label>
                        <br>

                    </div>
                    <br>
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

                    <hr>

                    <button class="bg-green-dark hover:bg-green-darker text-white font-bold py-2 px-4 rounded-full float-right mx-2" v-on:click.prevent="postTask" >Add Task</button>

                    <button class="bg-red-dark hover:bg-red-darker text-white font-bold py-2 px-4 rounded-full float-right" v-on:click="cancelTask">Cancel</button>

                </div>
            </div>
        </div>
        <br>
        <br>
        <br>
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
                    this.tasks.place_name='';
                });
            },
            cancelTask() {
                this.tasks.name = '';
                this.tasks.place_name='';

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


    .change-height{
        height: 35px;
    }


</style>

