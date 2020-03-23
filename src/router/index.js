import React,{Component} from 'react'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Blog from "../views/blog/Blog"
import Cma from '../views/cma/Cma'
import Login from '../views/login/Login'
export default class BlogRouter extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/cma' render={()=>{
            return (
              localStorage.getItem('token')?
              <Cma></Cma>
              :<Redirect to='/login'></Redirect>
            )
          }}></Route>
          <Route path='/' component={Blog}></Route>
        </Switch>
      </Router>
    )
  }
}