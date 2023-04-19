import React, { useState } from "react"

import facade from "./apiFacade";
import Header from "./components/Header";

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