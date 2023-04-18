import React, { useState } from "react"
import { Routes, Route } from 'react-router-dom'
import facade from "./apiFacade";
import Header from "./components/Header";
import Home from "./routes/Home";
import About from "./routes/About";
import Test from "./components/Test";
import Content from "./components/Content";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({ username: "", roles: "" });

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
    setUser({ username: "", roles: "" })
  }

  const login = (user, pass) => {
    facade.login(user, pass).then(() => {
      const token = facade.readJwtToken(facade.getToken());
      setUser({ username: token.username, roles: token.roles })
      setLoggedIn(true)
    })
      ;
  }

  return (
    <div>
      <Header user={user} loggedIn={loggedIn} login={login} logout={logout} />
      <Content user={user} />
    </div>
  )

}
export default App;