import React, { useState, useEffect } from 'react'
import md5 from 'md5'
import "./LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";


const LoginPage = () => {
  const [pageStatus, setPageStatus] = useState("login")

  useEffect(() => {
    
  }, [pageStatus])

  const login = async (e) => {
    e.preventDefault();
    let requestAPI = "/user/login"
    let hashedPwd = md5(e.target.password.value)
    console.log(hashedPwd)
    let res = await fetch(requestAPI, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: e.target.username.value,
          password: e.target.password.value,
        }
      )

    })
    let data = await res.json()
    console.log(data)
    // // TODO
    // console.log("res in login page", res.data);
    window.localStorage.setItem("email", e.target.username.value);
  };
  return (
    pageStatus ? (// true => sign in
      <div className="back-page">
      <div className="wrapper">

        <div className="text-center mt-4 name">Pocket Recipe</div>
        <form onSubmit={login} className="p-3 mt-3">
          <div>
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="form-label" htmlFor="current-password">
              Password
            </label>
            <input
              className="form-control"
              id="current-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <br />
          <button className="btn btn-primary" type="submit">
            Sign in
          </button>
        </form>
        <div className="text-center fs-6 ">

          <a className='small-text' onClick={() => {setPageStatus(false)}}>Sign Up</a>
        </div>
      </div>
    </div >
    ) : (//false => sign up
      <div className="back-page">
      <div className="wrapper">
      <div className="text">
        <a className='small-text' onClick={() => {setPageStatus(true)}}>&lt; back</a>
      </div>

        <div className="text-center mt-4 name">Create new account</div>
        <form onSubmit={login} className="p-3 mt-3">
          <div>
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="form-label" htmlFor="current-password">
              Password
            </label>
            <input
              className="form-control"
              id="current-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <br />
          <button className="btn btn-primary" type="submit">
            Sign up
          </button>
        </form>
        
      </div>
    </div >
    )
    
  );
};



export default LoginPage;
