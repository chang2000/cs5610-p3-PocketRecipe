import React from "react";
import "./LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const login = async (e) => {
    e.preventDefault();
    let requestAPI = "/login/password"

    // let res = fetch(requestAPI, {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(
    //     {
    //       username: e.target.username.value,
    //       password: e.target.password.value,
    //     }
    //   )

    // })
    // let data = await res.json()
    // console.log(data)
    // // TODO
    // console.log("res in login page", res.data);
    window.localStorage.setItem("email", e.target.username.value);
  };
  return (
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
        <div className="text-center fs-6">

          <a href="">Sign up</a>
        </div>
      </div>
    </div >
  );
};

export default LoginPage;
