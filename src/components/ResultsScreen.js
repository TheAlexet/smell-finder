  import './ResultsScreen.css';
  import { useSelector, useDispatch } from 'react-redux';
  import React, { useState } from 'react';

  const ResultsScreen = () => {

    const state = useSelector(state => state.main)
    const dispatch = useDispatch()
    const csvResults = state.csvResults
    const [tableResults, setTableResults] = useState(state.tableResults)
    const [csvResultsName, setCsvResultsName] = useState(csvResults !== null ? csvResults.name : "File not selected");
    const isHiding = state.hiddenTable
    const fileReader = new FileReader();

    const loadResultsCsv = (event) => {
      if (event.target.files.length) {
        dispatch({type: "main/updateCsvResults", payload: event.target.files[0]})
        setCsvResultsName(event.target.files[0].name)

        fileReader.onload = function (event) {
          const text = event.target.result;
          parseResults(text)
        };

        fileReader.readAsText(event.target.files[0]);
      }
    };

    const backButton = () => {
      dispatch({type: "main/updateCsvResults", payload: null})
      dispatch({type: "main/updateTableResults", payload: []})
      setCsvResultsName("File not selected")
      dispatch({type: "main/updateHiddenTable", payload: false})
    };

    const hideButton = () => {
      if(!isHiding)
      {
        let smellsFound = [false, false, false, false, false, false, false, false, false, false, false,
                           false, false, false, false, false, false, false, false, false, false]
        const smellsName = ["Assertion Roulette", "Conditional Test Logic", "Constructor Initialization", "Default Test", "Dependent Test", "Duplicate Assert", "Eager Test", "EmptyTest", "Exception Catching Throwing", "General Fixture", "IgnoredTest",
                            "Lazy Test", "Magic Number Test", "Mystery Guest", "Print Statement", "Redundant Assertion", "Resource Optimism", "Sensitive Equality", "Sleepy Test", "Unknown Test", "Verbose Test"]
        tableResults.map((row) => {
          for(var i = 3; i < Object.values(row).length; i++)
          {
            if(Object.values(row)[i] === 1 && smellsFound[i - 3] === false) smellsFound[i - 3] = true
          }
        })
        
        for(var i = 0; i < tableResults.length; i++)
        {
          for(var j = 3; j < 24; j++)
          {
            if(!smellsFound[j - 3])
            {
              delete tableResults[i][smellsName[j - 3]]
            }
          }
        }
        dispatch({type: "main/updateHiddenTable", payload: true})
      }
      else
      {

      }
    };

    const parseResults = (string) => {
      let csvHeader = string.slice(0, string.indexOf("\n")).split(",");
      csvHeader[csvHeader.length - 1] = csvHeader[csvHeader.length - 1].replace(/(\r\n|\n|\r)/gm, "")
      let csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
      csvRows.pop()
      const parsedResults = csvRows.map(i => {
        const values = i.split(",");
        values[values.length - 1] = values[values.length - 1].replace(/(\r\n|\n|\r)/gm, "")
        const obj = csvHeader.reduce((object, header, index) => {
          if(index < 2) {
            object[header] = values[index];
          }
          else
          {
            object[header] = Number(values[index]);
          }
          return object;
        }, {});
        return obj;
      });
      dispatch({type: "main/updateTableResults", payload: parsedResults})
      setTableResults(parsedResults)
    };

    const renderLoadCsv = () => {
      return(
        <div className="results_screen_box">
          <div className="results_screen_flex_container">
            <div className="results_screen_text">
              Results view
            </div>
          </div>

          <div className="results_screen_flex_container">
            <div className="results_screen_text_small">
              Upload here the csv with the results from the analysis.
            </div>
          </div>

          <div className="results_screen_load_bottom">
            <div className = "results_screen_right_container">
              <div className="results_screen_text_small">
                {csvResultsName.length > 25 ? csvResultsName.substring(0, 24) + "..." : csvResultsName}
              </div>
            </div>
            <div className="results_screen_left_container">
              <label htmlFor={'load-button'}>
                  <div className = "results_screen_upload_button">
                    <div className="results_screen_text_normal">
                      Upload file
                    </div>
                  </div>
              </label>
              <input
                id="load-button"
                type="file"
                name="file"
                accept=".csv"
                onChange={loadResultsCsv}
                style={{ display: "none"}}
              />
            </div>
          </div>
        </div>
      )
    }

    const headerKeys = Object.keys(Object.assign({}, ...tableResults));

    const renderResults = () => {
      return(
        <div className="results_screen_table">
          <div className="results_screen_table_top">
            <div className="results_screen_left_container">
              <div className="results_screen_text_normal">
                Results from {csvResults.name}
              </div>
            </div>

            <div className="results_screen_right_container">
              <div className={!isHiding ? "results_screen_back_button" : "results_screen_pressed_button"} onClick = {() => hideButton()}>
                <div className="results_screen_text_small_button">
                  Hide columns without smells
                </div>
              </div>
            </div>

            <div className="results_screen_right_container">
              <div className="results_screen_back_button" onClick = {() => backButton()}>
                <div className="results_screen_text_normal">
                  Back
                </div>
              </div>
            </div>
          </div>

          <div className="results_screen_table_bottom">
            <table>
              <thead>
                <tr key={"header"} className="results_screen_table_row">
                  {headerKeys.map((key, index) => (
                    <th key = {"key_" + index} className="results_screen_table_header">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tableResults.map((item) => (
                  <tr key={item.id} className="results_screen_table_row">
                    {Object.values(item).map((val, index) => (
                      <td key = {"val_" + index} className={val === 1 ? "results_screen_table_text_green" : "results_screen_table_text"}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    return (
      <div className="results_screen">
        {csvResults === null && renderLoadCsv()}
        {csvResults !== null && renderResults()}
      </div>
    );
  }

  export default ResultsScreen;
