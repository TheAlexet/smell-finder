import './MainScreen.css';
import { useSelector, useDispatch } from 'react-redux';

const MainScreen = () => {

  const state = useSelector(state => state.main)
  const dispatch = useDispatch()

  const loadSmellCsv = (event) => {
    console.log(event.target.files[0])
    console.log("Hola")
  };

  const loadFlakyCsv = (event) => {
    console.log(event.target.files[0])
  };

  return (
    <div className="main_screen">
      <div className="main_screen_top">
        <div className="main_screen_top_half">
          <div className="main_screen_top_half_border">
            <div className="main_screen_top_half_content">
              <div className="main_text">
                Test smells file
              </div>
            </div>

            <div className="main_screen_top_half_content">
              <div className="main_description">
                Load a valid csv containing the test smell analysis results.
              </div>
            </div>

            <div className="main_screen_top_half_content_button">
              <label htmlFor={'load-button'}>
                  <div className = "load_csv_button">
                    <div className="main_description">
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

        <div className="main_screen_top_half">
          <div className="main_screen_top_half_border">
            <div className="main_screen_top_half_content">
              <div className="main_text">
                Flaky tests file
              </div>
            </div>

            <div className="main_screen_top_half_content">
              <div className="main_description">
                Load a valid csv containing the flaky tests analysis results.
              </div>
            </div>

            <div className="main_screen_top_half_content_button">
              <label htmlFor={'load-button'}>
                  <div className = "load_csv_button">
                    <div className="main_description">
                      Upload file
                    </div>
                  </div>
              </label>
              <input
                id="load-button"
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

      <div className="main_screen_bottom">
        <div className="analyze_csv_button">
          <div className="main_text">
            Analyze
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
