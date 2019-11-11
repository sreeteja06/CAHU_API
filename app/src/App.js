import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MeritList from './components/merlistDisplay'
import Header from './components/layouts/Header'
import AllocList from './components/allocListDisplay'
import Upload from './components/uploadFile'

class App extends Component{
  render(){
    return(
      <div className='App'>
      <Router>
      <Header />
      <Route exact path="/" component={Upload} />
      <Route exact path="/alloc" component={AllocList} />
      <Route exact path="/merit" component={MeritList} />
      </Router>
      </div>
    )
  }
}

export default App;
