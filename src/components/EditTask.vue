<template>
    <div class="edit-task">
        <NavigationBar></NavigationBar>
        <div class="container-fluid">
            <h2>Edit Task</h2>
            <div class="row">

                <div class="col-md-8 col-md-offset-2">
                    <div v-if="submitted">
                        <div class="alert alert-success">
                            <strong>Success!</strong> Your task has added.
                        </div>
                    </div>
                    <input name="todo" class="form-control" placeholder="Enter your task..." v-model="tasks.name" >
                    <br>

                    <div>
                        <h2>Search and add a pin</h2>
                        <label>
                            <gmap-autocomplete
                                    @place_changed="setPlace" class=" change-height" v-model="tasks.place_name">
                            </gmap-autocomplete>
                            &nbsp;
                            &nbsp;
                            <button @click="addMarker" class="btn btn-primary button" >Update Place</button>
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

                    <hr>
                    <button class="btn btn-success pull-right" v-on:click.prevent="postTask" >Update Task</button>

                    <button class="btn btn-danger cancel" v-on:click="cancelTask">Cancel</button>


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
                    return this.tasks.name = '';
                },

                setPlace(place) {
                    this.currentPlace = place;
                    this.tasks.lat = this.currentPlace.geometry.location.lat();
                    this.tasks.lng = this.currentPlace.geometry.location.lng();
                    this.tasks.place_name = this.currentPlace.formatted_address;

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
    .cancel{
        margin-left:975px;
    }
    .vue-map-container {
        height: 450px;
        max-width: 992px;
        width: 100%;
    }
    .change-height{
        height: 40px;
    }
    .button{
        margin-top: -15px;
    }
</style>