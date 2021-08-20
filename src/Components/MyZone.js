import React, { Component } from 'react'
import Sidebar from './Sidebar'
import { BrowserRouter as Router } from 'react-router-dom'
import TestsPage from './TestsPage'
import PrivateRoute from './PrivateRoute'
import MyTests from './MyTests'
import Statistics from './Statistics'
import RatingPage from './RatingPage'

class MyZone extends Component {

    render() {
        return (
            <div className="myzone">
                <Router>
                    <Sidebar />
                    <PrivateRoute path='/myzone' exact={true} component={TestsPage} />
                    <PrivateRoute path='/myzone/my_tests' component={MyTests} />
                    <PrivateRoute path='/myzone/statistics' component={Statistics} />
                    <PrivateRoute path='/myzone/rating' component={RatingPage} />
                </Router>

            </div>

        )
    }
}
export default MyZone;