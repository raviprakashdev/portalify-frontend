import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/formbuilder-context'
import uuid from 'uuid/v4'

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
    state,
    setState,
    elementType,
    setElementType,
    elementTypeName,
    uploadedImage,
    setUploadedImage,
  } = useContext(UserContext)

  const [hideLabel, setHideLabel] = useState(false)

  const inputEvent = (event) => {
    //---------------------------------------getting old html from selected element---------------------------------------------
    var index = -1
    const key = selectedElement[0]
    const idToFind = selectedElement[1]
    const dataArray = state[key]?.children

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind)
      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent

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
                const updatedChildren = [...prevState[key].children]
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                }
              })
            }
            break
          case 'label':
            {
              const myInput = newHtmlContent.querySelector("label[for='htmlContent']")
              myInput.textContent = value

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children]
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                }
              })
            }
            break
          case 'checkbox-label':
            {
              const parentId = event.target.id

              
              const myInput = newHtmlContent.querySelector(`[id='${parentId}'] label[for='htmlContent']`)

              myInput.textContent = value

              const myInputValue = newHtmlContent.querySelector(`[id='${parentId}'] input[type]`)
              myInputValue.setAttribute('value', value)


              setState((prevState) => {
                const updatedChildren = [...prevState[key].children]
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                }
              })
            }
            break
          case 'hideLabel':
            {
              setHideLabel(event.target.checked)
              const myInput = newHtmlContent.querySelector("label[for='htmlContent']")

              if (event.target.checked) {
                myInput.textContent = ' '
              } else {
                myInput.textContent = value
              }

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children]
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                }
              })
            }
            break
          case 'form_name':
            {
              const myInput = newHtmlContent.querySelector('h1')
              myInput.textContent = value

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children]
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                }
              })
            }
            break
          case 'placeholder':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              myInput.setAttribute('placeholder', value)

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children]
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                }
              })
            }
            break
          case 'image':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              if (myInput) {
                const file = event.target.files[0]
                if (file) {
                  myInput.setAttribute('src', URL.createObjectURL(file))
                }
              }

              setState((prevState) => {
                const updatedChildren = [...prevState[key].children]
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                }
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
                const updatedChildren = [...prevState[key].children]
                updatedChildren[index] = {
                  ...updatedChildren[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    children: updatedChildren,
                  },
                }
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


//---resetting inputboxes in multivalue to initial state on change of elements
  useEffect(() => {
    setInputBox(inputBoxArr)
  }, [selectedElement]);



  const inputBoxArr = [
    {
      type: 'text',
      placeholder: 'Enter Label',
      onChange: { inputEvent },
      name: 'checkbox-label',
      id: 1,
      value: ` `,
    },
  ]

  //----------------------for multiElement numbers-------------------------
  const [inputBox, setInputBox] = useState(inputBoxArr)
  const addMultiValueInputs = (e, elementType) => {
    e.preventDefault()

    setInputBox((s) => {
      const addId = uuid()
      if (elementType === 8) {
        addCheckboxInState(addId)
      } else if (elementType === 7) {
        addRadioInState(addId)
      }
      return [
        ...s,
        {
          type: 'text',
          placeholder: 'Enter Label',
          onChange: { inputEvent },
          name: 'checkbox-label',
          id: addId,
          value: 'sample',
        },
      ]
    })
  }

  const addRadioInState = (id) => {
    var index = -1
    const key = selectedElement[0]
    const idToFind = selectedElement[1]
    const dataArray = state[key]?.children
    const newCheckbox = `<div id=${id} className='htmlContentParent'><input id='htmlContent' type='radio' name=${idToFind} value=' '/>  <label id='htmlContentLabel' for='htmlContent'> Sample </label></div>`

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind)
      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent

        setState((prevState) => {
          const targetIndex = oldHtmlContent.lastIndexOf('</div>') // Find the index of the last occurrence of '</div>'
          const newContent = oldHtmlContent.slice(0, targetIndex) + newCheckbox + oldHtmlContent.slice(targetIndex)

          const parser = new DOMParser()
          const newHtmlContent = parser.parseFromString(newContent, 'text/html')

          const radioButton = newHtmlContent.querySelector('input[type="radio"][name="undefined"]')
          if (radioButton) {
            radioButton.setAttribute('name', idToFind)
          }

          console.log('newcheckbox content==>', newHtmlContent)
          const updatedChildren = [...prevState[key].children]
          updatedChildren[index] = {
            ...updatedChildren[index],
            htmlContent: newHtmlContent.documentElement.innerHTML,
          }
          return {
            ...prevState,
            [key]: {
              ...prevState[key],
              children: updatedChildren,
            },
          }
        })
      }
    }
    console.log('arr==>', inputBox)
  }

  const addCheckboxInState = (id) => {
    const newCheckbox = `<div id=${id} className='htmlContentParent'><input id='htmlContent' type='checkbox' value='sample'/>  <label id='htmlContentLabel' for='htmlContent'> Sample </label></div>`
    var index = -1
    const key = selectedElement[0]
    const idToFind = selectedElement[1]
    const dataArray = state[key]?.children

    if (key in state && Array.isArray(state[key].children)) {
      index = dataArray.findIndex((obj) => obj.id === idToFind)
      if (index !== -1) {
        const oldHtmlContent = state[key].children[index].htmlContent

        setState((prevState) => {
          //  const targetIndex = oldHtmlContent.indexOf('</div>', oldHtmlContent.indexOf('htmlContentContainer') + 'htmlContentContainer'.length) + '</div>'.length;
          //   const newContent = oldHtmlContent.slice(0, targetIndex) + newCheckbox + oldHtmlContent.slice(targetIndex);

          const targetIndex = oldHtmlContent.lastIndexOf('</div>') // Find the index of the last occurrence of '</div>'
          const newContent = oldHtmlContent.slice(0, targetIndex) + newCheckbox + oldHtmlContent.slice(targetIndex)

          const parser = new DOMParser()
          const newHtmlContent = parser.parseFromString(newContent, 'text/html')

          console.log('newcheckbox content==>', newHtmlContent)
          const updatedChildren = [...prevState[key].children]
          updatedChildren[index] = {
            ...updatedChildren[index],
            htmlContent: newHtmlContent.documentElement.innerHTML,
          }
          return {
            ...prevState,
            [key]: {
              ...prevState[key],
              children: updatedChildren,
            },
          }
        })
      }
    }
  }

  //--------------------------------------------------------------------------------------------------------------

  return (
    <div className=" ">
      <form>
        {elementType === -1 || elementType === undefined ? (
          <Notice>Select An Element</Notice>
        ) : (
          <>
            <div className="input-text" style={{ marginBottom: 20 }}>
              <Notice>Selected: {elementTypeName} </Notice>
            </div>
            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 9 ||
            elementType === 10 ||
            elementType === 11 ? (
              <div className="input-text d-flex flex-column">
                LABEL VALUE
                <input
                  type="text"
                  placeholder="Enter Label"
                  value={label}
                  onChange={inputEvent}
                  disabled={hideLabel}
                  name="label"
                />
              </div>
            ) : elementType === 8 ? (
              <div className="input-text d-flex flex-column">
                LABEL VALUE
                {inputBox.map((item, i) => {
                  return (
                    <input
                      onChange={inputEvent}
                      value={label}
                      placeholder={item.placeholder}
                      id={item.id}
                      type={item.type}
                      name={item.name}
                    />
                  )
                })}
                <button onClick={(e) => addMultiValueInputs(e, elementType)}>Add Checkbox</button>
              </div>
            ) : elementType === 7 ? (
              <div className="input-text d-flex flex-column">
                LABEL VALUE
                {inputBox.map((item, i) => {
                  return (
                    <input
                      onChange={inputEvent}
                      value={label}
                      placeholder={item.placeholder}
                      id={item.id}
                      type={item.type}
                      name={item.name}
                    />
                  )
                })}
                <button onClick={(e) => addMultiValueInputs(e, elementType)}>Add Checkbox</button>
              </div>
            ) : null}

            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 9 ||
            elementType === 10 ||
            elementType === 11 ? (
              <div className="input-text d-flex align-items-baseline">
                Hide Label:
                <input
                  type="checkbox"
                  value={label}
                  onChange={inputEvent}
                  checked={hideLabel}
                  name="hideLabel"
                  style={{ marginLeft: '10px' }}
                />
              </div>
            ) : null}

            {elementType === 3 ? (
              <div className="input-text d-flex flex-column">
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
              <div className="input-text d-flex flex-column">
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
              <div className="input-text d-flex flex-column">
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
              elementType === 9 ||
              elementType === 14 ? (
              <div className="input-text d-flex flex-column">
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
            {elementType === 3 ? (
              <>
                <div className="input-text d-flex flex-column">
                  MIN LENGTH
                  <input
                    type="text"
                    placeholder="Enter Minimum Length"
                    value={min_length}
                    onChange={inputEvent}
                    name="min_length"
                  />
                </div>
                <div className="input-text d-flex flex-column">
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
              <div className="input-text d-flex flex-column">
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
              <div className="input-text d-flex flex-column">
                UPLOAD IMAGE
                <input type="file" accept="image/*" value={form_name} onChange={inputEvent} name="image" />
              </div>
            ) : null}

            {elementType === 1 || elementType === 2 || elementType === 3 || elementType === 4 || elementType === 5 ? (
              <div className="input-text d-flex flex-column">
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
                <input
                  type="checkbox"
                  value={required}
                  onChange={inputEvent}
                  name="required"
                  style={{ marginLeft: '10px' }}
                />
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
