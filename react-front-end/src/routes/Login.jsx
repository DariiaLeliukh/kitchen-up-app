import React, { useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import Login from '../components/Login';

const HomeRoute = (props) => {

  return (
    <div className="home-route">
      <TopNavigation />
      <Login />
    </div>
  );
};

export default HomeRoute;