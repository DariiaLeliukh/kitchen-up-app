import React, { useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import Register from '../components/Register';

const HomeRoute = (props) => {

  return (
    <div className="home-route">
      <TopNavigation />
      <Register />
    </div>
  );
};

export default HomeRoute;