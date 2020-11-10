import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
            <Navbar />
            <Route exact path='/' component={ Home }>Home</Route>
            <Route path='/about' component={ About }>About</Route>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;

/*
 <Route path='/hire-me' component={ Hire }>Hire Me</Route>
            <Route exact path='/portfolio' render={ routerProps => {
                return  <Portfolio {...routerProps} projects={projects} /> }
            }>Portfolio</Route>
            <Route path={`/portfolio/:id`} render={ routerProps=> {
                return <Project {...routerProps} projects={projects} /> }
            } />
*/