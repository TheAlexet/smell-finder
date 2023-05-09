import './App.css';
import TopBar from './components/TopBar.js'
import Screens from './components/Screens.js'

const App = () => {
  return (
    <div className="app">
      <TopBar/>
      <Screens/>
    </div>
  );
}

export default App;
