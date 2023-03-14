import React from 'react'
import { useState } from 'react'

const SingleLineInputProperty = () => {
  const [inputtext, setinputtext] = useState({
    label: '',
    min_length: '',
    max_length: '',
    default_value: '',
    placeholder: '',
    required: true,
  })

  const inputEvent = (event) => {
    const name = event.target.name
    const value = event.target.value
    setinputtext((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      }
    })
  }

  return (
    <div>
      <form>
        <div className="input-text">
          LABEL VALUE
          <input type="text" placeholder="Enter Label" value={inputtext.label} onChange={inputEvent} name="label" />
        </div>
        <div className="input-text">
          MIN LENGTH
          <input
            type="text"
            placeholder="Enter Minimum Length"
            value={inputtext.min_length}
            onChange={inputEvent}
            name="min_length"
          />
        </div>

        <div className="input-text">
          MAX LENGTH
          <input
            type="text"
            placeholder="Enter Maximum Length"
            value={inputtext.max_length}
            onChange={inputEvent}
            name="max_length"
          />
        </div>

        <div className="input-text">
          DEFAULT VALUE
          <input
            type="text"
            placeholder="Enter Default Value"
            value={inputtext.default_value}
            onChange={inputEvent}
            name="default_value"
          />
        </div>

        <div className="input-text">
          PLACEHOLDER
          <input
            type="text"
            placeholder="Enter Placeholder Value"
            value={inputtext.placeholder}
            onChange={inputEvent}
            name="placeholder"
          />
        </div>

        <div className="input-text d-flex align-items-center">
          Required:
          <input type="checkbox" value={inputtext.required} onChange={inputEvent} name="required" />
        </div>

        <div className="buttons">
          <button className="primary-blue-text-white-button" type="clear">
            Clear
          </button>
          <button className="primary-white-text-gray-button" type="submit">
            Done
          </button>
        </div>
      </form>
    </div>
  )
}

export default SingleLineInputProperty
