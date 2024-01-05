let latitude, longitude;
let destination;
import {StatusBar} from "expo-status-bar";
import React, {Component} from "react";
import{
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    Image,
    ScrollView,
    TouchableOpactiy
} from "react-native";
import {Camera} from "expo-camera";
import * as FaceDetector from "expo-face-detector";

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null;
            face: []
        };
        this.onFacesDetected = this.onFacesDetected.bind(this);
    }
}

async componentDidMount(){
    const {status} = await Camera.requestPermissionsAsync();
    this.setState({hasCameraPermission: status === "granted"});
}

onFacesDetected({faces}){
    this.setState({faces:faces});
}

$(document).ready(function () {
    alert("Please allow the device to know your location!")
    initGeolocation();
})

$(function () {
    $("#navigate-button").click(function () {
        window.location.href = `ar_navigation.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
    })
})

function initGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    }
    else {
        alert("Sorry, your browser does not support geolocation services.");
    }
}

function success(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude

    // Initializing Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 16
    });

    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );

    map.on('click', function (e) {
        destination = e.lngLat;
    });

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

    setTimeout(function () {
        $(".mapboxgl-ctrl-icon").click()
    }, 3000)
}