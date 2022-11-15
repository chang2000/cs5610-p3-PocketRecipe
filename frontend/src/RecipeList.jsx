import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import RecipeDetail from './RecipeDetail'
import axios from 'axios'

function RecipeList(props) {
  const type = props.type
  // the recipes stores ids of recipe of the current list 
  const [recipes, setRecipes] = useState([])

  // Do this once page reloaded
  useEffect(() => {
    // TODO: remove hardcode later
    let user = "wang"
    let requestAPI = ""
    if (type === "mine") {
      requestAPI = `/item/getByUser?email=${user}`
    } else if (type === "discover") {
      requestAPI = `/item/getAllPub`
    } else if (type === "fav") {
      requestAPI = `/item/getFav?email=${user}`
    }

    let query = "http://localhost:5555" + requestAPI
    axios.get(query).then(
      res => {
        console.log(res.data)
      }
    )







  }, [type])

  /**
   * TODO
   * Design a recipe object here
   * set a recipe as state
   * fetch the list while useEffect()=>{, []}  // page loading
   * Automatically render the the first recipe it found
   * 
   */
  // const detail = {
  //   name: "Medium Rare Steak",
  //   id: 1
  // }

  return (
    // also create a bunch of Link here
    <div id="recipe-list">
      {`Current List Type: ${type}`}
      <br></br>
      {/* The following items should be dynamic */}
      <Link to={`/${type}/1`}>
        Link to recipe 1
      </Link>

      <Link to={`/${type}/2`}>
        Link to recipe 2
      </Link>

      <Outlet />
    </div>
  )
}

export default RecipeList