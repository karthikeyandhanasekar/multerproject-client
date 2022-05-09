import { BrowserRouter } from 'react-router-dom'
import './assets/css/index.css'
import React, { Suspense } from 'react';
import Loader from './assets/images/loader.gif'
const MainComponents = React.lazy(() => import('./Components/MainComponents'))
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Suspense fallback={<img src={Loader} alt="loader" />}>
            <MainComponents />
          </Suspense>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
