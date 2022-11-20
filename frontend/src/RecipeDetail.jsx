import React, { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import EditableItem from './components/EditableItem';
import "./RecipeDetail.css"

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
  const [ifPublic, setIfPublic] = useState()
  const [favorited, setFavorited] = useState()

  const currUser = "wang"

  useEffect(() => {
    // get detail by id
    const fetchData = async () => {
      let requestAPI = `/item/detail?id=${id}&email=${currUser}`
      let res = await fetch(requestAPI)
      let data = await res.json()
      console.log(data.detail)
      setDetail(data.detail)
    }
    fetchData()
  }, [id, ifPublic, favorited])


  const togglePublic = () => {
    const sendRequest = async () => {
      console.log('enter toggel public')
      let requestAPI = "/item/pub"
      let target = !detail.public

      await fetch(requestAPI, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            id: detail._id,
            public: target
          }
        )
      })
      setIfPublic(target)
    }
    sendRequest()
  }

  const toggleFavorite = () => {
    const sendRequest = async () => {
      let requestAPI = "/item/fav"
      let target = !detail.favorite
      await fetch(requestAPI, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: currUser,
          id: detail._id,
          favorite: target
        })
      })
      setFavorited(target)
    }

    sendRequest()
  }



  return (
    <div id="recipe-detail">
      <div> <b>Recipe Detail: </b>
        {/* A recipes visibility CAN ONLY BE CHANGED when it belongs to current user */}
        <div>Visibility:
          {
            detail.user === currUser ? (
              detail.public ? (
                <button onClick={togglePublic}>Public</button>
              ) : (
                <button onClick={togglePublic}>Private</button>
              )
            ) : (
              detail.public ? (
                <div>Public</div>
              ) : (
                <div>Private</div>
              )
            )
          }
        </div>

        <button className='btn' onClick={toggleFavorite}>
          {
            detail.favorite ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )
          }

        </button>
      </div>
      <div className="">
        <div className="">
          <EditableItem title={"Name"} defaultText={detail.name} />
        </div>

        <div>ID: {detail._id}</div>
        <div>Author: {detail.user}</div>
        <div className="">
          <EditableItem title={"Description"} defaultText={detail.description} />
        </div>

        <div className="">
          <EditableItem title={"Prep Time"} defaultText={detail.prepTime + " seconds"} />
        </div>

        <div className=''>
          Ingrident:
          <button className='btn'><AddCircleIcon /> </button>

          {
            detail.ingrident?.map((item, i) =>
              <div className="editable-wrapper" key={i + "editable-wrapper"}>
                <EditableItem key={i} title={i + 1} defaultText={item} />
                <button className="btn delete-icon" key={i + "icon-wrapper"}>
                  <DeleteIcon key={i + "icon"} />
                </button>
              </div>
            )
          }
        </div>

        <div>Instruction:
          <button className='btn'><AddCircleIcon /> </button>
          {
            detail.instruction?.map((item, i) =>
              <div className="editable-wrapper" key={i + "editable-wrapper"}>
                <EditableItem key={i} title={i + 1} defaultText={item} />
                <button className="btn delete-icon" key={i + "icon-wrapper"}>
                  <DeleteIcon key={i + "icon"} />
                </button>
              </div>
            )
          }
        </div>

        <div>Nurtrition:
          <button className='btn'><AddCircleIcon /> </button>
          {
            detail.nutrition?.map((item, i) =>
              <div className="editable-wrapper" key={i + "editable-wrapper"}>
                <EditableItem key={i} title={i + 1} defaultText={item} />
                <button className="btn delete-icon" key={i + "icon-wrapper"}>
                  <DeleteIcon key={i + "icon"} />
                </button>
              </div>
            )
          }
        </div>
        <div>Tags:
          <button className='btn'><AddCircleIcon /> </button>
          {
            detail.tags?.map((item, i) =>
              <div className="editable-wrapper" key={i + "editable-wrapper"}>
                <EditableItem key={i} title={i + 1} defaultText={item} />
                <button className="btn delete-icon" key={i + "icon-wrapper"}>
                  <DeleteIcon key={i + "icon"} />
                </button>
              </div>
            )
          }
        </div>


      </div>

    </div >
  )
}

export default RecipeDetail