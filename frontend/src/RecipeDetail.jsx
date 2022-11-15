import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  console.log("the id is", params.id)
  return {
    id: params.id,
  }
}

function RecipeDetail() {
  const data = useLoaderData()
  const id = data.id;

  const [detail, setDetail] = useState({})



  useEffect(() => {
    // get detail by id
    let requestAPI = `/item/detail?id=${id}`
    let query = "http://localhost:5555" + requestAPI
    axios.get(query).then(
      res => {
        console.log(res.data.detail)
        setDetail(res.data.detail)
        console.log(res.data.detail.ingrident)
      }
    )
  }, [id])


  return (
    <div id="recipe-detail">
      <div> <b>Recipe Detail: </b></div>
      <div>Name: {detail.name}</div>
      <div>ID: {detail._id}</div>
      <div>Author: {detail.user}</div>
      <div>Description: {detail.description}</div>
      <div>Prep Time: {detail.prepTime} seconds</div>

      <div>Ingrident:
        {
          detail.ingrident?.map((item, i) => <li key={i}> {item} </li>)
        }
      </div>

      <div>Instruction:
        {
          detail.instruction?.map((item, i) => <li key={i}> {item} </li>)
        }
      </div>
      <div>Nurtrition:
        {
          detail.nutrition?.map((item, i) => <li key={i}> {item} </li>)
        }
      </div>
      <div>Tags:
        {
          detail.tags?.map((item, i) => <li key={i}> {item} </li>)
        }
      </div>

      <div>Visibility:
        {detail.public ? (
          " Public"
        ) : (
          " Private"
        )}
      </div>

    </div >
  )
}

export default RecipeDetail