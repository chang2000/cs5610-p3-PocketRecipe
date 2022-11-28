import "../App.css";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

function RecipeList(props) {
  const type = props.type;
  // the recipes stores ids of recipe of the current list
  const [recipes, setRecipes] = useState([]);
  const user = window.localStorage.getItem("email");
  // Do this once page reloaded
  useEffect(() => {
    // TODO: remove hardcode later
    const fetchData = async () => {
      let requestAPI = "";
      if (type === "mine") {
        requestAPI = `/item/getByUser?email=${user}`;
      } else if (type === "discover") {
        requestAPI = "/item/getAllPub";
      } else if (type === "fav") {
        requestAPI = `/item/getFav?email=${user}`;
      }
      let res = await fetch(requestAPI);
      let data = await res.json();
      console.log(data);
      setRecipes(data.recipes);
    };
    fetchData();
  }, [type, user]);

  return (
    <>
      {/* also create a bunch of Link here */}
      <div id="recipe-list">
        {`Current List Type: ${type}`}
        <br></br>
        <nav>
          <ul>
            {/* The following items should be dynamic */}
            {/* Dynamic render */}
            {recipes.map((item, i) => (
              <li>
                <Link key={i} to={`/${type}/${item._id}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id="contact">
        <Outlet />
      </div>
    </>
  );
}

RecipeList.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeList;
