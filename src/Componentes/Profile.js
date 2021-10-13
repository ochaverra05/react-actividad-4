import React from 'react';
import { logout } from '../Services/axiosConfig';
function Profile({avatar, username, bio, onClickLogout}){
  const body = {
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
  };
  let logoutBtn = () => {
    logout(body)
      .then(response => {
        if(response?.status === 200 || response?.status === 204){
          return onClickLogout;
        }
      });
  };
  return(
    <div>
      <div className="text-center m-3">
        <img className="text-center rounded-image mx-auto d-block avatar" src={avatar}></img>
      </div>
      <div className="m-3">
        <p className="text-center h3">{username}</p>
      </div>
      <div className="m-3">
        <p className="text-center">{bio}</p>
      </div>
      <div className="mt-4 d-grid gap-2">
        <button className="text-center btn btn-primary" type="button" onClick={()=>onClickLogout(logoutBtn)}>Salir</button>
      </div>
    </div>
  );
}

export default Profile;