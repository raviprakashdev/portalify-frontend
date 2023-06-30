import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/formbuilder-context'

const SingleLineInputProperty = ({ Notice }) => {
  const {
    label,
    min_length,
    max_length,
    form_name,
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
    elementTypeName,
    uploadedImage,
    setUploadedImage,
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

        //console.log('old html==>', oldHtmlContent)

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
          case 'form_name':
            {
              const myInput = newHtmlContent.querySelector('h1')
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
          case 'image':
            {
              const myInput = newHtmlContent.getElementById('uploadedImage')
              if (myInput) {
                const file = event.target.files[0]
                if (file) {
                  setUploadedImage(URL.createObjectURL(file))
                  myInput.setAttribute('src', uploadedImage);
                }
              }

              setState((prevState) => {
                const updatedArray = [...prevState[key]]
                updatedArray[index] = { ...updatedArray[index], htmlContent: newHtmlContent.documentElement.innerHTML }
                return { ...prevState, [key]: updatedArray }
              })

            }
            break
          case 'required':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              if (myInput) {
                const newIsRequired = event.target.checked
                if (newIsRequired) {
                  myInput.setAttribute('required', '')
                } else {
                  myInput.removeAttribute('required')
                }
              }

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
        // console.log(`Object with id '${idToFind}' not found in data.`)
        // console.log('testing picking old html from state==> ', state[key][index].htmlContent)
      }

      //---------------------------------------------------------------------------------------------------------------------
    } else {
      // console.log(`Invalid key '${key}' or array not found.`)
    }
  }


  useEffect(() => {
    const myInput = document.getElementById('uploadedImage');
    if (myInput) {
      myInput.setAttribute('src', uploadedImage);
    }

    console.log("image==>", uploadedImage)
    console.log('state check', state)
  }, [uploadedImage]);

  //--------------------------------------------------------------------------------------------------------------

  return (
    <div>
      {elementTypeName != null ? (
        <div className="input-text" style={{ marginBottom: 20 }}>
          Selected: {elementTypeName}{' '}
        </div>
      ) : null}
      <form>
        {elementType === -1 || elementType === undefined ? (
          <Notice>Select An Element</Notice>
        ) : (
          <>
            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 7 ||
            elementType === 8 ||
            elementType === 9 ||
            elementType === 10 ||
            elementType === 11 ? (
              <div className="input-text">
                LABEL VALUE
                <input type="text" placeholder="Enter Label" value={label} onChange={inputEvent} name="label" />
              </div>
            ) : null}

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

            {elementType === 13 ? (
              <div className="input-text">
                NAME
                <input
                  type="text"
                  placeholder="Enter Form Name"
                  value={form_name}
                  onChange={inputEvent}
                  name="form_name"
                />
              </div>
            ) : null}

            {elementType === 15 ? (
              <div className="input-text">
                UPLOAD IMAGE
                <input type="file" accept="image/*" value={form_name} onChange={inputEvent} name="image" />
              </div>
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
            ) : elementType === 4 ? (
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
            ) : elementType === 5 ? (
              <div className="input-text">
                DEFAULT VALUE
                <input
                  type="datetime-local"
                  placeholder="Enter Default Value"
                  value={default_value}
                  onChange={inputEvent}
                  name="default_value"
                />
              </div>
            ) : elementType === 1 ||
              elementType === 2 ||
              elementType === 6 ||
              elementType === 7 ||
              elementType === 8 ||
              elementType === 9 ||
              elementType === 14 ? (
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
            ) : null}

            {elementType === 1 || elementType === 2 || elementType === 3 || elementType === 4 || elementType === 5 ? (
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
            ) : null}

            {elementType === 12 || elementType === 13 || elementType === 14 ? null : (
              <div className="input-text d-flex align-items-baseline">
                Required:
                <input type="checkbox" value={required} onChange={inputEvent} name="required" />
              </div>
            )}

            {/* <div className="buttons">
              <button className="primary-blue-text-white-button" type="clear">
                Clear
              </button>
              <button className="primary-white-text-gray-button" type="submit">
                Done
              </button>
            </div> */}
          </>
        )}
      </form>
    </div>
  )
}

export default SingleLineInputProperty
