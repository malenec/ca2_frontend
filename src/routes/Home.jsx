import React from 'react'
import { useLocation } from 'react-router-dom';
import Quote from "../components/Quote"

const Home = ({ user }) => {

  return (
    <div>
      <h3>Home</h3>
      <Quote user={user} />

    </div>
  );
};

export default Home;

