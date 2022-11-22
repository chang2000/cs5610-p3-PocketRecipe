import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function Root() {
  function logOut() {
    confirmAlert({
      title: 'Want to log out?',
      // message: 'Are you sure to log out?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            window.localStorage.removeItem("email");
            window.location.reload(true);
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }
  const navigate = useNavigate()
  const createNewRecipe = (e) => {
    e.preventDefault()
    console.log('enter create new recipe')
    navigate("/mine/new")
  }
  return (
    <>
      <div id="whole-page">
        <div id="category-bar">
          <h1>Current user:</h1>

          <button id="log-out" onClick={logOut}>
            Log Out
          </button>

          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
              <div className="sr-only" aria-live="polite"></div>
            </form>

            <form onSubmit={createNewRecipe}>

              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={`mine`}>My Recipes</Link>
              </li>

              <li>
                <Link to={`fav`}>Favorites</Link>
              </li>

              <li>
                <Link to={`discover`}>Discover</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div id="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}



export default Root;
