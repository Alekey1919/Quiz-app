import Home from "./pages/home/Home";
import sound from "./assets/images/sound.png";
import mute from "./assets/images/mute.png";
import useApp from "./useApp";

function App() {
  const { isSoundOn, toggleSound } = useApp();

  return (
    <div className="app">
      <button className="sound" onClick={toggleSound}>
        <img src={isSoundOn ? sound : mute} alt="Hola" />
      </button>
      <Home isSoundOn={isSoundOn} />
    </div>
  );
}

export default App;
