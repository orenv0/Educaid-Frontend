import React, { Component } from 'react'
import LoginButton from './LoginButton'

class Header extends Component {

  render() {

    return (
      <div>
        <div className="upperHeader">
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" width="150" height="150"></img>
        </div>
        
        <nav className="navbar">
          <ul>
            <li><a href="/"><i className="fas fa-home"></i> ראשי</a></li>
            <li><a href="/cpr"><i className="fas fa-heartbeat"></i> החייאות וחנק</a></li>
            <li><a href="/dressings"><i className="fas fa-tint"></i> עצירת דימומים וחבישות</a></li>
            <li><a href="/animals"><i className="fas fa-dog"></i> פגיעות בעלי חיים</a></li>
            <li><a href="/climate"><i className="fas fa-cloud-sun-rain"></i> פגיעות אקלים</a></li>
            <li><a href="/moreCases"><i className="fas fa-book-medical"></i> מקרים נוספים</a></li>
          </ul>
          <div className="login-tab">
            <ul>
              <li> <LoginButton /></li>
            </ul>
          </div>
        </nav>

      </div>
    );
  }
}

export default Header