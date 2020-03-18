import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import CompaniesDetails from "./components/companiesDetails/CompaniesDetails";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/company/:id" component={CompaniesDetails} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
