import './InstructionsScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import Papa from 'papaparse';

const InstructionsScreen = () => {

  const state = useSelector(state => state.main)
  const dispatch = useDispatch()
  const [csvFlakyDownloadedName, setCsvFlakyDownloadedName] = useState(state.csvFlakyDownloaded !== null ? state.csvFlakyDownloaded.name : "File not selected");

  const loadFlakyDownloadedCsv = (event) => {
    if (event.target.files.length) {
      dispatch({type: "main/updateCsvFlakyDownloaded", payload: event.target.files[0]})
      setCsvFlakyDownloadedName(event.target.files[0].name)
    }
  };

  const parseFlakyDownloaded = () => {
    if (state.csvFlakyDownloaded !== null) {
      let parsedValues = []
      let parsedRows = ["Project name", "Test method name" , "Is flaky"]

      Papa.parse(state.csvFlakyDownloaded, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          results.data.map((element) => {
            parsedValues.push([element.Project, element.Test, element.IsFlaky])
          });
          console.log(parsedValues)
          const parsedCsv = Papa.unparse(parsedValues)
          console.log(parsedCsv)
          const blob = new Blob([parsedCsv]);
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob, { type: 'text/plain' });
          a.download = 'CSV Export File';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
      })
      
    }
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
            To do so, select the csv and click on the parse button.
          </div>
          <div className="instructions_screen_text">
            The resulting file, test_results_parsed, will be saved in the results folder.
          </div>
          <div className="instructions_screen_text">
            Step 2 can be skipped if you already provide a valid csv.
          </div>
        </div>
      </div>
      <div className="instructions_screen_box_2_separator">
        <div className="instructions_screen_box_2_left_separator">
          <div className = "instructions_screen_right_container">
            <div className = "instructions_screen_text">
              {csvFlakyDownloadedName}
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

  return (
    <div className="instructions_screen">
      {renderPage1()}
      {renderPage2()}
    </div>
  );
}

export default InstructionsScreen;
