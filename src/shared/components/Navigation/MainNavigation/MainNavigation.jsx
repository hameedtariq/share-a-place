import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Backdrop from '../../UIElements/Backdrop/Backdrop'

import MainHeader from '../MainHeader/MainHeader'
import NavLinks from '../NavLinks/NavLinks'
import SideDrawer from '../SideDrawer/SideDrawer'
import './MainNavigation.css'

const MainNavigation = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    return (
        <>
        {drawerIsOpen && <Backdrop onClick={()=> setDrawerIsOpen(false)} />}
            
        <SideDrawer show={drawerIsOpen}>
            <nav className='main-navigation__drawer-nav' onClick={()=> setDrawerIsOpen(false)}>
                <NavLinks/>
            </nav>
        </SideDrawer>
        <MainHeader>
            <button className='main-navigation__menu-btn' onClick={()=> setDrawerIsOpen(true)}>
                <span /> 
                <span />
                <span />
            </button>
            <h1 className='main-navigation__title'>
                <Link to='/'>YourPlaces</Link>
            </h1>
            <nav className='main-navigation__header-nav'>
                <NavLinks />
            </nav>
        </MainHeader>
        </>
    )
}

export default MainNavigation