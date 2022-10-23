import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { OrgReg } from './components/OrgReg';
import { Wrap } from './components/Wrap';
import './App.css';
import { OrgLogin } from './components/OrgLogin';
import { MyUsers } from './components/MyUsers';

function App() {
  return (
    <Routes>      
      <Route path='/' element={<Wrap><OrgReg /></Wrap>}/>
      <Route path='/register' element={<Wrap><OrgReg /></Wrap>}/>
      <Route path='/login' element={<Wrap><OrgLogin/></Wrap>}/>
      <Route path='/myUsers' element={<Wrap><MyUsers/></Wrap>}/>       
    </Routes>
  );
}

export default App;
