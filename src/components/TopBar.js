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
          <div className = {screen === "main" ? "top_bar_button_pressed" : "top_bar_button"}
               onClick={() => changeScreen("main")}>
            <div className = "top_bar_button_text">
              Main
            </div>
          </div>

          <div className = {screen === "about" ? "top_bar_button_pressed" : "top_bar_button"}
               onClick={() => changeScreen("about")}>
            <div className = "top_bar_button_text">
              About
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default TopBar;
