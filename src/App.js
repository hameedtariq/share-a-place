import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace  from './places/pages/UpdatePlace'
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation'
import Users from './user/pages/Users'
const App = () => {
  return (
    <BrowserRouter>
      <main>
        <MainNavigation />
        <Routes>
          <Route path='/' element={<Users/>}></Route>
          <Route path='/places/new' element={<NewPlace/>}></Route>
          <Route path='/places/:pid' element={<UpdatePlace/>}></Route>
          <Route path='/:uid/places' element={<UserPlaces/>}></Route>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App