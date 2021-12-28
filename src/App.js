import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/views/Dashboard";
import GetPurchases from "./components/views/GetPurchases.js";
import Store from "./components/views/Store"
import Sales from "./components/views/Sales"




function App() {
  
  return (
    <div className="App">
      
     <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/purchases" component={GetPurchases} />
      <Route path="/store" component={Store} />
      <Route path="/sales" component={Sales} />
      <Redirect from="/" to="/dashboard" />
     
    </Switch>
  </BrowserRouter>
      
    </div>
  );
}

export default App;