import React from 'react'
import {Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Sidebar from './Sidebar'


const PrivateRoute = ({component,...args}) => (
    <Route component={withAuthenticationRequired(component, { onRedirecting: () => <Sidebar/>})}
    {...args}/>
)
    


export default PrivateRoute
