  import './AnalysisScreen.css';
  import { useSelector, useDispatch } from 'react-redux';
  import React, { useState } from 'react';
  import loadingGif from '../assets/loading.gif';
  const { ipcRenderer } = window.require('electron');
  
  const AnalysisScreen = () => {

    const state = useSelector(state => state.main)
    const dispatch = useDispatch()
    const [csvSmellsName, setCsvSmellsName] = useState(state.csvSmells !== null ? state.csvSmells.name : "File not selected");
    const [csvFlakyName, setCsvFlakyName] = useState(state.csvFlaky !== null ? state.csvFlaky.name : "File not selected");
    const [waitingScreenOn, setWaitingScreenOn] = useState(false);

    const loadSmellCsv = (event) => {
      if (event.target.files.length) {
        dispatch({type: "main/updateCsvSmells", payload: event.target.files[0]})
        setCsvSmellsName(event.target.files[0].name)
      }
    };

    const loadFlakyCsv = (event) => {
      if (event.target.files.length) {
        dispatch({type: "main/updateCsvFlaky", payload: event.target.files[0]})
        setCsvFlakyName(event.target.files[0].name)
      }
    };

    const analyzeCsv = () => {
      if(state.csvSmells !== null && state.csvFlaky !== null)
      {
        const smellsPath = "./src/csv/" + csvSmellsName
        const flakyPath = "./src/csv/" + csvFlakyName
        ipcRenderer.send('run-script', ["get_test_smells.py", smellsPath, flakyPath])
        setWaitingScreenOn(true);
        setTimeout(function(){
          setWaitingScreenOn(false);
        }.bind(this),5000);
        }
    };

    const renderWaitingScreen = () => {
      return(
        <div className = "analysis_waiting_screen">
          <div className="analysis_screen_flex_container">
            <div className="analysis_text">
              Analyzing Projects
            </div>
          </div>
          <div className="analysis_screen_flex_container">
            <div className="analysis_text_small">
              The results will be saved as sfa_results.csv in the csv folder
            </div>
          </div>
          <div className="home_screen_flex_container">
            <img className = "home_screen_icon" alt = "Loading" src = {loadingGif}/>
          </div>
        </div>
      )
    }

    return (
      <div className="analysis_screen">
        <div className="analysis_screen_top">
          <div className="analysis_screen_top_half">
            <div className="analysis_screen_top_half_border">
              <div className="analysis_screen_top_half_content">
                <div className="analysis_text">
                  Test smells file
                </div>
              </div>

              <div className="analysis_screen_top_half_content">
                <div className="analysis_description">
                  Load a valid csv containing the test smell analysis results. It has to be located in the csv folder of this project.
                </div>
              </div>

              <div className="analysis_screen_top_half_content_bottom">
                <div className = "analysis_screen_top_half_content_file">
                  <div className="analysis_description">
                    {csvSmellsName.length > 25 ? csvSmellsName.substring(0, 24) + "..." : csvSmellsName}
                  </div>
                </div>
                <div className="analysis_screen_top_half_content_button">
                  <label htmlFor={'load-button'}>
                      <div className = "load_csv_button">
                        <div className="analysis_description">
                          Upload file
                        </div>
                      </div>
                  </label>
                  <input
                    id="load-button"
                    type="file"
                    name="file"
                    accept=".csv"
                    onChange={loadSmellCsv}
                    style={{ display: "none"}}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="analysis_screen_top_half">
            <div className="analysis_screen_top_half_border">
              <div className="analysis_screen_top_half_content">
                <div className="analysis_text">
                  Flaky tests file
                </div>
              </div>

              <div className="analysis_screen_top_half_content">
                <div className="analysis_description">
                  Load a valid csv containing the flaky tests analysis results. It has to be located in the csv folder of this project.
                </div>
              </div>

              <div className="analysis_screen_top_half_content_bottom">
                <div className = "analysis_screen_top_half_content_file">
                  <div className="analysis_description">
                    {csvFlakyName.length > 25 ? csvSmellsName.substring(0, 24) + "..." : csvFlakyName}
                  </div>
                </div>
                <div className="analysis_screen_top_half_content_button">
                  <label htmlFor={'load-button-2'}>
                      <div className = "load_csv_button">
                        <div className="analysis_description">
                          Upload file
                        </div>
                      </div>
                  </label>
                  <input
                    id="load-button-2"
                    type="file"
                    name="file"
                    accept=".csv"
                    onChange={loadFlakyCsv}
                    style={{ display: "none"}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="analysis_screen_bottom">
          <div className="analyze_csv_button" onClick = {() => analyzeCsv()}>
            <div className="analysis_text">
              Analyze
            </div>
          </div>
        </div>
        {waitingScreenOn && renderWaitingScreen()}
      </div>
    );
  }

  export default AnalysisScreen;
