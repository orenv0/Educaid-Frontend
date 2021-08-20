import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Cpr from './Components/Cpr'
import Animals from './Components/Animals'
import Climate from './Components/Climate'
import Dressings from './Components/Dressings'
import MoreCases from './Components/MoreCases'
import MyZone from './Components/MyZone';
import PrivateRoute from './Components/PrivateRoute';


function App() {
 
  return (
    <div className="App" >
      <Router>
        
            <Header />
            <Route path='/' exact={true} component={Home} />
            <Route path="/cpr" component={Cpr} />
            <Route path="/animals" component={Animals} />
            <Route path="/climate" component={Climate} />
            <Route path="/dressings" component={Dressings} />
            <Route path="/moreCases" component={MoreCases} />
            <PrivateRoute path='/myzone' component={MyZone} />
       
            <Footer />
    
      </Router>
    </div>
  );
}

export default App;
