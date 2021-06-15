import './App.css'
import React, { useState, useEffect } from 'react'
import GameplayMap from './components/gameplayMap/GameplayMap'
import DisplayText from './components/DisplayText'


function App () {

  // Define State Variables
  const [moveCounter,setMoveCounter] = useState(0)
  const [rank,setRank] = useState("Amateur")
  const [locationList, setLocationList] = useState ([])
  const [currentLocation,setCurrentLocation] = useState("Calgary")
  const [itemsToMap,setItemsToMap] = useState([
        {
          city : "Calgary",
          lat : 51.0092642,
          lng : -114.3885024
        },
        {
          city : "Mexico City",
          lat : 17.9459524,
          lng : -100.089394
        },
      ])


  const resetGame = () => {
    setMoveCounter(0)
    setRank("Amateur")
    setLocationList([])
    setCurrentLocation("Calgary")
    setItemsToMap([
      {
        city : "Calgary",
        lat : 51.0092642,
        lng : -114.3885024
      },
      {
        city : "Mexico City",
        lat : 17.9459524,
        lng : -100.089394
      }
    ])
  }
    
    
  // On first load, retrieve all story locations from database.
  useEffect(() => { 
    const getLocations = async () => {
      let response = await fetch('/api/location')
      let data = await response.json()
      setLocationList(data)
    }
    getLocations()
  }, [])

  // Whenever Current Location changes, update the list of itemsToMap if needed
  useEffect(() => {
    const loadNewMapItems = () => {
      switch(currentLocation) {
        case "Mexico City": {
          let index = 0
          index = locationList.map(function(e) { return e.city; }).indexOf('Mexico City')
          let nextCityIndex = index + 1
          let nextCityName = locationList[nextCityIndex].city
          let nextCityLat = locationList[nextCityIndex].lat
          let nextCityLng = locationList[nextCityIndex].lng
          let counter = 0
          let cityExists = false
          while (counter <= itemsToMap.sizeof && cityExists === false){
            if (itemsToMap[counter].city === nextCityName) {
              cityExists = true
            }
            counter ++
          }
          if (cityExists === false){
            let objectToPush = {
              city : nextCityName,
              lat : nextCityLat,
              lng : nextCityLng
            }           
            // setItemsToMap(itemsToMap.push(objectToPush))
            setItemsToMap(itemsToMap => [...itemsToMap, objectToPush])
          }
        }
        break;

        case "Lima": {
          let index = 0
          index = locationList.map(function(e) { return e.city; }).indexOf('Lima')
          let outerCount = 0
          let nextCityIndex = 0
          let nextCityName = ""
          let nextCityLat = 0
          let nextCityLng = 0
          let counter = 0
          let cityExists = false
          nextCityIndex = index + 1

          while (outerCount < 3) {
            nextCityName = locationList[nextCityIndex].city
            nextCityLat = locationList[nextCityIndex].lat
            nextCityLng = locationList[nextCityIndex].lng
            counter = 0
            cityExists = false
            while (counter <= itemsToMap.sizeof && cityExists === false){
              if (itemsToMap[counter].city === nextCityName) {
                cityExists = true
              }
              counter ++
            }
            if (cityExists === false){
              let objectToPush = {
                city : nextCityName,
                lat : nextCityLat,
                lng : nextCityLng
              }           
              // setItemsToMap(itemsToMap.push(objectToPush))
              setItemsToMap(itemsToMap => [...itemsToMap, objectToPush])
            }
            nextCityIndex = nextCityIndex + 1
            outerCount ++
          }
        }
          break;

        case "Moscow": {
          let index = 0
          index = locationList.map(function(e) { return e.city; }).indexOf('Moscow')
          let outerCount = 0
          let nextCityIndex = 0
          let nextCityName = ""
          let nextCityLat = 0
          let nextCityLng = 0
          let counter = 0
          let cityExists = false
          nextCityIndex = index + 1

          while (outerCount < 2) {
            nextCityName = locationList[nextCityIndex].city
            nextCityLat = locationList[nextCityIndex].lat
            nextCityLng = locationList[nextCityIndex].lng
            counter = 0
            cityExists = false
            while (counter <= itemsToMap.sizeof && cityExists === false){
              if (itemsToMap[counter].city === nextCityName) {
                cityExists = true
              }
              counter ++
            }
            if (cityExists === false){
              let objectToPush = {
                city : nextCityName,
                lat : nextCityLat,
                lng : nextCityLng
              }           
              // setItemsToMap(itemsToMap.push(objectToPush))
              setItemsToMap(itemsToMap => [...itemsToMap, objectToPush])
            }
            nextCityIndex = nextCityIndex + 1
            outerCount ++
          }
        }
          break;
      
        case "Sydney": {
          setRank("Amateur")
          setItemsToMap([])
        }
          break;

        case "London": {
          if (moveCounter < 5) {
            setRank("Jedi Master")
          }
          else {
            setRank("Padawan")
          }
          setItemsToMap([])
        }
          break;
        

        default: {}
          // not understood, don't add any locations to map
      }
    }
    loadNewMapItems()
  }, [currentLocation])


  return(
    <div className="main-background">
      <div className="intro">
        <div className="intro-header-container">
          <h1 className="intro-header">Global Predator</h1>
        </div>
        <div className="intro-tagline">
          <p className="a">
            You thought a peaceful life lay ahead but peace doesn't exist when other people's thoughts drift through your mind
          </p>
        </div>             
      </div>
      <div>
        <div className="map-display-container">
          <div className= "map-and-story">
            <GameplayMap itemsToMap={itemsToMap} setCurrentLocation={setCurrentLocation} moveCounter={moveCounter} setMoveCounter={setMoveCounter} />
            <DisplayText locationList = {locationList} currentLocation = {currentLocation} />
          </div>
          <div className="rank-container">
            RANKING: {rank}
            <div>
              MOVES: {moveCounter}
            </div>
          </div>
          <div className="reset-game">
            <button onClick={resetGame}> Start Over! </button>
          </div>
        </div>
      </div>    
    </div>    
  )  
}

export default App