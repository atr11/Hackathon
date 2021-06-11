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
  width: "50vw",
  height: "685px",
  border: "4px solid #05386B",
  borderRadius: "20px",
  minWidth: "575px"
}
const center = {
  lat: 51.01,
  lng: -114.1
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

export default function GardenMap({
  isFormDisplayed,
  formCoordinates,
  setFormCoordinates
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })

  // This is passed through the first Marker array
  const loadingMessage = [{name: 'Loading...', address: "This won't take long!", "coordinates":{"lat":"0","lng":"0"}}]
  const [gardenList, setGardenList] = useState(loadingMessage)
  
  useEffect(() => {
    const getAllGardens = async () => {
      let fetchUrl = "/api/garden/get"
      let response = await fetch(fetchUrl)
      let resObject = await response.json()
      let listResult = resObject.gardenList

      setGardenList(listResult)
    }
    getAllGardens()
  }, [])

  // Prevent re-rendering of data
  const data = useMemo(() => gardenList, [gardenList])

  const onMapClick = React.useCallback(
    (event) => {
      setFormCoordinates({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
    },
    [setFormCoordinates]
  )

  useEffect(() => {
    if (isFormDisplayed) {
      setFormCoordinates({
        lat: 0,
        lng: 0
      })
    }
    // eslint-disable-next-line
  }, [isFormDisplayed])

  const [selected, setSelected] = React.useState(null)

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Maps"
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10.5}
        center={center}
        options={options}
        onClick={isFormDisplayed ? onMapClick : null}
      >
        {isFormDisplayed ? (
          <Marker
            key={"created_marker"}
            position={{ lat: formCoordinates.lat, lng: formCoordinates.lng }}

            /* icon={{
                    url: "/vegetables.svg",
                    scaledSize: new window.google.maps.Size(30,30),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(15,15)
                }} */
          />
        ) : null}

        {data.map(function (marker, index) {
          return (
            <Marker
              key={marker.name}
              position={{lat: parseFloat(marker.coordinates.lat), lng: parseFloat(marker.coordinates.lng)}}
              onMouseOver={() => {
                setSelected(marker)
              }}
            />
          )
        })}

        {selected ? (
          <InfoWindow
            position={{lat: parseFloat(selected.coordinates.lat), lng: parseFloat(selected.coordinates.lng)}}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div style={{ fontWeight: "bold" }}>{selected.name}</div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}
