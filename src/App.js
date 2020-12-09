import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Producer from './containers/Producer'
import ThisStrangeScreen from './containers/purchase/ThisStrangeScreen'
import Producers from './containers/Producers'
import Workers from './containers/Workers'
import Worker from './containers/Worker'
import Black from './containers/Black'
import Blacks from './containers/Blacks'
import GetAccreditation from './containers/GetAccreditation'
import Signup from './containers/user/Signup'
import Confirm from './containers/user/Confirm'
import logo from './logo.svg';
import {  Layout } from 'antd';
import './App.css';
import SentAccreditation from './containers/SentAccreditation'
import Purchase from './containers/purchase/Purchase'

import FormP from './containers/purchase/FormP'
import Purchases from './containers/purchase/Purchases'
import Applications from './containers/purchase/application/Applications'
import Application from './containers/purchase/application/Application'
import ApplicationCreate from './containers/purchase/application/ApplicationCreate'
import WorkerForm from './containers/purchase/WorkerForm'
const { Content } = Layout

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
            <Layout style={{ minHeight: '100vh' }} className="site-layout">
            <Navbar />
              <Content  theme="dark">
                <Route exact path='/' component={ Home }></Route>
                <Route path='/about' component={ About }></Route>
                <Route path='/producer' component={ Producer }></Route>
                <Route path='/producers/:id' component={ Producer }></Route>
                <Route exact path='/producers' component={ Producers }></Route>
                <Route path='/workers/:id' component={ Worker }></Route>
                <Route exact path='/workers' component={ Workers }></Route>
                <Route path='/blacks/:id' component={ Black }></Route>
                <Route exact path='/blacks' component={ Blacks }></Route>
                <Route path='/signup' component={ Signup }></Route>
                <Route path='/confirm/:code' component={ Confirm }></Route>
                <Route path='/accreditate' component={ GetAccreditation }></Route>
                <Route path="/thisStrangeScreen" component={ThisStrangeScreen}></Route>
                <Route exact path='/purchases' component={ Purchases }></Route>
                <Route exact path='/purchases/:id' component={ Purchase }></Route>
                <Route exact path='/purchase/create' component={ FormP }></Route>
                <Route exact path='/create-worker' component={ WorkerForm }></Route>
                <Route exact path='/purchases/:id/applications' component={ Applications }></Route>
                <Route exact path='/purchases/:id/applications/create' component={ ApplicationCreate }></Route>
                <Route exact path='/purchases/:id/applications/:appId' component={ Application }></Route>
                <Route path='/success-accreditation' component={ SentAccreditation }></Route>
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