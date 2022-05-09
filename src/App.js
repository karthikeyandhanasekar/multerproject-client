import { BrowserRouter } from 'react-router-dom'
import MainComponents from './Components/MainComponents'
import './assets/css/index.css'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <MainComponents />
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
