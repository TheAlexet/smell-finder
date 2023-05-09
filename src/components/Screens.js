import './Screens.css';
import { useSelector } from 'react-redux';
import MainScreen from './MainScreen.js'
import AboutScreen from './AboutScreen.js'

const Screens = () => {

  const state = useSelector(state => state.main)
  const screen = state.screen;

  return (
    <div className="screens">
      {screen === "main" && <MainScreen/>}
      {screen === "about" && <AboutScreen/>}
    </div>
  );
}

export default Screens;
