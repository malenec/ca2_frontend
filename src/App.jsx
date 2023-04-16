import React, { useState } from "react"
import {Routes, Route} from 'react-router-dom'
import facade from "./apiFacade";
import Header from "./components/Header";
import Home from "./routes/Home";
import About from "./routes/About";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({name: "", roles: ""});

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
    setUser({name: "", roles: ""})
}

  const login = (user, pass) => {
    facade.login(user,pass).then(() => {
      const token = facade.readJwtToken(facade.getToken());
      setUser({name: token.username, roles: token.roles})
      setLoggedIn(true)
    })
  ;}

  return (
    <div>
  
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>

      <Header user={user} loggedIn={loggedIn} login={login} logout={logout}/>
        </div>
  )

}
export default App;