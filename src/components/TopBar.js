import './TopBar.css';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.png';

const TopBar = () => {

  const state = useSelector(state => state.main)
  const dispatch = useDispatch()
  const screen = state.screen;

  const changeScreen = (newScreen) => {
    dispatch({type: "main/updateScreen", payload: newScreen})
  }

  return (
    <div className = "top_bar_background">
      <div className = "top_bar">
        <div className = "top_bar_logo_container">
          <img className = "top_bar_logo" alt = "Logo Icon" src = {logo}/>
        </div>
        

        <div className = "top_bar_menu">
          <div className = {screen === "home" ? "top_bar_button_pressed" : "top_bar_button"}
               onClick={() => changeScreen("home")}>
            <div className = "top_bar_button_text">
              Home
            </div>
          </div>

          <div className = {screen === "instructions" ? "top_bar_button_pressed" : "top_bar_button"}
               onClick={() => changeScreen("instructions")}>
            <div className = "top_bar_button_text">
              Instructions
            </div>
          </div>

          <div className = {screen === "analysis" ? "top_bar_button_pressed" : "top_bar_button"}
               onClick={() => changeScreen("analysis")}>
            <div className = "top_bar_button_text">
              Analysis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default TopBar;
