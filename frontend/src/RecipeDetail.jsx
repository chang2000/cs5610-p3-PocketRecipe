import React from 'react'
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  console.log("the id is", params.id)
  return {
    id: params.id,
    name: "Medium Rare Steak"
  }
}

function RecipeDetail() {
  const detail = useLoaderData()
  const name = detail.name;
  const id = detail.id;
  return (
    <div>This is Recipe Detail of {name}, the id is {id}!
    </div>
  )
}

export default RecipeDetail