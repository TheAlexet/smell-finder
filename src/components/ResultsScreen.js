  import './ResultsScreen.css';
  import { useSelector, useDispatch } from 'react-redux';
  import React, { useState } from 'react';

  const ResultsScreen = () => {

    const state = useSelector(state => state.main)
    const dispatch = useDispatch()
    const csvResults = state.csvResults
    const tableResults = state.tableResults
    const [csvResultsName, setCsvResultsName] = useState(csvResults !== null ? csvResults.name : "File not selected");
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
      setCsvResultsName("File not selected")
    };

    const parseResults = (string) => {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

      const parsedResults = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });
      dispatch({type: "main/updateTableResults", payload: parsedResults})
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
                  {headerKeys.map((key) => (
                    <th className="results_screen_table_header">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tableResults.map((item) => (
                  <tr key={item.id} className="results_screen_table_row">
                    {Object.values(item).map((val) => (
                      <td className="results_screen_table_text">
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
