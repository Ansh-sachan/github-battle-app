import Popular from './components/popular';
import Battle from './components/battle';
// import { BrowserRouter,Route } from 'react-router-dom/cjs/react-router-dom.min';
import { BrowserRouter, Route } from 'react-router-dom';
import './style.css';
function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Route path="/" exact>
            <Popular />
          </Route>
          <Route path="/battle" exact>
            <Battle />
          </Route>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
