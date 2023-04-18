import React from 'react'
import { NavLink } from 'react-router-dom'
import LogIn from './LogIn.jsx'
import LoggedIn from './LoggedIn.jsx'



const Header = ({ user, loggedIn, login, logout }) => {

    return (<ul className="header">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>

        {!loggedIn ? (<LogIn login={login} />) :
            (<>
                <LoggedIn user={user} logout={logout} />

            </>)}
    </ul>
    )
}

export default Header;

