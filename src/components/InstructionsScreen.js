import './InstructionsScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import loadingGif from '../assets/loading.gif';
const { ipcRenderer } = window.require('electron');

const InstructionsScreen = () => {

  const state = useSelector(state => state.main)
  const dispatch = useDispatch()
  const [csvFlakyDownloadedName, setCsvFlakyDownloadedName] = useState(state.csvFlakyDownloaded !== null ? state.csvFlakyDownloaded.name : "File not selected");
  const [waitingScreenOn, setWaitingScreenOn] = useState(false);

  const loadFlakyDownloadedCsv = (event) => {
    if (event.target.files.length) {
      dispatch({type: "main/updateCsvFlakyDownloaded", payload: event.target.files[0]})
      setCsvFlakyDownloadedName(event.target.files[0].name)
    }
  };

  const parseFlakyDownloaded = () => {
    if (state.csvFlakyDownloaded !== null) {
      const csvPath = "./src/csv/" + csvFlakyDownloadedName
      ipcRenderer.send('run-script', ["get_test_flakiness.py", csvPath])
    }
  };

  const runJNose = async() => {
    ipcRenderer.send('run-script', ["run_jnose.py"])
    setWaitingScreenOn(true);
    setTimeout(function(){
      setWaitingScreenOn(false);
      window.open("http://127.0.0.1:8080", "_blank", "noreferrer")
    }.bind(this),5000);
  };

  const renderPage1 = () => {
    return(
      <div className="instructions_screen_box">
      <div className="instructions_screen_title_container">
          <div className="instructions_screen_title">
            Step 1:
          </div>
      </div>
      <div className="instructions_screen_left_container">
        <div>
          <div className="instructions_screen_text">
            Obtain a csv file containing the flaky tests with the following format:
          </div>
          <div className="instructions_screen_text">
            ProjectName MethodName IsFlaky
          </div>
          <div className="instructions_screen_text">
            Example: my_project my_test_method 0
          </div>
          <div className="instructions_screen_text">
            0 stands for "non-flaky" and 1 stands for "flaky"
          </div>
        </div>
      </div>
      <div className="instructions_screen_flex_container">
        <div className="instructions_screen_text">
          FlakeFlagger provides a dataset named test_results.csv that can be downloaded from the following page: 
        </div>
      </div>
      <div className="instructions_screen_flex_container">
        <a className="instructions_screen_button"
           href="https://zenodo.org/record/5014076#.ZFtf2HZBzce"
           target="_blank">
          <div className="instructions_screen_text">
            Flaky dataset
          </div>  
        </a>
      </div>
    </div>
    )
  }

  const renderPage2 = () => {
    return(
      <div className="instructions_screen_box_2">
      <div className="instructions_screen_title_container">
          <div className="instructions_screen_title">
            Step 2:
          </div>
      </div>
      <div className="instructions_screen_left_container">
        <div>
          <div className="instructions_screen_text">
            The downloaded file will have to be parsed for matching the desired input format.
          </div>
          <div className="instructions_screen_text">
            To do so, put the file in the csv folder, upload it and click on the parse button.
          </div>
          <div className="instructions_screen_text">
            The resulting file, test_results_parsed, will be saved in the csv folder.
          </div>
          <div className="instructions_screen_text">
            Step 2 can be skipped if you already have a valid csv.
          </div>
        </div>
      </div>
      <div className="instructions_screen_box_2_separator">
        <div className="instructions_screen_box_2_left_separator">
          <div className = "instructions_screen_right_container">
            <div className = "instructions_screen_text">
              {csvFlakyDownloadedName.length > 25 ? csvFlakyDownloadedName.substring(0, 24) + "..." : csvFlakyDownloadedName}
            </div>
          </div>
          <div className="instructions_screen_content_button">
            <label htmlFor={'flaky-downloaded-button'}>
                <div className = "instructions_screen_button_2">
                  <div className="instructions_screen_text">
                    Upload file
                  </div>
                </div>
            </label>
            <input
              id="flaky-downloaded-button"
              type="file"
              name="file"
              accept=".csv"
              onChange={loadFlakyDownloadedCsv}
              style={{ display: "none"}}
            />
          </div>
        </div>
        <div className = "instructions_screen_flex_container">
          <div className = "instructions_screen_button_3" onClick = {() => parseFlakyDownloaded()}>
            <div className="instructions_screen_text">
              Parse file
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  const renderPage3 = () => {
    return(
      <div className="instructions_screen_box_3">
      <div className="instructions_screen_title_container">
          <div className="instructions_screen_title">
            Step 3:
          </div>
      </div>
      <div className="instructions_screen_left_container">
        <div>
          <div className="instructions_screen_text">
            Obtain a csv file containing the test smells with the JNose tool.
          </div>
          <div className="instructions_screen_text">
            Run the tool with the following button and follow these steps:
          </div>
          <div className="instructions_screen_text">
            1. Go to the "Projects" tab and clone a project by providing a github url.
          </div>
          <div className="instructions_screen_text">
            2. Go to the "By TestSmells" tab and analyze the project you want.
          </div>
          <div className="instructions_screen_text">
            3. When the bar reaches 100% click on the yellow button next to it.
          </div>
          <div className="instructions_screen_text">
            4. Click on "Export CSV" and save the file in the csv folder of the project.
          </div>
        </div>
      </div>
      <div className="instructions_screen_flex_container">
        <div className = "instructions_screen_button_4" onClick = {() => runJNose()}>
          <div className="instructions_screen_text">
            Run JNose
          </div>
        </div>
      </div>
    </div>
    )
  }

  const renderWaitingScreen = () => {
    return(
      <div className = "instructions_waiting_screen">
        <div className="instructions_screen_flex_container">
          <div className="instructions_screen_text">
            Loading JNose
          </div>
        </div>
        <div className="home_screen_flex_container">
          <img className = "home_screen_icon" alt = "Loading" src = {loadingGif}/>
        </div>
      </div>
    )
  }

  return (
    <div className="instructions_screen">
      {renderPage1()}
      {renderPage2()}
      {renderPage3()}
      {waitingScreenOn && renderWaitingScreen()}
    </div>
  );
}

export default InstructionsScreen;
