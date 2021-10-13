import React, { useState } from 'react';
import { login } from '../Services/axiosConfig';

function Login(props){

  const [error, setError] = useState(false);  

  let changeLike = (bool) => {
    setError( bool);
  };

  let setUser = (userID) => {
    localStorage.setItem('UserID', JSON.stringify(userID));
  };

  let loginData = (data) => {
    localStorage.setItem('username', data.username);
    localStorage.setItem('password', data.password);
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      username: event.target.email.value,
      password: event.target.password.value
    };
    loginData(body);
    login(body)
      .then(response => {
        if (response?.status === 200){
          setUser(response.data);
          props.onLoginComplete(true);
          changeLike(false);
        }else{
          changeLike(true);
          closeMessageDiv();
        }
      })
      .catch(() => {
        changeLike(true);
        closeMessageDiv();
      });
  };

  let closeMessageDiv = () =>{        
    setInterval(()=>{ 
      changeLike(false); 
    }, 7000);
  };
  return (
    <div>                
      {
        error ? (
          <div className="errorMessage">
            <p className="ms-3 fw-bold">Usuario o contraseña invalida</p>
          </div>
        ): (
          ''
        )
      }
      <form onSubmit={handleSubmit} className="m-2">
        <div>
          <h3 className="text-center mt-3">Oriller Login</h3>
        </div>
        <hr></hr>
        <div className="mb-3 mt-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input className="form-control" 
            id="exampleInputEmail1" 
            name="email">
          </input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" 
            className="form-control" 
            id="exampleInputPassword1"
            name="password">
          </input>
        </div>
        <button type="submit" className="btn btn-primary col-12 mt-3">
                    Login
        </button>
      </form>
    </div>
  );
}

export default Login;