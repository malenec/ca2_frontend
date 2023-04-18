
import facade from "../apiFacade";
import { useState, useEffect } from 'react'

const About = ({ user }) => {
  const [dataFromServer, setDataFromServer] = useState("Loading...")
  useEffect(() => {
    if (user.username === '') {
      setDataFromServer("Please log in");
      return;
    }
    const url = user.roles.split(',').includes('user') ? '/api/info/user' : '/api/info/admin';
    facade.fetchData(url).then(res => {
      console.log(res);
      setDataFromServer(res.msg)
    });
  }, [user]);
  return (<>
    {dataFromServer}
    <div><h2>About</h2></div>
    USER: {user.username}
  </>
  )
};

export default About