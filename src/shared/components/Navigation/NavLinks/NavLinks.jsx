import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../../context/auth-context'

import './NavLinks.css'


const NavLinks = () => {
    const {isLoggedIn, logout, userId} = useContext(AuthContext);
  return (
    <ul className='nav-links'>
        <li>
            <NavLink to="/">ALL USERS</NavLink>
        </li>
        {isLoggedIn && <li>
            <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
        </li>}   
        {isLoggedIn && <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>}
        {!isLoggedIn && <li>
            <NavLink to="/auth">LOGIN/SIGNUP</NavLink>
        </li>}
       {isLoggedIn && <li>
            <NavLink to='/auth' onClick={()=> logout()}>LOGOUT</NavLink>
        </li>}
    </ul>
  )
}

export default NavLinks