import React from 'react';
import './login.css';

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    let username = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    if(username == "superadmin" && password == "hdims") {
      window.location.replace("/home");
    } else {
      alert("Wrong Username/Password");
    }
  }
  return (
<div className="container-log">
    <div className="img">
      <img src="https://i.imgur.com/AKnAyy5.jpeg" />
    </div>
    <div className="login-content">
      <form onSubmit={handleSubmit}>
        <img src="https://i.imgur.com/4xoqE6m.jpeg" style={{height: "150px", width: "150px;"}} />
        <h2 className="title">Welcome</h2>
        <div className="input-div one">
          <div className="i">
            <i className="fas fa-user"></i>
          </div>
          <div className="div">
            <input type="text" className="input" id="user" placeholder='Username'/>
          </div>
        </div>
        <div className="input-div pass">
          <div className="i">
            <i className="fas fa-lock"></i>
          </div>
          <div className="div">
            <input type="password" className="input" id='password' placeholder='Password'/>
          </div>
        </div>
        <a href="#" className='forgot'>Forgot Password?</a>
        <input type="submit" className="btn" value="Login"/>
      </form>
    </div>
  </div>  
  );
}
