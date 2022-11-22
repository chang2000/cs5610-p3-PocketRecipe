import React from 'react'

const RecipeCreate = () => {

  const createRecipe = () => {

  }

  return (
    <div className="recipe-create-view">
      <form onSubmit={createRecipe}>
        <div className="newrecipe-name">
          <input></input>
        </div>

        <div className="newrecipe-desc">
          <input></input>
        </div>

        <div className="newrecipe-preptime">
          <input></input>
        </div>

        <div className="newrecipe">
          <input></input>
        </div>

      </form>

    </div>
  )
}

export default RecipeCreate