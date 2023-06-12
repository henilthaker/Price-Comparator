import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (

    // though we only have home page, as we are using Link we need to wrap all the components within BrowserRouter for Link to work properly
    <BrowserRouter>
      <div className="App">
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
