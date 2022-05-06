import { BrowserRouter } from 'react-router-dom'
import MainComponents from './Components/MainComponents'
import './assets/css/index.css'
import { useEffect } from 'react';
import { retriveallfiles } from './apiCalls';

function App() {

  const getallfiles = async () => {
    try {
      const result = await retriveallfiles()
      //  console.log(result.data.message.filename);
      console.log(result.config.url);

    } catch (error) {
      console.error(error.message);
    }
  }
  console.log("f");
  console.log(getallfiles());

  useEffect(() => {
    console.log(getallfiles());
  }, [])



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
