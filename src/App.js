import React, { useCallback, useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace  from './places/pages/UpdatePlace'
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation'
import Users from './user/pages/Users'
import Auth from './user/pages/Auth'
import { Provider } from './shared/context/auth-context'

let logoutTimmer;
const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState('');
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const login = useCallback((uid,token,expiration)=> {
    setUserId(uid);
    setToken(token);
    const expirationDate = expiration || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    setTokenExpirationDate(expirationDate);
    localStorage.setItem('userData',JSON.stringify({userId: uid, token: token, expiration: expirationDate.toISOString()}));
  },[])
  const logout = useCallback(()=> {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId('');
    localStorage.removeItem('userData');
  },[])


  useEffect(()=> {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData && userData.token && (new Date(userData.expiration) > new Date())){
      login(userData.userId, userData.token, new Date(userData.expiration));
    }
  },[login])


  // auto logout when the time limit is reached
  useEffect(()=> {
    if(token && tokenExpirationDate){
      const timeLeft = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimmer = setTimeout(logout, timeLeft);
    } else {
      clearTimeout(logoutTimmer);
    }
  },[tokenExpirationDate, logout])

  //hello
  let routes;
  if(token){
    routes = (
      <Routes>
            <Route path='/' element={<Users/>}></Route>
            <Route path='/places/new' element={<NewPlace/>}></Route>
            <Route path='/places/:pid' element={<UpdatePlace/>}></Route>
            <Route path='/:uid/places' element={<UserPlaces/>}></Route>
            <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    )
  }
  else{
    routes = (
      <Routes>
            <Route path='/' element={<Users/>}></Route>
            <Route path='/places/:pid' element={<UpdatePlace/>}></Route>
            <Route path='/:uid/places' element={<UserPlaces/>}></Route>
            <Route path='/auth' element={<Auth/>}></Route>          
            <Route path='*' element={<Navigate to='/auth'/>}/>
      </Routes>

    )
  }


  return (
    <Provider value={{isLoggedIn: !!token ,login,logout, userId, token}}>
      <BrowserRouter>
        <main>
          <MainNavigation />
          {routes}
        </main>
      </BrowserRouter>
    </Provider>
  )
}

export default App