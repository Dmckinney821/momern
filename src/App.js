import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import Auth from './user/pages/Auth'
import MainNavigation from './shared/components/Navigation/MainNavigation'

import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'
import UpdatePlace from './places/pages/UpdatePlace';




const  App = () => {
    const { token, login, logout, userId } = useAuth()

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users /> 
        </Route>
        <Route path='/:userId/places'>
          <UserPlaces exact />
        </Route>
        <Route path='/places/new' exact>
          <NewPlace /> 
        </Route>
        <Route path='/places/:placeId'>
          <UpdatePlace />
        </Route>
        <Redirect to ='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users /> 
        </Route>
        <Route path='/:userId/places'>
          <UserPlaces exact />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to ='/auth' /> 
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{
        isLoggedIn: !!token, 
        token: token,
        userId: userId,
        login: login, 
        logout: logout}}>
    <Router>
      <MainNavigation />
      <main>
        {routes}
      </main>
    </Router>
    </AuthContext.Provider>
  )
}

export default App;
