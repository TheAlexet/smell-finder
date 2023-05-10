import './HomeScreen.css';
import logo from '../assets/logo_2.png';
import smellsIcon from '../assets/smells_icon.png';
import flakyIcon from '../assets/flaky_icon.png';
import alejandro from '../assets/alejandro.png';

const HomeScreen = () => {
  return (
    <div className="home_screen">
      <div className="home_screen_box">
        <div className="home_screen_flex_container">
          <div className="home_screen_text">
            Smell Flaky Analyzer is a tool used for the analysis of test smells and flaky tests in software projects.
          </div>
        </div>
        <div className="home_screen_flex_container">
          <img className = "home_screen_logo" alt = "Logo Icon" src = {logo}/>
        </div>
      </div>

      <div className="home_screen_box">
        <div className="home_screen_flex_container">
            <img className = "home_screen_icon" alt = "Smells Icon" src = {smellsIcon}/>
        </div>
        <div className="home_screen_flex_container">
          <div className="home_screen_text">
            During the implementation of test code, test smells arise, which are poor programming practices present in the test cases. Because of that, not only the effectiveness of the tests is affected, but also the maintenance and readability.
          </div>
        </div>
        
      </div>

      <div className="home_screen_box">
        <div className="home_screen_flex_container">
          <div className="home_screen_text">
            In addition, some tests may have non-deterministic outcomes. These tests are called flaky and often lead to confusion and unreliable results.
          </div>
        </div>
        <div className="home_screen_flex_container">
          <img className = "home_screen_icon" alt = "Flaky Icon" src = {flakyIcon}/>
        </div>
      </div>

      <div className="home_screen_box_2">
        <div className="home_screen_box_2_separator">
          <div className="home_screen_flex_container">
            <div>
              <div className="home_screen_text_small">
                This app has been developed by Alejandro Vicent Micó, with the advice of:
              </div>
            </div>
          </div>
          <div className="home_screen_flex_container">
            <img className = "home_screen_alejandro" alt = "Alejandro" src = {alejandro}/>
          </div>
        </div>
        <div className="home_screen_flex_container_left">
          <div>
            <div className="home_screen_text_small">
              Professor Shingo Takada
            </div>
            <div className="home_screen_text_small">
              Keio University, Japan
            </div>
          </div>
        </div>
        <div className="home_screen_flex_container_left">
          <div>
            <div className="home_screen_text_small">
              Professor Manuela Albert Albiol
            </div>
            <div className="home_screen_text_small">
              Universitat Politècnica de València, Spain
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
