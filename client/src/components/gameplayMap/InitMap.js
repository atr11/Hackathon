// import React, { useEffect, useState, useMemo } from "react"
import {
  GoogleMap,
  Marker
} from "@react-google-maps/api"

const InitMap = ( myCity, myLat, myLng, ) => {
    const myLatLng = { lat: myLat, lng: myLng }
    // const map = new google.maps.Map(document.getElementById("map"), {})
    const map = new GoogleMap(document.getElementById("map"), {})
    // new google.maps.Marker({
    new Marker({
      position: myLatLng,
      map,
      title: myCity,
    })
  }
  export default InitMap