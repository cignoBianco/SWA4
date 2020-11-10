import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import logo from './logo.svg';
import './App.css';
import {  Layout } from 'antd';
const { Content } = Layout

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
            <Layout style={{ minHeight: '100vh' }} className="site-layout">
            <Navbar />
              <Content>
                <Route exact path='/' component={ Home }></Route>
                <Route path='/about' component={ About }></Route>
              </Content>
            </Layout>
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