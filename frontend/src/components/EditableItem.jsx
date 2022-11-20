import React from 'react'
import { useState, useEffect } from 'react'
import "./EditableItem.css"
const EditableItem = (props) => {
  const { title, defaultText } = props
  const [isE, setIsE] = useState(false)
  useEffect(() => {
    console.log()
  }, [isE])

  const toggleEditing = () => {
    setIsE(!isE)
  }

  return (
    <div className="editable-item">
      {title + ": "}
      {

        isE ?
          <input className='editable-item-input'
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