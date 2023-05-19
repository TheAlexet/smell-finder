import './StatsScreen.css';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsScreen = () => {

  const state = useSelector(state => state.main)
  const tableResults = state.tableResults
  const [methods, setMethods] = useState(0)
  const [smellyMethods, setSmellyMethods] = useState(0)
  const [flakyMethods, setFlakyMethods] = useState(0)
  const [smellyFlakyMethods, setSmellyFlakyMethods] = useState(0)
  const [totalTestSmells, setTotalTestSmells] = useState(0)
  const [testSmells, setTestSmells] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [totalTestSmellsInFlakyMethods, setTotalTestSmellsInFlakyMethods] = useState(0)
  const [testSmellsInFlakyMethods, setTestSmellsInFlakyMethods] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    if(tableResults.length > 0)
    {
      setMethods(tableResults.length)
      setSmellyMethods(calculateSmellyMethods)
      setFlakyMethods(calculateFlakyMethods)
      setSmellyFlakyMethods(calculateSmellyFlakyMethods)
      setTotalTestSmells(calculateTotalTestSmells)
      setTestSmells(calculateTestSmells)
      setTotalTestSmellsInFlakyMethods(calculateTotalTestSmellsInFlakyMethods)
      setTestSmellsInFlakyMethods(calculateTestSmellsInFlakyMethods)
    }
  });

  const calculateSmellyMethods = () => {
    let foundSmellyMethods = 0
    tableResults.map((method) => {
      let isSmelly = false
      for(var i = 3; i < Object.values(method).length; i++)
      {
        if(Number(Object.values(method)[i]) === 1 && !isSmelly)
        {
            isSmelly = true
        }
      }
      if(isSmelly)
      {
        foundSmellyMethods = foundSmellyMethods + 1
        isSmelly = false
      }
    })
    return foundSmellyMethods
  }

  const calculateSmellyFlakyMethods = () => {
    let foundSmellyFlakyMethods = 0
    tableResults.map((method) => {
      let isSmelly = false
      for(var i = 3; i < Object.values(method).length; i++)
      {
        if(Number(Object.values(method)[i]) === 1 && !isSmelly && Number(Object.values(method)[2]) === 1 )
        {
            isSmelly = true
        }
      }
      if(isSmelly)
      {
        foundSmellyFlakyMethods = foundSmellyFlakyMethods + 1
        isSmelly = false
      }
    })
    return foundSmellyFlakyMethods
  }

  const calculateTotalTestSmells = () => {
    let newTotalTestSmells = 0
    tableResults.map((method) => {
      for(var i = 3; i < Object.values(method).length; i++)
      {
        if(Number(Object.values(method)[i]) === 1)
        {
          newTotalTestSmells = newTotalTestSmells + 1
        }
      }
    })
    return newTotalTestSmells
  }

  const calculateTestSmells = () => {
    let newTestSmells = testSmells
    tableResults.map((method) => {
      for(var i = 3; i < Object.values(method).length; i++)
      {
        if(Number(Object.values(method)[i]) === 1)
        {
          newTestSmells[i - 3] = newTestSmells[i - 3] + 1
        }
      }
    })
    return newTestSmells
  }

  const calculateFlakyMethods = () => {
    let foundFlakyMethods = 0
    tableResults.map((method) => {
      if(Number(Object.values(method)[2]) === 1)
      {
        foundFlakyMethods = foundFlakyMethods + 1
      }
    })
    return foundFlakyMethods
  }

  const calculateTestSmellsInFlakyMethods = () => {
    let newTestSmellsInFlakyMethods = testSmellsInFlakyMethods
    tableResults.map((method) => {
      for(var i = 3; i < Object.values(method).length; i++)
      {
        if(Number(Object.values(method)[i]) === 1 && Number(Object.values(method)[2]) === 1)
        {
          newTestSmellsInFlakyMethods[i - 3] = newTestSmellsInFlakyMethods[i - 3] + 1
        }
      }
    })
    return newTestSmellsInFlakyMethods
  }

  const calculateTotalTestSmellsInFlakyMethods = () => {
    let newTotalTestSmellsInFlakyMethods = 0
    tableResults.map((method) => {
      for(var i = 3; i < Object.values(method).length; i++)
      {
        if(Number(Object.values(method)[i]) === 1 && Number(Object.values(method)[2]) === 1)
        {
          newTotalTestSmellsInFlakyMethods = newTotalTestSmellsInFlakyMethods + 1
        }
      }
    })
    return newTotalTestSmellsInFlakyMethods
  }

  const calculateSmellyMethodsChart = () => {
    let data = {labels: [], datasets: []}
    data = {
      labels: ['Smelly Tests', 'Non-smelly Tests'],
      datasets: [
        {
          data: [smellyMethods, methods - smellyMethods],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(42, 153, 237, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(42, 153, 237, 1)'
          ],
          borderWidth: 1,
        },
      ],
    }
    return data
  }

  const calculateSmellyFlakyMethodsGlobalChart = () => {
    let data = {labels: [], datasets: []}
    data = {
      labels: ['Smelly Tests', 'Non-smelly Tests'],
      datasets: [
        {
          data: [smellyFlakyMethods, methods - smellyFlakyMethods],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(42, 153, 237, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(42, 153, 237, 1)'
          ],
          borderWidth: 1,
        },
      ],
    }
    return data
  }

  const calculateSmellyFlakyMethodsChart = () => {
    let data = {labels: [], datasets: []}
    data = {
      labels: ['Smelly Tests', 'Non-smelly Tests'],
      datasets: [
        {
          data: [smellyFlakyMethods, flakyMethods - smellyFlakyMethods],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(42, 153, 237, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(42, 153, 237, 1)'
          ],
          borderWidth: 1,
        },
      ],
    }
    return data
  }

  const calculateFlakyMethodsChart = () => {
    let data = {labels: [], datasets: []}
    data = {
      labels: ['Flaky Tests', 'Non-flaky Tests'],
      datasets: [
        {
          data: [flakyMethods, methods - flakyMethods],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(42, 153, 237, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(42, 153, 237, 1)'
          ],
          borderWidth: 1,
        },
      ],
    }
    return data
  }

  const calculateTestSmellsChart = () => {
    let data = {labels: [], datasets: []}
    data = {
      labels: ["Assertion Roulette", "Conditional Test Logic", "Constructor Initialization", "Default Test", "Dependent Test", "Duplicate Assert", "Eager Test", "EmptyTest", "Exception Catching Throwing", "General Fixture", "IgnoredTest",
      "Lazy Test", "Magic Number Test", "Mystery Guest", "Print Statement", "Redundant Assertion", "Resource Optimism", "Sensitive Equality", "Sleepy Test", "Unknown Test", "Verbose Test"],
      datasets: [
        {
          data: testSmells,
          backgroundColor: [
            'rgba(255, 102, 102, 0.2)',
            'rgba(255, 178, 102, 0.2)',
            'rgba(255, 255, 102, 0.2)',
            'rgba(178, 255, 102, 0.2)',
            'rgba(102, 255, 102, 0.2)',
            'rgba(102, 255, 178, 0.2)',
            'rgba(102, 255, 255, 0.2)',
            'rgba(102, 178, 255, 0.2)',
            'rgba(102, 102, 255, 0.2)',
            'rgba(178, 102, 255, 0.2)',
            'rgba(255, 102, 255, 0.2)',
            'rgba(255, 102, 178, 0.2)',
            'rgba(192, 192, 192, 0.2)',
            'rgba(153, 0, 0, 0.2)',
            'rgba(153, 76, 0, 0.2)',
            'rgba(76, 153, 0, 0.2)',
            'rgba(0, 153, 153, 0.2)',
            'rgba(102, 102, 0, 0.2)',
            'rgba(0, 0, 153, 0.2)',
            'rgba(153, 0, 153, 0.2)',
            'rgba(153, 0, 76, 0.2)'
          ],
          borderColor: [
            'rgba(255, 102, 102, 1)',
            'rgba(255, 178, 102, 1)',
            'rgba(255, 255, 102, 1)',
            'rgba(178, 255, 102, 1)',
            'rgba(102, 255, 102, 1)',
            'rgba(102, 255, 178, 1)',
            'rgba(102, 255, 255, 1)',
            'rgba(102, 178, 255, 1)',
            'rgba(102, 102, 255, 1)',
            'rgba(178, 102, 255, 1)',
            'rgba(255, 102, 255, 1)',
            'rgba(255, 102, 178, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(153, 0, 0, 1)',
            'rgba(153, 76, 0, 1)',
            'rgba(76, 153, 0, 1)',
            'rgba(0, 153, 153, 1)',
            'rgba(102, 102, 0, 1)',
            'rgba(0, 0, 153, 1)',
            'rgba(153, 0, 153, 1)',
            'rgba(153, 0, 76, 1)'
          ],
          borderWidth: 1,
        },
      ],
    }
    return data
  }

  const calculateTestSmellsInFlakyMethodsChart = () => {
    let data = {labels: [], datasets: []}
    data = {
      labels: ["Assertion Roulette", "Conditional Test Logic", "Constructor Initialization", "Default Test", "Dependent Test", "Duplicate Assert", "Eager Test", "EmptyTest", "Exception Catching Throwing", "General Fixture", "IgnoredTest",
      "Lazy Test", "Magic Number Test", "Mystery Guest", "Print Statement", "Redundant Assertion", "Resource Optimism", "Sensitive Equality", "Sleepy Test", "Unknown Test", "Verbose Test"],
      datasets: [
        {
          data: testSmellsInFlakyMethods,
          backgroundColor: [
            'rgba(255, 102, 102, 0.2)',
            'rgba(255, 178, 102, 0.2)',
            'rgba(255, 255, 102, 0.2)',
            'rgba(178, 255, 102, 0.2)',
            'rgba(102, 255, 102, 0.2)',
            'rgba(102, 255, 178, 0.2)',
            'rgba(102, 255, 255, 0.2)',
            'rgba(102, 178, 255, 0.2)',
            'rgba(102, 102, 255, 0.2)',
            'rgba(178, 102, 255, 0.2)',
            'rgba(255, 102, 255, 0.2)',
            'rgba(255, 102, 178, 0.2)',
            'rgba(192, 192, 192, 0.2)',
            'rgba(153, 0, 0, 0.2)',
            'rgba(153, 76, 0, 0.2)',
            'rgba(76, 153, 0, 0.2)',
            'rgba(0, 153, 153, 0.2)',
            'rgba(102, 102, 0, 0.2)',
            'rgba(0, 0, 153, 0.2)',
            'rgba(153, 0, 153, 0.2)',
            'rgba(153, 0, 76, 0.2)'
          ],
          borderColor: [
            'rgba(255, 102, 102, 1)',
            'rgba(255, 178, 102, 1)',
            'rgba(255, 255, 102, 1)',
            'rgba(178, 255, 102, 1)',
            'rgba(102, 255, 102, 1)',
            'rgba(102, 255, 178, 1)',
            'rgba(102, 255, 255, 1)',
            'rgba(102, 178, 255, 1)',
            'rgba(102, 102, 255, 1)',
            'rgba(178, 102, 255, 1)',
            'rgba(255, 102, 255, 1)',
            'rgba(255, 102, 178, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(153, 0, 0, 1)',
            'rgba(153, 76, 0, 1)',
            'rgba(76, 153, 0, 1)',
            'rgba(0, 153, 153, 1)',
            'rgba(102, 102, 0, 1)',
            'rgba(0, 0, 153, 1)',
            'rgba(153, 0, 153, 1)',
            'rgba(153, 0, 76, 1)'
          ],
          borderWidth: 1,
        },
      ],
    }
    return data
  }

  const renderScreen0 = () => {
    return(
      <div className="stats_screen_box_0">
        <div className="stats_screen_flex_container">
          <div className="stats_screen_title">
            Load a csv file in the results screen to see the stats.
          </div>
        </div>
      </div>
    )
  }

  const renderScreens = () => {
    return(
      <div className="stats_screens">
        {renderScreen1()}
        {renderScreen2()}
        {renderScreen3()}
      </div>
    )
  }

  const renderScreen1 = () => {
    return(
      <div className="stats_screen_1">
        <div className="stats_screen_box_1">
          <div className="stats_screen_flex_container">
            <div className="stats_screen_title">
              Smelly Methods
            </div>
          </div>

          <div className="stats_screen_flex_container">
            <div className="stats_screen_text">
              A total number of {smellyMethods} methods with test smells have been found in {methods} methods analyzed.
            </div>
          </div>

          <div className="stats_screen_chart_container">
            <Pie data={calculateSmellyMethodsChart()}
                width={30}
                height={30}
                options={{ maintainAspectRatio: false }}/>
          </div>
        </div>

        <div className="stats_screen_box_1">
          <div className="stats_screen_flex_container">
            <div className="stats_screen_title">
              Flaky methods
            </div>
          </div>

          <div className="stats_screen_flex_container">
            <div className="stats_screen_text">
              A total number of {flakyMethods} flaky methods have been found in {methods} methods analyzed.
            </div>
          </div>

          <div className="stats_screen_chart_container">
            <Pie data={calculateFlakyMethodsChart()}
                width={30}
                height={30}
                options={{ maintainAspectRatio: false }}/>
          </div>
        </div>
      </div>
    )
  }

  const renderScreen2 = () => {
    return(
      <div className="stats_screen_1">
        <div className="stats_screen_box_1">
          <div className="stats_screen_flex_container">
            <div className="stats_screen_title">
              Smelly and Flaky Methods
            </div>
          </div>

          <div className="stats_screen_flex_container">
            <div className="stats_screen_text">
              A total number of {smellyFlakyMethods} flaky methods with test smells have been found in {methods} methods analyzed.
            </div>
          </div>

          <div className="stats_screen_chart_container">
            <Pie data={calculateSmellyFlakyMethodsGlobalChart()}
                width={30}
                height={30}
                options={{ maintainAspectRatio: false}}/>
          </div>
        </div>

        <div className="stats_screen_box_1">
          <div className="stats_screen_flex_container">
            <div className="stats_screen_title">
              Smelly and Flaky Methods
            </div>
          </div>

          <div className="stats_screen_flex_container">
            <div className="stats_screen_text">
              A total number of {smellyFlakyMethods} flaky methods with test smells have been found in {flakyMethods} flaky methods analyzed.
            </div>
          </div>

          <div className="stats_screen_chart_container">
            <Pie data={calculateSmellyFlakyMethodsChart()}
                width={30}
                height={30}
                options={{ maintainAspectRatio: false}}/>
          </div>
        </div>
      </div>
    )
  }

  const renderScreen3 = () => {
    return(
      <div className="stats_screen_1">
        <div className="stats_screen_box_1">
          <div className="stats_screen_flex_container">
            <div className="stats_screen_title">
              Test Smells
            </div>
          </div>

          <div className="stats_screen_flex_container">
            <div className="stats_screen_text">
              A total number of {totalTestSmells} test smells have been found in {methods} methods analyzed.
            </div>
          </div>

          <div className="stats_screen_chart_container">
            <Pie data={calculateTestSmellsChart()}
                width={30}
                height={30}
                options={{ maintainAspectRatio: false, plugins: {legend: {display: false}}}}/>
          </div>
        </div>

        <div className="stats_screen_box_1">
          <div className="stats_screen_flex_container">
            <div className="stats_screen_title">
              Test Smells in Flaky Methods
            </div>
          </div>

          <div className="stats_screen_flex_container">
            <div className="stats_screen_text">
              A total number of {totalTestSmellsInFlakyMethods} test smells have been found in {flakyMethods} flaky methods analyzed.
            </div>
          </div>

          <div className="stats_screen_chart_container">
            <Pie data={calculateTestSmellsInFlakyMethodsChart()}
                width={30}
                height={30}
                options={{ maintainAspectRatio: false, plugins: {legend: {display: false}}}}/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="stats_screen">
      {tableResults.length === 0 && renderScreen0()}
      {tableResults.length > 0 && renderScreens()}
    </div>
  );
}

export default StatsScreen;
