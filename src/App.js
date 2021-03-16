import logo from './logo.svg';
import './App.css';
import MapChart from './MapChart';
import CardView from './CardView';
import Login from './Login';
import {Switch,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path="/cardview">
        <CardView></CardView>
      </Route>
      <Route path="/mapview">
        <MapChart></MapChart>
      </Route>
      <Route path="/">
        <Login></Login>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
