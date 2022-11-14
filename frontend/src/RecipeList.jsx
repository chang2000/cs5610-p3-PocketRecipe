import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import RecipeDetail from './RecipeDetail'

function RecipeList(props) {
  const type = props.type
  const [recipes, setRecipes] = useState([])
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
    <div>
      {`RecipeList ${type}`}
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