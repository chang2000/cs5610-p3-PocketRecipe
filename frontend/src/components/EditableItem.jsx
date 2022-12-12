import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './EditableItem.css'
import PropTypes from 'prop-types'

const EditableItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { title, defaultText, submitFunc, optType, idx } = props
  const [isE, setIsE] = useState(false)
  const editingRef = useRef(null)
  const viewRef = useRef(null)
  useEffect(() => {
    console.log()
  }, [isE])

  const toggleEditing = (e) => {
    console.log('enter toggle editing')
    if (isE) {
      submitFunc(e)
    }
    setIsE(!isE)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (isE) {
        editingRef.current.blur()
      } else {
        viewRef.current.focus()
        toggleEditing()
      }
    }
  };

  return (
    <div className="editable-item" >
      <div className="item-title">{title + ': '}</div>
      {

        isE ?
          <input className="editable-item-input"
            id={`${idx}-${optType}`}
            autoFocus
            defaultValue={defaultText}
            onBlur={toggleEditing}
            onKeyDown={handleKeyDown}
            ref={editingRef}
          />
          :
          <div className="editable-item-display"
            onClick={toggleEditing}
            tabIndex='0'
            onKeyDown={handleKeyDown}
            ref={viewRef}
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