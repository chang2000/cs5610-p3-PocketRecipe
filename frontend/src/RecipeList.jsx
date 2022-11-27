import "./App.css";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function RecipeList(props) {
  const type = props.type;
  // the recipes stores ids of recipe of the current list
  const [recipes, setRecipes] = useState([]);

  // Do this once page reloaded
  useEffect(() => {
    // TODO: remove hardcode later
    const fetchData = async () => {
      let user = "wang";
      let requestAPI = "";
      if (type === "mine") {
        requestAPI = `/item/getByUser?email=${user}`;
      } else if (type === "discover") {
        requestAPI = `/item/getAllPub`;
      } else if (type === "fav") {
        requestAPI = `/item/getFav?email=${user}`;
      }
      let res = await fetch(requestAPI);
      let data = await res.json();
      setRecipes(data.recipes);
    };

    fetchData();
  }, [type]);

  return (
    <>
      {/* also create a bunch of Link here */}
      <div id="recipe-list">
        {`Current List Type: ${type}`}
        <br></br>
        {/* The following items should be dynamic */}
        <div id="main-list">
          {/* Dynamic render */}
          {recipes.map((item, i) => (
            <Link key={i} to={`/${type}/${item._id}`}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div id="contact">
        <Outlet />
      </div>
    </>
  );
}

export default RecipeList;
