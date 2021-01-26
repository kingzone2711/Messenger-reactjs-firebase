import React from 'react'
import { Route } from 'react-router-dom'

const PrivateRouter=(props)=> {
    console.log(props)
  return (
  <Route path={props.path} exact={props.exact} component={props.component}> </Route>
  )
}
export default PrivateRouter