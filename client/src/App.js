import './App.css'
import React, { useState, useEffect } from 'react'
import GameplayMap from './components/gameplayMap/GameplayMap'
import DisplayText from './components/DisplayText'

function App () {

  // Define State Variables
  const [locationList, setLocationList] = useState ([])
  const [currentLocation,setCurrentLocation] = useState("Calgary")
  const [itemsToMap,setItemsToMap] = useState([])
  const [moveCounter,setMoveCounter] = useState(0)
  
  // On first load, retrieve all story locations from database.
  useEffect(() => { 
    const getLocations = async () => {
      let response = await fetch('/api/location')
      let data = await response.json()
      setLocationList(data)
    }
    getLocations()
  }, [])

  return(
    <div className="main-background">
        <div className="map-and-story">
          <div className="intro">
            <div className="intro-header-container">
              <h1 className="intro-header">Global Predator</h1>
            </div>
                <div className="intro-tagline">
                    <p>
                    You thought a peaceful life lay ahead but peace doesn't exist when other people's thoughts drift through your mind
                    </p>
                </div>
          </div>
          <GameplayMap />
        </div>
        <div>
            <div>
              <DisplayText locationList = {locationList} currentLocation = {currentLocation} />
            </div>
            <div>
              <ContinueStory itemsToMap = {itemsToMap}/>
            </div>
            <button> Start Over! </button>
        </div>
    </div>    
  )  
}

export default App

