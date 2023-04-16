import React from 'react'
import {useLocation} from 'react-router-dom';


const Home = () => {

  const location = useLocation();

  return (
    <div>
      <h3>Home</h3>
      {location.state && location.state.message}

    </div>
  );
};

export default Home;

