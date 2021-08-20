import React, { Component } from 'react'
import UserDetails from './UserDetails'
import LogoutButton from './LogoutButton'


 class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <UserDetails/>
                <hr width="240"/>
               <nav>
                <ul>
                        <li><a href="/myzone">תרגול מבחנים</a></li>
                        <li><a href="/myzone/my_tests">המבחנים שלי</a></li>
                        <li><a href="/myzone/statistics">סטטיסטיקה</a></li>
                        <li><a href="/myzone/rating">דרג אותנו</a></li>
                </ul>
                </nav> 
                <LogoutButton />
            </div>
        )
    }
}
export default Sidebar