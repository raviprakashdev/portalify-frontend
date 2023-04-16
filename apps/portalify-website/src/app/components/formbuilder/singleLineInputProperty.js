import React from 'react'
//import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/formbuilder-context'

const SingleLineInputProperty = (handleClick) => {
  // const [inputtext, setinputtext] = useState({
  //   label: '',
  //   min_length: '',
  //   max_length: '',
  //   default_value: '',
  //   placeholder: '',
  //   required: true,
  // })

  // const inputEventt = (event) => {
  //   const name = event.target.name
  //   const value = event.target.value
  //   setinputtext((lastValue) => {
  //     return {
  //       ...lastValue,
  //       [name]: value,
  //     }
  //   })
  // }

  const { label, min_length, max_length, default_value, placeholder, required, updateUserData } =
    useContext(UserContext)
  const oldHtmlContent = `<label> <input id='htmlContent' type='text' value='value' /></label>`
  const parser = new DOMParser();
  const newHtmlContent = parser.parseFromString(oldHtmlContent, 'text/html');

  const inputEvent = (event) => {
    const { name, value } = event.target
    updateUserData({ [name]: value })
    switch (name) {
      case 'default_value':
        {
          const myInput = newHtmlContent.getElementById('htmlContent');
          myInput.setAttribute('value', value);
          console.log('switch case active label', newHtmlContent.documentElement.innerHTML);
        }
        break
      case 'label':
        console.log('switch case active new val', value)
        break
      case 'placeholder':
        console.log('switch case active placeholder', value)
        break
      default:
        break
    }
  }

  return (
    <div>
      <form>
        <div className="input-text">
          LABEL VALUE
          <input type="text" placeholder="Enter Label" value={label} onChange={inputEvent} name="label" />
        </div>
        <div className="input-text">
          MIN LENGTH
          <input
            type="text"
            placeholder="Enter Minimum Length"
            value={min_length}
            onChange={inputEvent}
            name="min_length"
          />
        </div>

        <div className="input-text">
          MAX LENGTH
          <input
            type="text"
            placeholder="Enter Maximum Length"
            value={max_length}
            onChange={inputEvent}
            name="max_length"
          />
        </div>

        <div className="input-text">
          DEFAULT VALUE
          <input
            type="text"
            placeholder="Enter Default Value"
            value={default_value}
            onChange={inputEvent}
            name="default_value"
          />
        </div>

        <div className="input-text">
          PLACEHOLDER
          <input
            type="text"
            placeholder="Enter Placeholder Value"
            value={placeholder}
            onChange={inputEvent}
            name="placeholder"
          />
        </div>

        <div className="input-text d-flex align-items-center">
          Required:
          <input type="checkbox" value={required} onChange={inputEvent} name="required" />
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
