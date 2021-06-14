import React, { useEffect, useState, useMemo } from "react"
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript
} from "@react-google-maps/api"
import mapStyles from "./mapStyles"

const libraries = ["places"]
const mapContainerStyle = {
  width: "70vw",
  height: "500px",
  border: "4px solid #BB000E",
  minWidth: "575px"
}
const center = {
  lat: 0,
  lng: -114.1
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

export default function GameplayMap( {itemsToMap} ) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })

  // This is passed through the first Marker array
  const loadingMessage = useMemo(() => [{name: 'Loading...', address: "This won't take long!", "coordinates":{"lat":"0","lng":"0"}}], [])
  const [crimeSceneList, setCrimeSceneList] = useState(loadingMessage)
  
  // useEffect(() => {
  //   const getAllGardens = async () => {
  //     let fetchUrl = "/api/garden/get"
  //     let response = await fetch(fetchUrl)
  //     let resObject = await response.json()
  //     let listResult = resObject.gardenList

  //     setCrimeSceneList(listResult)
  //   }
  //   getAllGardens()
  // }, [])

  // Prevent re-rendering of data
  const data = useMemo(() => crimeSceneList, [crimeSceneList])

  const onMapClick = React.useCallback((event) => {
    console.log('onMapClick event:', event.latLng)
    
    setCrimeSceneList([
      ...crimeSceneList, 
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    ])
    
  }, [setCrimeSceneList, crimeSceneList]
  )

  const [selected, setSelected] = React.useState(null)

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Maps"

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={1}
      center={center}
      options={options}
      onClick={onMapClick}
    >
      
      {data.map(function (marker, index) {
        return (
          <Marker
            key={index}
            position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}
            onMouseOver={() => {
              setSelected(marker)
            }}
          />
        )
      })}
      {selected 
        ? (
          <InfoWindow
            position={{lat: parseFloat(selected.lat), lng: parseFloat(selected.lng)}}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div style={{ fontWeight: "bold" }}>Body Found!</div>
          </InfoWindow>
      ) : null
      }
    </GoogleMap> 
  )
}
