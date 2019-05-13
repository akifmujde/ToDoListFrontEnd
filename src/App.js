import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

import Home from "./components/Home"
import Error from "./components/Error"
import Login from "./components/Login"
import Registration from "./components/Registration"
import Navigation from './components/Navigation';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route path="/" component ={Home} exact/>
          <Route path="/login" component ={Login} exact/>
          <Route path="/registration" component ={Registration} exact/>
          <Route component ={Error}/>
        </Switch>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
