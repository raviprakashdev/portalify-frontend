import React from 'react'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/formbuilder-context'

const SingleLineInputProperty = ({ Notice }) => {
  const {
    label,
    min_length,
    max_length,
    default_value,
    placeholder,
    required,
    updateUserData,
    elementList,
    allElements,
    selectedElement,
    setSelectedElement,
    state,
    setState,
    elementType,
    setElementType,
  } = useContext(UserContext)


  const inputEvent = (event) => {
    //---------------------------------------getting old html from selected element---------------------------------------------
    var index = -1
    const key = selectedElement[0]
    const idToFind = selectedElement[1]
    const dataArray = state[key]
    if (key in state && Array.isArray(state[key])) {
      index = dataArray.findIndex((obj) => obj.id === idToFind)
      if (index !== -1) {
        const oldHtmlContent = state[key][index].htmlContent

        console.log('old html==>', oldHtmlContent)

        const parser = new DOMParser()
        const newHtmlContent = parser.parseFromString(oldHtmlContent, 'text/html')

        //------------------------------------updating the element attribute-----------------------------------------------------

        const { name, value } = event.target
        updateUserData({ [name]: value })
        switch (name) {
          case 'default_value':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              myInput.setAttribute('value', value)

              setState((prevState) => {
                const updatedArray = [...prevState[key]]
                updatedArray[index] = { ...updatedArray[index], htmlContent: newHtmlContent.documentElement.innerHTML }
                return { ...prevState, [key]: updatedArray }
              })
            }
            break
          case 'label':
            {
              const myInput = newHtmlContent.querySelector("label[for='htmlContent']")
              myInput.textContent = value

              setState((prevState) => {
                const updatedArray = [...prevState[key]]
                updatedArray[index] = { ...updatedArray[index], htmlContent: newHtmlContent.documentElement.innerHTML }
                return { ...prevState, [key]: updatedArray }
              })
            }
            break
          case 'placeholder':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              myInput.setAttribute('placeholder', value)

              setState((prevState) => {
                const updatedArray = [...prevState[key]]
                updatedArray[index] = { ...updatedArray[index], htmlContent: newHtmlContent.documentElement.innerHTML }
                return { ...prevState, [key]: updatedArray }
              })
            }
            break
          default:
            break
        }
      } else {
        console.log(`Object with id '${idToFind}' not found in data.`)

        console.log('testing picking old html from state==> ', state[key][index].htmlContent)
      }

      //---------------------------------------------------------------------------------------------------------------------
    } else {
      console.log(`Invalid key '${key}' or array not found.`)
    }
  }

  //--------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <form>
        {elementType === -1 ? (
  
          <Notice>Select An Element</Notice>

        ) : (
          <>
            <div className="input-text">
              LABEL VALUE <div>{elementType}</div>
              <input type="text" placeholder="Enter Label" value={label} onChange={inputEvent} name="label" />
            </div>

            {elementType === 3 ? (
              <>
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
              </>
            ) : null}

            {elementType === 3 ? (
              <div className="input-text">
                DEFAULT VALUE
                <input
                  type="number"
                  placeholder="Enter Default Value"
                  value={default_value}
                  onChange={inputEvent}
                  name="default_value"
                />
              </div>
            ) : elementType === 4 || elementType === 5 ? (
              <div className="input-text">
                DEFAULT VALUE
                <input
                  type="date"
                  placeholder="Enter Default Value"
                  value={default_value}
                  onChange={inputEvent}
                  name="default_value"
                />
              </div>
            ) : (
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
            )}

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
          </>
        )}
      </form>
    </div>
  )
}

export default SingleLineInputProperty
