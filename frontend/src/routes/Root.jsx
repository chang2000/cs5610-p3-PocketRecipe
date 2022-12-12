import React, { useEffect } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

function Root() {
  function logOut() {
    confirmAlert({
      title: 'Want to log out?',
      // message: 'Are you sure to log out?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            window.localStorage.removeItem('email')
            window.location.reload(true)
          },
        },
        {
          label: 'No',
        },
      ],
    })
  }
  const navigate = useNavigate()
  const createNewRecipe = (e) => {
    e.preventDefault()
    console.log('enter create new recipe')
    navigate('/mine/new')
  }
  let curUser = window.localStorage.getItem('email')
  useEffect(() => {
    navigate('/mine')
  }, [])
  return (
    <>
      <div id="whole-page">
        <div id="category-bar">
          <h1 id="cur-user">Current user: {curUser}</h1>

          <h1>
          <button id="log-out" onClick={logOut}>
            Log Out
          </button>
          </h1>
          

          <div className='whole-title'>
            <div className='whole-title-text'>
              Pocket recipe
            </div>

            <form onSubmit={createNewRecipe}>
              <button className="normal-btn" type="submit">New Recipe</button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink
                  to={'mine'}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  My Recipes
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={'fav'}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  Favorites
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={'discover'}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  Discover
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <Outlet />
      </div>
    </>
  )
}
Root.propsType = {}

export default Root
