import React from 'react'
import {NavLink} from 'react-router-dom'
import LogIn from './LogIn.jsx'
import LoggedIn from './LoggedIn.jsx'

const Header = ({user, loggedIn, login, logout}) => {
    return (
        <div>
            {!loggedIn ? (<LogIn login={login} />) :
        (<div>
          <LoggedIn user = {user}/>
          {user.name}
          <button onClick={logout}>Logout</button>
        </div>)}

            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </nav>

        </div>
    )
}

export default Header;

