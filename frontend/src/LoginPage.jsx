import axios from "axios";
import React from "react";

const LoginPage = () => {

    const login = (e) => {
        e.preventDefault()
        axios.post("/login/password", {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(
            res => {
                console.log("res in login page", res)
                window.localStorage.setItem("email", e.target.username.value);
            }
        )
    }
  return (
    <div>
      <h1>Sign in</h1>
      <form
        onSubmit={login}
        className="p-3 mt-3"
      >
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
    </div>
  );
};

export default LoginPage;
