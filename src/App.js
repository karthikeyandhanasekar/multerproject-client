import { BrowserRouter } from 'react-router-dom'
import './assets/css/index.css'
import React, { Suspense } from 'react';

const MainComponents = React.lazy(() => import('./Components/MainComponents'))
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Suspense fallback={<div>Loading</div>}>
            <MainComponents />
          </Suspense>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
