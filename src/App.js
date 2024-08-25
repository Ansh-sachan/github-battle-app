import Popular from './components/popular';
// import { BrowserRouter,Route } from 'react-router-dom/cjs/react-router-dom.min';
import { BrowserRouter, Route } from 'react-router-dom';
import './style.css';
import Battle from './components/Battle1';
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
