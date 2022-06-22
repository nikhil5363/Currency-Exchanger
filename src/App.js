import logo from "./logo.svg";
import "./App.css";
import Convertor from "./CurrencyConvertor";
import Details from "./CurrencyConvertor/Details";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";


function App() {
  return (
  
    <Router>
    <div className="App">
     
      {/* // Defining the Routes  */}
      <Switch> 
        <Route exact path="/" component={Convertor} />
        <Route exact path="/details" component={Details} />
      </Switch>

    </div>
  </Router>

  );
}

export default App;
