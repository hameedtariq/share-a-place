import React, { useCallback, useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace  from './places/pages/UpdatePlace'
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation'
import Users from './user/pages/Users'
import Auth from './user/pages/Auth'
import { Provider } from './shared/context/auth-context'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = useCallback(()=> {
    setIsLoggedIn(true);
  },[])
  const logout = useCallback(()=> {
    setIsLoggedIn(false);
  },[])
  //hello
  let routes;
  if(isLoggedIn){
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
    <Provider value={{isLoggedIn,login,logout}}>
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