<template>
    <div class="edit-task bg-grey-lightest text-justify font-sans">
        <NavigationBar></NavigationBar>
        <div class="container mx-auto px-4">
            <br>
            <h2 class="text-center">Edit Task</h2>
            <div class="row">


                    <div v-if="submitted">
                        <div class="bg-green-lightest border border-green-light text-green-dark px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Success!</strong>
                        <span class="block sm:inline">Task added.</span>
                        <span class="absolute pin-t pin-b pin-r px-4 py-3">
                            <svg class="fill-current h-6 w-6 text-green" viewBox="0 0 20 20"></svg>
                             </span>
                    </div>
                    </div>
                    <label class="block text-grey-darker text-sm font-bold mb-2" >
                        Your Task
                    </label>
                    <input name="todo" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your task..." v-model="tasks.name" >

                    <div>
                        <br>
                        <label class="block text-grey-darker text-sm font-bold mb-2" >
                            Task Location
                        </label>
                        <label>
                            <gmap-autocomplete class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline change-height"
                                    @place_changed="setPlace"  v-model="tasks.place_name">
                            </gmap-autocomplete>
                            <br>
                            <br>
                            <label class="block text-grey-darker text-sm font-bold mb-2" >
                                Related Map
                            </label>
                            <!--<button @click="addMarker" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full float-right" >Change Place</button>-->
                        <br>
                        </label>


                    </div>

                    <gmap-map
                            :center="center"
                            :zoom="20"
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
                    <button class="bg-green-dark hover:bg-green-darker text-white font-bold py-2 px-4 rounded-full float-right mx-2" v-on:click.prevent="postTask" >Update Task</button>

                    <button class="bg-red-dark hover:bg-red-darker text-white font-bold py-2 px-4 rounded-full float-right" v-on:click="cancelTask">Cancel</button>


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
        components: {Footer, NavigationBar},
        name: "EditTask",
        data() {
            return {
                submitted: false,
                id: this.$route.params.id,
                tasks: {},


                center: {lat: 37.5, lng: 39.45},
                markers: [],
                places: [],
                currentPlace: null

            }
        },
        created() {
            this.$http.get('https://task-219514.firebaseio.com/tasks/' + this.id + '.json').then(function (data) {
                return data.json();

            }).then(function (data) {
                this.tasks = data;

                this.center.lat = this.tasks.lat;
                this.center.lng = this.tasks.lng;
                const marker = {
                    lat: this.tasks.lat,
                    lng: this.tasks.lng,
                };
                this.markers.push({position: marker});



            })
        },
        methods:
            {
                postTask() {
                    this.$http.put('https://task-219514.firebaseio.com/tasks/' + this.id + '.json', {
                        name: this.tasks.name,
                        lat: this.tasks.lat,
                        lng: this.tasks.lng,
                        place_name: this.tasks.place_name,
                    }).then(function () {
                        this.submitted = true;

                    });
                },
                cancelTask() {
                     this.tasks.name = '';
                     this.tasks.place_name='';
                },

                setPlace(place) {
                    this.currentPlace = place;
                    this.tasks.lat = this.currentPlace.geometry.location.lat();
                    this.tasks.lng = this.currentPlace.geometry.location.lng();
                    this.tasks.place_name = this.currentPlace.formatted_address;
                    this.addMarker();

                },
                addMarker() {
                    if (this.currentPlace) {
                        const marker = {
                            lat: this.currentPlace.geometry.location.lat(),
                            lng: this.currentPlace.geometry.location.lng()
                        };
                        this.markers.push({position: marker});
                        this.places.push(this.currentPlace);
                        this.center = marker;
                        this.currentPlace = null;
                    }
                },
                geolocate: function () {
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