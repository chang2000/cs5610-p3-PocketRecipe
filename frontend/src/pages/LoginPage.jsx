import React, { useState, useEffect } from 'react'
import md5 from 'md5'
import './LoginPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'


<<<<<<< HEAD
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'



const LoginPage = () => {
  const [pageStatus, setPageStatus] = useState('login')
  const [createState, setCreatestate] = useState('initialState')
  useEffect(() => { }, [pageStatus])
  useEffect(() => { }, [createState])
=======
const LoginPage = () => {
  const [pageStatus, setPageStatus] = useState('login')

  useEffect(() => {

  }, [pageStatus])
>>>>>>> 21bf9c772bae9c7af8c83d88c5d556e552fac025

  const login = async (e) => {
    e.preventDefault()
    let requestAPI = '/user/login'
    let hashedPwd = md5(e.target.password.value)
    console.log(hashedPwd)
    let res = await fetch(requestAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          email: e.target.username.value,
          password: hashedPwd,
        }
      )

    })
    let data = await res.json()
    if (data.val === 1) {
      console.log('here')
      window.localStorage.setItem('email', e.target.username.value)
      window.location.reload(true)
    } else {
      console.log('not here')
<<<<<<< HEAD
      document.getElementById('login-fail-alert').style.display = 'block'
=======
      //TODO: add alert, not successful

>>>>>>> 21bf9c772bae9c7af8c83d88c5d556e552fac025
    }

    // // TODO: judge if successful user login, if so, add to localstorage and refresh page

  }

  const createUser = async (e) => {
    e.preventDefault()
    let requestAPI = '/user/create'
    let hashedPwd = md5(e.target.password.value)
    console.log('sign up email:', e.target.username.value)
    console.log('sign up page:', hashedPwd)

    let res = await fetch(requestAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          email: e.target.username.value,
          password: hashedPwd,
        }
      )

    })
    let data = await res.json()
    console.log(data)
<<<<<<< HEAD
    if (data.val == 1) {
      console.log('here data is 1')
      setCreatestate(false)

      setPageStatus(true)
    } else {
      document.getElementById('create-fail-alert').style.display = 'block'
      setCreatestate(false)
      // setPageStatus(true);
    }
  }


  return pageStatus ? ( // true => sign in page
    <div className="back-page">
      <div className="wrapper">
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert
            id="create-success"
            severity="success"
            style={{ display: 'none' }}
          >
            Successfully created the account
          </Alert>
          <Alert
            id="login-fail-alert"
            severity="error"
            style={{ display: 'none' }}
          >
            Wrong email or password
          </Alert>
        </Stack>

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
          <a
            className="small-text"
            onClick={() => {
              setPageStatus(false)
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  ) : (
    //false => sign up page
    <div className="back-page">
      <div className="wrapper">
        <div className="text">
          <a
            className="small-text"
            onClick={() => {
              setPageStatus(true)
            }}
          >
            &lt; back
          </a>
        </div>
        <Alert
          id="create-fail-alert"
          severity="error"
          style={{ display: 'none' }}
        >
          User already exists
        </Alert>

        <div className="text-center mt-4 name">Create new account</div>
        <form onSubmit={createUser} className="p-3 mt-3">
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
    </div>
  )
}
=======

  }


  return (
    pageStatus ? (// true => sign in page
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
            <a className='small-text' onClick={() => { setPageStatus(false) }}>Sign Up</a>
          </div>
        </div>
      </div >
    ) : (//false => sign up page
      <div className="back-page">
        <div className="wrapper">
          <div className="text">
            <a className='small-text' onClick={() => { setPageStatus(true) }}>&lt; back</a>
          </div>

          <div className="text-center mt-4 name">Create new account</div>
          <form onSubmit={createUser} className="p-3 mt-3">
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

  )
}

>>>>>>> 21bf9c772bae9c7af8c83d88c5d556e552fac025
LoginPage.propTypes = {}

export default LoginPage
