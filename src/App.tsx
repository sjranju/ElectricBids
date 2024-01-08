import React from 'react';
import { Outlet } from 'react-router-dom'
import Header from './components/header';

function App() {

  return (
    <div className="">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
