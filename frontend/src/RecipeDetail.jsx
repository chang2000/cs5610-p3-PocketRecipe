import React, { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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
  const [editTimes, setEditTimes] = useState(0)
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
  }, [id, ifPublic, favorited, editTimes])


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

  const applyNameChange = async (e) => {
    let newName = e.target.value
    if (newName == null || newName === "") {
      alert("New Name cannot be empty")
      return
    }
    let newDetail = JSON.parse(JSON.stringify(detail))
    newDetail.name = newName
    newDetail.id = newDetail._id
    let requestAPI = "/item/edit"
    let res = await fetch(requestAPI, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDetail)
    })

    let data = await res.json()
    console.log(data)
    setEditTimes(editTimes + 1)
  }

  const applyDescChange = async (e) => {
    let newVal = e.target.value
    if (newVal == null || newVal === "") {
      alert("New description cannot be empty")
      return
    }
    let newDetail = JSON.parse(JSON.stringify(detail))
    newDetail.description = newVal
    newDetail.id = newDetail._id
    let requestAPI = "/item/edit"
    let res = await fetch(requestAPI, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDetail)
    })
    let data = await res.json()
    console.log(data)
    setEditTimes(editTimes + 1)
  }

  const applyPrepTimeChange = async (e) => {
    let newVal = e.target.value
    if (newVal == null || newVal === "") {
      alert("New prepTime cannot be empty")
      return
    }
    let newDetail = JSON.parse(JSON.stringify(detail))
    newDetail.prepTime = newVal
    newDetail.id = newDetail._id
    let requestAPI = "/item/edit"
    let res = await fetch(requestAPI, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDetail)
    })
    let data = await res.json()
    console.log(data)
    setEditTimes(editTimes + 1)
  }

  const addSubItem = async (e) => {
    let type = e.currentTarget.id
    console.log(type)
    let newDetail = JSON.parse(JSON.stringify(detail))
    if (type === "ingri-add-btn") {
      newDetail.ingrident.push("New ingri")
    } else if (type === "instru-add-btn") {
      newDetail.instruction.push("New step...")
    } else if (type === "nurtri-add-btn") {
      newDetail.nutrition.push("New nurtrition item...")
    } else if (type === "tag-add-btn") {
      newDetail.tags.push("New Tag...")
    }
    newDetail.id = newDetail._id
    let requestAPI = "/item/edit"
    let res = await fetch(requestAPI, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDetail)
    })
    let data = await res.json()
    console.log(data)
    setEditTimes(editTimes + 1)
  }

  const deleteSubItem = async (e) => {
    let deleteConfirm = window.confirm("Want to delete?")
    console.log(deleteConfirm)

    if (deleteConfirm) {
      let htmlEleID = e.currentTarget.id
      console.log(htmlEleID)
      let idx = parseInt(htmlEleID.split("-")[0], 10)
      let type = htmlEleID.split("-")[1]
      console.log(type)
      let newDetail = JSON.parse(JSON.stringify(detail))
      if (type === "ingri") {
        newDetail.ingrident.splice(idx, 1) // remove the idx-th item
      } else if (type === "instru") {
        newDetail.instruction.splice(idx, 1)
      } else if (type === "nurtri") {
        newDetail.nutrition.splice(idx, 1)
      } else if (type === "tag") {
        newDetail.tags.splice(idx, 1)
      }
      newDetail.id = newDetail._id
      let requestAPI = "/item/edit"
      let res = await fetch(requestAPI, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDetail)
      })
      let data = await res.json()
      console.log(data)
      setEditTimes(editTimes + 1)
    }
  }

  const applyItemChange = async (e) => {
    let targetValue = e.target.value
    let targetID = e.currentTarget.id
    let idx = targetID.split('-')[0]
    let type = targetID.split('-')[1]
    console.log(targetValue)
    console.log(targetID)
    let newDetail = JSON.parse(JSON.stringify(detail))
    if (type === "ingri") {
      newDetail.ingrident[idx] = targetValue
    } else if (type === "instru") {
      newDetail.instruction[idx] = targetValue
    } else if (type === "nurtri") {
      newDetail.nutrition[idx] = targetValue
    } else if (type === "tag") {
      newDetail.tags[idx] = targetValue
    }
    newDetail.id = newDetail._id
    let requestAPI = "/item/edit"
    let res = await fetch(requestAPI, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDetail)
    })
    let data = await res.json()
    console.log(data)
    setEditTimes(editTimes + 1)
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
          <EditableItem title={"Name"} defaultText={detail.name} submitFunc={applyNameChange} />
        </div>

        <div>ID: {detail._id}</div>
        <div>Author: {detail.user}</div>
        <div className="">
          <EditableItem title={"Description"} defaultText={detail.description} submitFunc={applyDescChange} />
        </div>

        <div className="">
          <EditableItem title={"Prep Time"} defaultText={detail.prepTime} submitFunc={applyPrepTimeChange} />
          seconds
        </div>

        <div className=''>
          Ingrident:
          <button className='btn' id='ingri-add-btn' onClick={addSubItem}>
            <AddCircleIcon />
          </button>

          <div id='ingri-list'>
            {
              detail.ingrident?.map((item, i) =>
                <div className="editable-wrapper" key={i + "editable-wrapper"}>
                  <EditableItem key={i} title={i + 1} defaultText={item} submitFunc={applyItemChange} optType="ingri" idx={i} />
                  <button className="btn delete-icon" id={i + "-ingri-delete-icon"} key={i + "icon-wrapper"} onClick={deleteSubItem}>
                    <DeleteIcon key={i + "icon"} />
                  </button>
                </div>
              )
            }
          </div>
        </div>

        <div>Instruction:
          <button className='btn' id='instru-add-btn' onClick={addSubItem}>
            <AddCircleIcon />
          </button>

          <div className="instru-list">
            {
              detail.instruction?.map((item, i) =>
                <div className="editable-wrapper" key={i + "editable-wrapper"}>
                  <EditableItem key={i} title={i + 1} defaultText={item} submitFunc={applyItemChange} optType="instru" idx={i} />
                  <button className="btn delete-icon" id={i + "-instru-delete-icon"} key={i + "icon-wrapper"} onClick={deleteSubItem}>
                    <DeleteIcon key={i + "icon"} />
                  </button>
                </div>
              )
            }
          </div>
        </div>

        <div>Nurtrition:
          <button className='btn' id="nurtri-add-btn" onClick={addSubItem}>
            <AddCircleIcon />
          </button>
          <div className="nurtri-list">
            {
              detail.nutrition?.map((item, i) =>
                <div className="editable-wrapper" key={i + "editable-wrapper"}>
                  <EditableItem key={i} title={i + 1} defaultText={item} submitFunc={applyItemChange} optType="nurtri" idx={i} />
                  <button className="btn delete-icon" id={i + "-nurtri-delete-icon"} key={i + "icon-wrapper"} onClick={deleteSubItem}>
                    <DeleteIcon key={i + "icon"} />
                  </button>
                </div>
              )
            }
          </div>
        </div>
        <div>Tags:
          <button className='btn' id="tag-add-btn" onClick={addSubItem}>
            <AddCircleIcon />
          </button>
          <div className="tag-list">
            {
              detail.tags?.map((item, i) =>
                <div className="editable-wrapper" key={i + "editable-wrapper"}>
                  <EditableItem key={i} title={i + 1} defaultText={item} submitFunc={applyItemChange} optType="tag" idx={i} />
                  <button className="btn delete-icon" id={i + "-tag-delete-icon"} key={i + "icon-wrapper"} onClick={deleteSubItem}>
                    <DeleteIcon key={i + "icon"} />
                  </button>
                </div>
              )
            }
          </div>
        </div>


      </div>

    </div >
  )
}

export default RecipeDetail