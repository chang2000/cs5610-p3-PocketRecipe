import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./Root.css"
function Root() {
  return (
    <div id='router-root'>
      <div id='category-bar'>
        <nav>
          <li>
            <Link to={`mine`}>My Recipes</Link>
          </li>

          <li>
            <Link to={`fav`}>Favorites</Link>
          </li>

          <li>
            <Link to={`discover`}>Discover</Link>
          </li>

        </nav>
      </div>

      <div id="content">
        <Outlet />
      </div>

    </div >
  )
}

export default Root