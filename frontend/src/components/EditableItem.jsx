import React from 'react'
import { useState, useEffect } from 'react'
import './EditableItem.css'
import PropTypes from 'prop-types'

const EditableItem = (props) => {
  // eslint-disable-next-line react/prop-types
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
      <div className="item-title">{title + ': '}</div>
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

EditableItem.propTypes = {
  title: PropTypes.any.isRequired,
  defaultText: PropTypes.string,
  submitFunc: PropTypes.func.isRequired,
  optType: PropTypes.string,
  idx: PropTypes.number
}

export default EditableItem