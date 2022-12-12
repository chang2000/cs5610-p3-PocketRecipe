import React, { useState, useEffect, useRef } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import EditableItem from '../components/EditableItem'
import './RecipeDetail.css'

export async function loader({ params }) {
  console.log('the id is', params.id)
  return {
    id: params.id,
  }
}

function RecipeDetail() {
  const data = useLoaderData()
  const id = data.id
  const currUser = window.localStorage.getItem('email')
  const [detail, setDetail] = useState({})
  const [ifPublic, setIfPublic] = useState()
  const [favorited, setFavorited] = useState()
  const [editTimes, setEditTimes] = useState(0)
  const compRef = useRef(null)
  const navigate = useNavigate()
  useEffect(() => {
    compRef.current.focus()
  }, [])

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
  }, [id, ifPublic, favorited, editTimes, currUser])


  const togglePublic = () => {
    const sendRequest = async () => {
      console.log('enter toggel public')
      let requestAPI = '/item/pub'
      let target = !detail.public

      await fetch(requestAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: detail._id,
          public: target,
        }),
      })
      setIfPublic(target)
    }
    sendRequest()
  }

  const toggleFavorite = () => {
    const sendRequest = async () => {
      let requestAPI = '/item/fav'
      let target = !detail.favorite
      await fetch(requestAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: currUser,
          id: detail._id,
          favorite: target,
        }),
      })
      setFavorited(target)
    }
    sendRequest()
  }

  const applyNameChange = async (e) => {
    console.log(e.target)
    let newName = e.target.value
    if (newName == null || newName === '') {
      alert('New Name cannot be empty')
      return
    }
    let newDetail = JSON.parse(JSON.stringify(detail))
    newDetail.name = newName
    newDetail.id = newDetail._id
    let requestAPI = '/item/edit'
    let res = await fetch(requestAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDetail),
    })

    let data = await res.json()
    console.log(data)
    setEditTimes(editTimes + 1)
  }

  const applyDescChange = async (e) => {
    let newVal = e.target.value
    if (newVal == null || newVal === '') {
      alert('New description cannot be empty')
      return
    }
    let newDetail = JSON.parse(JSON.stringify(detail))
    newDetail.description = newVal
    newDetail.id = newDetail._id
    let requestAPI = '/item/edit'
    let res = await fetch(requestAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDetail),
    })
    let data = await res.json()
    console.log(data)
    setEditTimes(editTimes + 1)
  }

  const applyPrepTimeChange = async (e) => {
    let newVal = e.target.value
    if (newVal == null || newVal === '') {
      alert('New prepTime cannot be empty')
      return
    }
    let newDetail = JSON.parse(JSON.stringify(detail))
    newDetail.prepTime = newVal
    newDetail.id = newDetail._id
    let requestAPI = '/item/edit'
    let res = await fetch(requestAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDetail),
    })
    let data = await res.json()
    console.log(data)
    setEditTimes(editTimes + 1)
  }

  const addSubItem = async (e) => {
    let type = e.currentTarget.id
    console.log(type)
    let newDetail = JSON.parse(JSON.stringify(detail))
    if (type === 'ingri-add-btn') {
      newDetail.ingrident.push('Add new')
    } else if (type === 'instru-add-btn') {
      newDetail.instruction.push('Add new')
    } else if (type === 'nurtri-add-btn') {
      newDetail.nutrition.push('Add new')
    } else if (type === 'tag-add-btn') {
      newDetail.tags.push('Add new')
    }
    newDetail.id = newDetail._id
    let requestAPI = '/item/edit'
    let res = await fetch(requestAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDetail),
    })
    let data = await res.json()
    console.log(data)
    setEditTimes(editTimes + 1)
  }

  const deleteSubItem = async (e) => {
    let deleteConfirm = window.confirm('Want to delete?')
    console.log(deleteConfirm)
    if (deleteConfirm) {
      let htmlEleID = e.currentTarget.id
      console.log(htmlEleID)
      let idx = parseInt(htmlEleID.split('-')[0], 10)
      let type = htmlEleID.split('-')[1]
      console.log(type)
      let newDetail = JSON.parse(JSON.stringify(detail))
      if (type === 'ingri') {
        newDetail.ingrident.splice(idx, 1) // remove the idx-th item
      } else if (type === 'instru') {
        newDetail.instruction.splice(idx, 1)
      } else if (type === 'nurtri') {
        newDetail.nutrition.splice(idx, 1)
      } else if (type === 'tag') {
        newDetail.tags.splice(idx, 1)
      }
      newDetail.id = newDetail._id
      let requestAPI = '/item/edit'
      let res = await fetch(requestAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDetail),
      })
      let data = await res.json()
      console.log(data)
      setEditTimes(editTimes + 1)
    }
  }

  const applyItemChange = async (e) => {
    let targetValue = e.target.value
    let targetID = e.currentTarget.id
    console.log(targetValue)
    let idx = targetID.split('-')[0]
    let type = targetID.split('-')[1]
    console.log(targetValue)
    console.log(targetID)
    let newDetail = JSON.parse(JSON.stringify(detail))
    if (type === 'ingri') {
      newDetail.ingrident[idx] = targetValue
    } else if (type === 'instru') {
      newDetail.instruction[idx] = targetValue
    } else if (type === 'nurtri') {
      newDetail.nutrition[idx] = targetValue
    } else if (type === 'tag') {
      newDetail.tags[idx] = targetValue
    }
    newDetail.id = newDetail._id
    let requestAPI = '/item/edit'
    let res = await fetch(requestAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDetail),
    })
    let data = await res.json()
    console.log(data)
    setEditTimes(editTimes + 1)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      console.log(event.target)
      const btn = event.target.querySelectorAll('button')[0]
      btn.click()
    }
  };

  const EditableDetail = () => {
    return (
      <>
        <div className="editable-item-page">
          <div className="" tabIndex={`detail-editable-name`}>
            <EditableItem
              title={'Name'}
              defaultText={detail.name}
              submitFunc={applyNameChange}
            />
          </div>

          <div className="" tabIndex={`detail-editable-desc`}>
            <EditableItem
              title={'Description'}
              defaultText={detail.description}
              submitFunc={applyDescChange}
            />
          </div>

          <div className="" tabIndex={`detail-editable-preptime`}>
            <EditableItem
              title={'Prep Time'}
              defaultText={detail.prepTime.toString()}
              submitFunc={applyPrepTimeChange}
            />

          </div>

          <div className="ingridients" >
            <div className="list-name-title">
              <div className="list-name">Ingrident:</div>

              <button className="mybtn" id="ingri-add-btn" onClick={addSubItem} tabIndex={`detail-ingri-addbtn`}>
                <AddCircleIcon />
              </button>
            </div>

            <div id="ingri-list">
              {detail.ingrident?.map((item, i) => (
                <div className="editable-wrapper"
                  key={i + 'editable-wrapper'}
                  tabIndex='0'
                  onKeyDown={handleKeyDown}
                >
                  <EditableItem
                    key={i}
                    title={i + 1}
                    defaultText={item}
                    submitFunc={applyItemChange}
                    optType="ingri"
                    idx={i}
                  />
                  <button
                    className="btn delete-icon"
                    id={i + '-ingri-delete-icon'}
                    key={i + 'icon-wrapper'}
                    onClick={deleteSubItem}
                  >
                    <DeleteIcon key={i + 'icon'} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="instruction">
            <div className="list-name-title">
              <div className="list-name">Instruction:</div>

              <button className="mybtn" id="instru-add-btn" onClick={addSubItem}>
                <AddCircleIcon />
              </button>
            </div>

            <div className="instru-list">
              {detail.instruction?.map((item, i) => (
                <div className="editable-wrapper"
                  key={i + 'editable-wrapper'}
                  tabIndex='0'
                  onKeyDown={handleKeyDown}
                >
                  <EditableItem
                    key={i}
                    title={i + 1}
                    defaultText={item}
                    submitFunc={applyItemChange}
                    optType="instru"
                    idx={i}
                  />
                  <button
                    className="btn delete-icon"
                    id={i + '-instru-delete-icon'}
                    key={i + 'icon-wrapper'}
                    onClick={deleteSubItem}
                  >
                    <DeleteIcon key={i + 'icon'} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="nutrition">
            <div className="list-name-title">
              <div className="list-name">Nurtrition:</div>

              <button className="mybtn" id="nurtri-add-btn" onClick={addSubItem}>
                <AddCircleIcon />
              </button>
            </div>

            <div className="nurtri-list">
              {detail.nutrition?.map((item, i) => (
                <div className="editable-wrapper"
                  key={i + 'editable-wrapper'}
                  tabIndex='0'
                  onKeyDown={handleKeyDown}
                >

                  <EditableItem
                    key={i}
                    title={i + 1}
                    defaultText={item}
                    submitFunc={applyItemChange}
                    optType="nurtri"
                    idx={i}
                  />
                  <button
                    className="btn delete-icon"
                    id={i + '-nurtri-delete-icon'}
                    key={i + 'icon-wrapper'}
                    onClick={deleteSubItem}
                  >
                    <DeleteIcon key={i + 'icon'} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="tags">
            <div className="list-name-title">
              <div className="list-name">Tags:</div>

              <button className="mybtn" id="tag-add-btn" onClick={addSubItem}>
                <AddCircleIcon />
              </button>
            </div>

            <div className="tag-list">
              {detail.tags?.map((item, i) => (
                <div className="editable-wrapper"
                  key={i + 'editable-wrapper'}
                  tabIndex='0'
                  onKeyDown={handleKeyDown}
                >
                  <EditableItem
                    key={i}
                    title={i + 1}
                    defaultText={item}
                    submitFunc={applyItemChange}
                    optType="tag"
                    idx={i}
                  />
                  <button
                    className="btn delete-icon"
                    id={i + '-tag-delete-icon'}
                    key={i + 'icon-wrapper'}
                    onClick={deleteSubItem}
                  >
                    <DeleteIcon key={i + 'icon'} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  const ViewOnlyDetail = () => {
    return (
      <>
        <div className="view-only-item">
          {/* <div className="list-title">View Only Page</div> */}
          <div className="basic-info">
            <div className="list-title1">Name:</div>
            <div className="view-name"> {detail.name}</div>
          </div>

          <div className="basic-info">
            <div className="list-title1">Description:</div>
            <div className="view-desc"> {detail.desc}</div>
          </div>

          <div className="basic-info">
            <div className="list-title1">Prep Time:</div>
            <div className="view-preptime">{detail.prepTime} minutes</div>
          </div>

          <div className="ingridients">
            <label>
              <div className="list-title2">Ingrident:</div>

              <div id="ingri-list">
                {detail.ingrident?.map((item, i) => (
                  <div className="view-ingri" key={i}>
                    {i + 1}: {item}
                  </div>
                ))}
              </div>
            </label>
          </div>

          <div className="instruction">
            <label>
              <div className="list-title2">Instruction:</div>

              <div className="instru-list">
                {detail.instruction?.map((item, i) => (
                  <div className="view-instru" key={i}>
                    {i + 1}: {item}
                  </div>
                ))}
              </div>
            </label>
          </div>

          <div className="nutrition">
            <label>
              <div className="list-title2">Nurtrition:</div>

              <div className="nurtri-list">
                {detail.nutrition?.map((item, i) => (
                  <div className="view-nurtri" key={i}>
                    {i + 1}: {item}
                  </div>
                ))}
              </div>
            </label>
          </div>

          <div className="tags">
            <label>
              <div className="list-title2">Tags:</div>

              <div className="tag-list">
                {detail.tags?.map((item, i) => (
                  <div className="view-tag" key={i}>
                    {i + 1}: {item}
                  </div>
                ))}
              </div>
            </label>
          </div>
        </div>
      </>
    )
  }

  const deleteRecipe = async () => {
    let deleteConfirm = window.confirm('Want to delete?')
    if (deleteConfirm) {
      let requestAPI = `/item/delete?id=${detail._id}`
      let res = await fetch(requestAPI)
      let data = await res.json()
      console.log(data)
      navigate(0)
    }
  }

  return (
    <div id="recipe-detail" >
      <div>
        {/* {' '} */}
        <div className='detail-recipe-text' ref={compRef} tabIndex='0'></div>
        <div className="list-name-title">
          <div className="author-title">Author:</div>
          <div className='detail-user'> {detail.user}</div>
        </div>
        {/* A recipes visibility CAN ONLY BE CHANGED when it belongs to current user */}
        <div className='visible-box'>
          {/* <div> */}
          <div className='visible-text'>Visibility: </div>
          <div className='visible-btn-whole'>
            {detail.user === currUser ? (
              detail.public ? (
                <button className="visible-btn" onClick={togglePublic}>
                  Public
                </button>
              ) : (
                <button className="visible-btn" onClick={togglePublic}>
                  Private
                </button>
              )
            ) : detail.public ? (
              <div>Public</div>
            ) : (
              <div>Private</div>
            )}
          </div>
          <button className="mybtn" onClick={toggleFavorite}>
            {detail.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button>
        </div>
      </div>
      <div className="">
        {detail.user === currUser ? <EditableDetail /> : <ViewOnlyDetail />}
      </div>

      <div className="foot-delete">
        {detail.user === currUser ? (
          <button id="delete-btn" onClick={deleteRecipe}>
            Delete
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

RecipeDetail.propsType = {}
export default RecipeDetail
