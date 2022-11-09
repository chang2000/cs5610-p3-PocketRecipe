import React, { useState } from 'react'

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
  return (
    // also create a bunch of Link here
    <div>{`RecipeList ${type}`}</div>
  )
}

export default RecipeList