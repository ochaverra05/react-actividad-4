import logo from '../assets/img/logo.png';
import React from 'react';
import { PersonCircle } from 'react-bootstrap-icons';

function Navbar({onLogoClick, onProfileClick}){
  return (
    <nav className="navbar navbar-expand-md navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a onClick={()=>{onLogoClick('Post');}}><img src={logo} alt="" id="logo"></img></a>
        <div onClick={()=>{onProfileClick('Logo');}}>
          <PersonCircle className="bi-circle-person"></PersonCircle>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;