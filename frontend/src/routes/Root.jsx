import React from "react";
import { Link, Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <div id="category-bar">
        <h1>Current user:</h1>
        <button id="log-out">Log Out</button>
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
          <form method="post">
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
    </>
  );
}

export default Root;
