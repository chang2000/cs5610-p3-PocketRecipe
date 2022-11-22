import React, { useState, useEffect } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableItem from './components/EditableItem';
const RecipeCreate = () => {
  const [ingridients, setIngridients] = useState(["Click here to edit..."])
  const [instructions, setInstructions] = useState(["Click here to edit..."])
  const [nurtritions, setNurtritions] = useState(["Click here to edit..."])
  const [tags, setTags] = useState(["Click here to edit..."])

  useEffect(() => {
  }, [ingridients, instructions, nurtritions, tags])


  const addSubItem = (e) => {
    console.log('enter add sub item')
    let type = e.currentTarget.id
    if (type === 'newrecipe-ingri-add-btn') {
      let tmp = JSON.parse(JSON.stringify(ingridients))
      tmp.push("Click here to add new Ingridients....")
      setIngridients(tmp)
    } else if (type === 'newrecipe-instru-add-btn') {
      let tmp = JSON.parse(JSON.stringify(instructions))
      tmp.push("Click here to add a new instruction....")
      setInstructions(tmp)
    } else if (type === 'newrecipe-nurtri-add-btn') {
      let tmp = JSON.parse(JSON.stringify(nurtritions))
      tmp.push("Click here to add a new instruction....")
      setNurtritions(tmp)
    } else if (type === 'newrecipe-tag-add-btn') {
      let tmp = JSON.parse(JSON.stringify(tags))
      tmp.push("Click here to add a new instruction....")
      setTags(tmp)
    }

  }

  const applyItemChange = (e) => {
    let targetValue = e.target.value
    let targetID = e.currentTarget.id
    console.log(targetID)
    let idx = targetID.split('-')[0]
    let type = targetID.split('-')[1]

    if (type === "ingri") {
      let tmp = JSON.parse(JSON.stringify(ingridients))
      tmp[idx] = targetValue
      setIngridients(tmp)
    } else if (type === "instru") {
      let tmp = JSON.parse(JSON.stringify(instructions))
      tmp[idx] = targetValue
      setInstructions(tmp)
    } else if (type === "nurtri") {
      let tmp = JSON.parse(JSON.stringify(nurtritions))
      tmp[idx] = targetValue
      setNurtritions(tmp)
    } else if (type === "tag") {
      let tmp = JSON.parse(JSON.stringify(tags))
      tmp[idx] = targetValue
      setTags(tmp)
    }
  }


  const deleteSubItem = (e) => {
    let deleteConfirm = window.confirm("Want to delete?")

    if (deleteConfirm) {
      let htmlEleID = e.currentTarget.id
      let idx = parseInt(htmlEleID.split("-")[0], 10)
      let type = htmlEleID.split("-")[1]
      if (type === "ingri") {
        let tmp = JSON.parse(JSON.stringify(ingridients))
        tmp.splice(idx, 1)
        setIngridients(tmp)
      } else if (type === "instru") {
        let tmp = JSON.parse(JSON.stringify(instructions))
        tmp.splice(idx, 1)
        setInstructions(tmp)
      } else if (type === "nurtri") {
        let tmp = JSON.parse(JSON.stringify(nurtritions))
        tmp.splice(idx, 1)
        setNurtritions(tmp)
      } else if (type === "tag") {
        let tmp = JSON.parse(JSON.stringify(tags))
        tmp.splice(idx, 1)
        setTags(tmp)
      }
    }

  }

  const createRecipe = (e) => {
    e.preventDefault()
    console.log('created')
  }

  const submitRecipe = (e) => {
    console.log(e.target)
    console.log('I mean it...')
  }



  return (
    <div className="recipe-create-view">
      <h1>Create a New Recipe</h1>
      <form onSubmit={createRecipe}>
        <div className="newrecipe-name">
          Name: <input></input>
        </div>

        <div className="newrecipe-desc">
          Description: <input></input>
        </div>

        <div className="newrecipe-preptime">
          Prep Time
          <input></input>
          minutes
        </div>

        <div className="newrecipe-ingridient">
          <h2>Ingridients</h2>
          <button className='btn' id='newrecipe-ingri-add-btn' onClick={addSubItem}>
            <AddCircleIcon />
          </button>

          {
            ingridients?.map((item, i) =>
              <div className="editable-wrapper" key={i + "editable-wrapper"}>
                <EditableItem key={i} title={i + 1} defaultText={item}
                  submitFunc={applyItemChange} optType='ingri' idx={i} />
                <button className="btn delete-icon" id={i + "-ingri-delete-icon-newrecipe"} key={i + "icon-wrapper"} onClick={deleteSubItem}>
                  <DeleteIcon key={i + "icon"} />
                </button>
              </div>
            )
          }
        </div>

        <div className="newrecipe-instruction">
          <h2>Instructions: </h2>
          <button className='btn' id='newrecipe-instru-add-btn' onClick={addSubItem}>
            <AddCircleIcon />
          </button>

          {
            instructions?.map((item, i) =>
              <div className="editable-wrapper" key={i + "editable-wrapper"}>
                <EditableItem key={i} title={i + 1} defaultText={item}
                  submitFunc={applyItemChange} optType='instru' idx={i} />
                <button className="btn delete-icon" id={i + "-instru-delete-icon-newrecipe"} key={i + "icon-wrapper"} onClick={deleteSubItem}>
                  <DeleteIcon key={i + "icon"} />
                </button>
              </div>
            )
          }
        </div>

        <div className="newrecipe-nurtritions">
          <h2>Nurtritions: </h2>
          <button className='btn' id='newrecipe-nurtri-add-btn' onClick={addSubItem}>
            <AddCircleIcon />
          </button>

          {
            nurtritions?.map((item, i) =>
              <div className="editable-wrapper" key={i + "editable-wrapper"}>
                <EditableItem key={i} title={i + 1} defaultText={item}
                  submitFunc={applyItemChange} optType='nurtri' idx={i} />
                <button className="btn delete-icon" id={i + "-nurtri-delete-icon-newrecipe"} key={i + "icon-wrapper"} onClick={deleteSubItem}>
                  <DeleteIcon key={i + "icon"} />
                </button>
              </div>
            )
          }
        </div>

        <div className="newrecipe-tags">
          <h2>Tags: </h2>
          <button className='btn' id='newrecipe-tag-add-btn' onClick={addSubItem}>
            <AddCircleIcon />
          </button>

          {
            tags?.map((item, i) =>
              <div className="editable-wrapper" key={i + "editable-wrapper"}>
                <EditableItem key={i} title={i + 1} defaultText={item}
                  submitFunc={applyItemChange} optType='tag' idx={i} />
                <button className="btn delete-icon" id={i + "-tag-delete-icon-newrecipe"} key={i + "icon-wrapper"} onClick={deleteSubItem}>
                  <DeleteIcon key={i + "icon"} />
                </button>
              </div>
            )
          }
        </div>

        <button type='submit' onClick={submitRecipe}>
          Save
        </button>
      </form>

    </div>
  )
}

export default RecipeCreate