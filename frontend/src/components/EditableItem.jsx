import React from 'react'
import { useState, useEffect } from 'react'
import "./EditableItem.css"
const EditableItem = (props) => {
  const { title, defaultText, submitFunc, optType, idx } = props
  const [isE, setIsE] = useState(false)
  useEffect(() => {
    console.log()
  }, [isE])

  const toggleEditing = (e) => {
    if (isE) {
      submitFunc(e)
    }
    setIsE(!isE)
  }

  return (
    <div className="editable-item">
      {title + ": "}
      {

        isE ?
          <input className="editable-item-input"
            id={`${idx}-${optType}`}
            autoFocus
            defaultValue={defaultText}
            onBlur={toggleEditing}
          />
          :
          <div className="editable-item-display"
            onClick={toggleEditing}
          >
            {defaultText}
          </div>
      }
    </div>
  )
}

export default EditableItem