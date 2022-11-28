import React, { useState, useEffect } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditableItem from '../components/EditableItem'
import { useNavigate } from 'react-router-dom'

const RecipeCreate = () => {
  const [ingridients, setIngridients] = useState(['Click here to edit...'])
  const [instructions, setInstructions] = useState(['Click here to edit...'])
  const [nurtritions, setNurtritions] = useState(['Click here to edit...'])
  const [tags, setTags] = useState(['Click here to edit...'])

  const navigate = useNavigate()
  useEffect(() => {}, [ingridients, instructions, nurtritions, tags])

  const addSubItem = (e) => {
    console.log('enter add sub item')
    let type = e.currentTarget.id
    if (type === 'newrecipe-ingri-add-btn') {
      let tmp = JSON.parse(JSON.stringify(ingridients))
      tmp.push('Click here to add new Ingridients....')
      setIngridients(tmp)
    } else if (type === 'newrecipe-instru-add-btn') {
      let tmp = JSON.parse(JSON.stringify(instructions))
      tmp.push('Click here to add a new instruction....')
      setInstructions(tmp)
    } else if (type === 'newrecipe-nurtri-add-btn') {
      let tmp = JSON.parse(JSON.stringify(nurtritions))
      tmp.push('Click here to add a new instruction....')
      setNurtritions(tmp)
    } else if (type === 'newrecipe-tag-add-btn') {
      let tmp = JSON.parse(JSON.stringify(tags))
      tmp.push('Click here to add a new instruction....')
      setTags(tmp)
    }
  }

  const applyItemChange = (e) => {
    let targetValue = e.target.value
    let targetID = e.currentTarget.id
    console.log(targetID)
    let idx = targetID.split('-')[0]
    let type = targetID.split('-')[1]

    if (type === 'ingri') {
      let tmp = JSON.parse(JSON.stringify(ingridients))
      tmp[idx] = targetValue
      setIngridients(tmp)
    } else if (type === 'instru') {
      let tmp = JSON.parse(JSON.stringify(instructions))
      tmp[idx] = targetValue
      setInstructions(tmp)
    } else if (type === 'nurtri') {
      let tmp = JSON.parse(JSON.stringify(nurtritions))
      tmp[idx] = targetValue
      setNurtritions(tmp)
    } else if (type === 'tag') {
      let tmp = JSON.parse(JSON.stringify(tags))
      tmp[idx] = targetValue
      setTags(tmp)
    }
  }

  const deleteSubItem = (e) => {
    let deleteConfirm = window.confirm('Want to delete?')

    if (deleteConfirm) {
      let htmlEleID = e.currentTarget.id
      let idx = parseInt(htmlEleID.split('-')[0], 10)
      let type = htmlEleID.split('-')[1]
      if (type === 'ingri') {
        let tmp = JSON.parse(JSON.stringify(ingridients))
        tmp.splice(idx, 1)
        setIngridients(tmp)
      } else if (type === 'instru') {
        let tmp = JSON.parse(JSON.stringify(instructions))
        tmp.splice(idx, 1)
        setInstructions(tmp)
      } else if (type === 'nurtri') {
        let tmp = JSON.parse(JSON.stringify(nurtritions))
        tmp.splice(idx, 1)
        setNurtritions(tmp)
      } else if (type === 'tag') {
        let tmp = JSON.parse(JSON.stringify(tags))
        tmp.splice(idx, 1)
        setTags(tmp)
      }
    }
  }

  const createRecipe = (e) => {
    e.preventDefault()
  }

  const submitRecipe = async (e) => {
    console.log('I mean it... please submit', e.target)
    let currUser = window.localStorage.getItem('email')
    let name = document.getElementById('newrecipe-input-name').value
    let desc = document.getElementById('newrecipe-input-desc').value
    let prepTime = document.getElementById('newrecipe-input-preptime').value
    let visibility = document.getElementById('visibility-select').value
    let ifPublic = visibility === 'public'
    let recipeInfo = {
      email: currUser,
      itemName: name,
      description: desc,
      prepTime: prepTime,
      ingrident: ingridients,
      instruction: instructions,
      nurtritions: nurtritions,
      tags: tags,
      public: ifPublic,
    }

    let apiURL = '/item/create'
    let res = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeInfo),
    })
    let data = await res.json()
    let curRecipeID = data.id
    navigate(`/mine/${curRecipeID}`)
    window.location.reload()
  }

  return (
    <div className="recipe-create-view">
      <div className="top-menu">
        <div className="create-title">Create a New Recipe</div>
        <label>
          <span className="visible">Visibility:</span>

          <select className="visibility" id="visibility-select">
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </label>
      </div>

      <form onSubmit={createRecipe} id="new-recipe">
        <label className="newrecipe-name">
          <div className="list-title1">Name:</div>
          <input id="newrecipe-input-name"></input>
        </label>

        <label className="newrecipe-desc">
          <span>Description:</span>
          <input id="newrecipe-input-desc"></input>
        </label>

        <label className="newrecipe-preptime">
          <span>Prep Time</span>

          <input id="newrecipe-input-preptime"></input>
          {/* right align */}
          <span>minutes</span>
        </label>

        <div className="newrecipe-ingridient">
          <div className="list-name-title">
            <div className="list-name">Ingridients:</div>
            <button
              className="btn"
              id="newrecipe-ingri-add-btn"
              onClick={addSubItem}
            >
              <AddCircleIcon />
            </button>
          </div>

          {ingridients?.map((item, i) => (
            <div className="editable-wrapper" key={i + 'editable-wrapper'}>
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
                id={i + '-ingri-delete-icon-newrecipe'}
                key={i + 'icon-wrapper'}
                onClick={deleteSubItem}
              >
                <DeleteIcon key={i + 'icon'} />
              </button>
            </div>
          ))}
        </div>

        <div className="newrecipe-instruction">
          <div className="list-name-title">
            <div className="list-name">Instructions:</div>
            <button
              className="btn"
              id="newrecipe-instru-add-btn"
              onClick={addSubItem}
            >
              <AddCircleIcon />
            </button>
          </div>

          {instructions?.map((item, i) => (
            <div className="editable-wrapper" key={i + 'editable-wrapper'}>
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
                id={i + '-instru-delete-icon-newrecipe'}
                key={i + 'icon-wrapper'}
                onClick={deleteSubItem}
              >
                <DeleteIcon key={i + 'icon'} />
              </button>
            </div>
          ))}
        </div>

        <div className="newrecipe-nurtritions">
          <div className="list-name-title">
            <div className="list-name">Nurtritions:</div>
            <button
              className="btn"
              id="newrecipe-nurtri-add-btn"
              onClick={addSubItem}
            >
              <AddCircleIcon />
            </button>
          </div>

          {nurtritions?.map((item, i) => (
            <div className="editable-wrapper" key={i + 'editable-wrapper'}>
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
                id={i + '-nurtri-delete-icon-newrecipe'}
                key={i + 'icon-wrapper'}
                onClick={deleteSubItem}
              >
                <DeleteIcon key={i + 'icon'} />
              </button>
            </div>
          ))}
        </div>

        <div className="newrecipe-tags">
          <div className="list-name-title">
            <div className="list-name">Tags:</div>
            <button
              className="btn"
              id="newrecipe-tag-add-btn"
              onClick={addSubItem}
            >
              <AddCircleIcon />
            </button>
          </div>

          {tags?.map((item, i) => (
            <div className="editable-wrapper" key={i + 'editable-wrapper'}>
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
                id={i + '-tag-delete-icon-newrecipe'}
                key={i + 'icon-wrapper'}
                onClick={deleteSubItem}
              >
                <DeleteIcon key={i + 'icon'} />
              </button>
            </div>
          ))}
        </div>

        <div className="btn-down">
          <button className="normal-btn" type="submit" onClick={submitRecipe}>
            Save
          </button>

          <button
            id="cancel-btn"
            onClick={() => {
              navigate(-1)
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

RecipeCreate.propTypes = {}

export default RecipeCreate
