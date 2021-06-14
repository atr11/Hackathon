import React from "react"
import "./DisplayText.css"

const DisplayText = ( {locationList, currentLocation} ) => {

    // Retrieve 'description' of location provided

    // let storyText = locationList[0].description
    let storyText = ""
    let index = 0
    index = locationList.map(function(e) { return e.city; }).indexOf(currentLocation)
    if (index > -1) {
        storyText = locationList[index].description
      }

    return(
        <div className="DisplayText">
            {storyText}
        </div>
    )
}

export default DisplayText