import './App.css';
import GameplayMap from './components/gameplayMap/GameplayMap';


function App () {
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
            <button> Start </button>
            <div>
                <p> Story text can go here</p>
            </div>
        </div>
    </div>    
  )  
}

export default App;

