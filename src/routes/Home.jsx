import React from 'react'
import { useLocation } from 'react-router-dom';
import Test from "../components/Test"


const Home = () => {

  const location = useLocation();

  return (
    <div>
      <h3>Home</h3>
      {location.state && location.state.message}
      <Test />

    </div>
  );
};

export default Home;

