import { useContext, useState } from 'react'
import { UserContext } from '../../context/formbuilder-context'
import { ChromePicker } from 'react-color'
const StylingProperty = ({ Notice }) => {
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

  const [color, setColor] = useState('#121212')
  const [heading_color, setHeading_color] = useState('#121212')
  const [bgcolor, setbgColor] = useState('#f9000000')

  const inputEvent = (event) => {
    //console.log('event==>', event)
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
        //console.log('name==>', name)
        updateUserData({ [name]: value })
        switch (name) {
          case 'border':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              myInput.style.borderWidth = value

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
          case 'align':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              const myInput1 = newHtmlContent.getElementById('htmlContentParent')
              const myInput2 = newHtmlContent.getElementById('htmlContentWhole')

              if (myInput2) {
                myInput2.style.display = 'block'
                switch (value) {
                  case 'left':
                    myInput2.style.marginRight = 'auto'
                    myInput2.style.marginLeft = '0'
                    myInput2.style.textAlign = 'left'
                    break
                  case 'center':
                    myInput2.style.margin = 'auto'
                    myInput2.style.textAlign = 'center'
                    break
                  case 'right':
                    myInput2.style.marginLeft = 'auto'
                    myInput2.style.marginRight = '0'
                    myInput2.style.textAlign = 'right'

                    break
                  default:
                    break
                }
              } else if (myInput1) {
                myInput1.style.display = 'block'
                switch (value) {
                  case 'left':
                    myInput1.style.marginRight = 'auto'
                    myInput1.style.marginLeft = '0'
                    myInput1.style.textAlign = 'left'
                    break
                  case 'center':
                    myInput1.style.margin = 'auto'
                    myInput1.style.textAlign = 'center'
                    break
                  case 'right':
                    myInput1.style.marginLeft = 'auto'
                    myInput1.style.marginRight = '0'
                    myInput1.style.textAlign = 'right'

                    break
                  default:
                    break
                }
              } else if (myInput) {
                myInput.style.display = 'block'
                switch (value) {
                  case 'left':
                    myInput.style.marginRight = 'auto'
                    myInput.style.marginLeft = '0'
                    myInput.style.textAlign = 'left'
                    break
                  case 'center':
                    myInput.style.margin = 'auto'
                    myInput.style.textAlign = 'center'
                    break
                  case 'right':
                    myInput.style.marginLeft = 'auto'
                    myInput.style.marginRight = '0'
                    myInput.style.textAlign = 'right'

                    break
                  default:
                    break
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
          case 'flex-direction':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              const myInput1 = newHtmlContent.getElementById('htmlContentParent')
              const myInput2 = newHtmlContent.getElementById('htmlContentContainer')

              //-----------check class nexting----possibally ruined from new structure-----//

              switch (value) {
                case 'flex-column':
                  if (myInput2) {
                    myInput2.style.display = 'flex'
                    myInput2.style.flexDirection = 'column'
                  } else if (myInput1) {
                    myInput1.style.display = 'flex'
                    myInput1.style.flexDirection = 'column'
                  }
                  break
                case 'flex-row':
                  if (myInput2) {
                    myInput2.style.display = 'flex'
                    myInput2.style.flexDirection = 'row'
                  } else if (myInput1) {
                    myInput1.style.display = 'flex'
                    myInput1.style.flexDirection = 'row'
                  }
                  break
                default:
                  break
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
          case 'fontStyle':
            {
              const myInputs2 = newHtmlContent.getElementById('htmlContentContainer')
              const myInputs1 = newHtmlContent.querySelectorAll('#htmlContentLabel')
              const myInputs = newHtmlContent.querySelectorAll('#htmlContent')

              switch (value) {
                case 'bold':
                  if (myInputs2) {
                    myInputs2.style.fontWeight = myInputs2.style.fontWeight === 'bold' ? 'normal' : 'bold'
                  }
                  myInputs1.forEach((myInput1) => {
                    myInput1.style.fontWeight = myInput1.style.fontWeight === 'bold' ? 'normal' : 'bold'
                  })
                  myInputs.forEach((myInput) => {
                    myInput.style.fontWeight = myInput.style.fontWeight === 'bold' ? 'normal' : 'bold'
                  })
                  break
                case 'italic':
                  if (myInputs2) {
                    myInputs2.style.fontStyle = myInputs2.style.fontStyle === 'italic' ? 'normal' : 'italic'
                  }
                  myInputs1.forEach((myInput1) => {
                    myInput1.style.fontStyle = myInput1.style.fontStyle === 'italic' ? 'normal' : 'italic'
                  })

                  myInputs.forEach((myInput) => {
                    myInput.style.fontStyle = myInput.style.fontStyle === 'italic' ? 'normal' : 'italic'
                  })
                  break
                case 'underline':
                  if (myInputs2) {
                    myInputs2.style.textDecoration =
                      myInputs2.style.textDecoration === 'underline' ? 'none' : 'underline'
                  }
                  myInputs1.forEach((myInput1) => {
                    myInput1.style.textDecoration = myInput1.style.textDecoration === 'underline' ? 'none' : 'underline'
                  })
                  myInputs.forEach((myInput) => {
                    myInput.style.textDecoration = myInput.style.textDecoration === 'underline' ? 'none' : 'underline'
                  })
                  break
                default:
                  break
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
          case 'heading_fontStyle':
            {
              const myInput = newHtmlContent.getElementById('htmlContentHeading')

              switch (value) {
                case 'bold':
                  myInput.style.fontWeight = myInput.style.fontWeight === 'bold' ? 'normal' : 'bold'

                  break
                case 'italic':
                  myInput.style.fontStyle = myInput.style.fontStyle === 'italic' ? 'normal' : 'italic'

                  break
                case 'underline':
                  myInput.style.textDecoration = myInput.style.textDecoration === 'underline' ? 'none' : 'underline'

                  break
                default:
                  break
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
          case 'font':
            {
              const myInputs3 = newHtmlContent.querySelectorAll('option')
              const myInputs2 = newHtmlContent.getElementById('htmlContentContainer')
              const myInputs1 = newHtmlContent.querySelectorAll('#htmlContentLabel')
              const myInput = newHtmlContent.getElementById('htmlContent')

              switch (value) {
                case 'Courier':
                  if (myInput) {
                    myInput.style.fontFamily = 'Courier'
                  }
                  myInputs1.forEach((myInput1) => {
                    myInput1.style.fontFamily = 'Courier'
                  })
                  if (myInputs2) {
                    myInputs2.style.fontFamily = 'Courier'
                  }
                  myInputs3.forEach((myInput3) => {
                    myInput3.style.fontFamily = 'Courier'
                  })
                  break
                case 'Helvetica':
                  if (myInput) {
                    myInput.style.fontFamily = 'Helvetica'
                  }
                  myInputs1.forEach((myInput1) => {
                    myInput1.style.fontFamily = 'Helvetica'
                  })
                  if (myInputs2) {
                    myInputs2.style.fontFamily = 'Helvetica'
                  }
                  myInputs3.forEach((myInput3) => {
                    myInput3.style.fontFamily = 'Helvetica'
                  })
                  break
                case 'Times-Roman':
                  if (myInput) {
                    myInput.style.fontFamily = 'Times-Roman'
                  }
                  myInputs1.forEach((myInput1) => {
                    myInput1.style.fontFamily = 'Times-Roman'
                  })
                  if (myInputs2) {
                    myInputs2.style.fontFamily = 'Times-Roman'
                  }
                  myInputs3.forEach((myInput3) => {
                    myInput3.style.fontFamily = 'Times-Roman'
                  })
                  break
                default:
                  break
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
          case 'heading_font':
            {
              const myInput = newHtmlContent.getElementById('htmlContentHeading')

              switch (value) {
                case 'Courier':
                  if (myInput) {
                    myInput.style.fontFamily = 'Courier'
                  }
                  break
                case 'Helvetica':
                  if (myInput) {
                    myInput.style.fontFamily = 'Helvetica'
                  }
                  break
                case 'Times-Roman':
                  if (myInput) {
                    myInput.style.fontFamily = 'Times-Roman'
                  }
                  break
                default:
                  break
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
          case 'type':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              myInput.style.backgroundColor = '#f9000000'

              switch (value) {
                case 'solid':
                  myInput.style.border = 'solid'
                  break
                case 'dashed':
                  myInput.style.border = 'dashed'
                  break
                case 'dotted':
                  myInput.style.border = 'dotted'
                  break
                default:
                  break
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
          case 'margin':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              const myInput1 = newHtmlContent.getElementById('htmlContentParent')
              const myInput2 = newHtmlContent.getElementById('htmlContentWhole')

              if (myInput2) {
                myInput2.style.marginTop = value
                myInput2.style.marginBottom = value
              } else if (myInput1) {
                myInput1.style.marginTop = value
                myInput1.style.marginBottom = value
              } else if (myInput) {
                myInput.style.marginTop = value
                myInput.style.marginBottom = value
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
          case 'padding_vertical':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              const myInput1 = newHtmlContent.getElementById('htmlContentParent')
              const myInput2 = newHtmlContent.getElementById('htmlContentWhole')

              if (myInput2) {
                myInput2.style.paddingTop = value
                myInput2.style.paddingBottom = value
              } else if (myInput1) {
                myInput1.style.paddingTop = value
                myInput1.style.paddingBottom = value
              } else if (myInput) {
                myInput.style.paddingTop = value
                myInput.style.paddingBottom = value
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
          case 'padding_horizontal':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              const myInput1 = newHtmlContent.getElementById('htmlContentParent')
              const myInput2 = newHtmlContent.getElementById('htmlContentWhole')

              if (myInput2) {
                myInput2.style.paddingRight = value
                myInput2.style.paddingLeft = value
              } else if (myInput1) {
                myInput1.style.paddingRight = value
                myInput1.style.paddingLeft = value
              } else if (myInput) {
                myInput.style.paddingRight = value
                myInput.style.paddingLeft = value
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
          case 'fontSize':
            {
              const myInputs2 = newHtmlContent.getElementById('htmlContentContainer')
              const myInputs = newHtmlContent.getElementById('htmlContent')
              const myInputs1 = newHtmlContent.querySelectorAll('#htmlContentLabel')

              if (myInputs) {
                myInputs.style.fontSize = value
              }
              if (myInputs2) {
                myInputs2.style.fontSize = value
              }
              myInputs1.forEach((myInput1) => {
                myInput1.style.fontSize = value
              })

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
          case 'heading_fontSize':
            {
              const myInputs = newHtmlContent.getElementById('htmlContentHeading')

              if (myInputs) {
                myInputs.style.fontSize = value
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
          case 'width':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              myInput.style.width = value

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
          case 'height':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              myInput.style.height = value

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
          case 'borderRadius':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              myInput.style.borderRadius = value + 'px'

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
    } else {
      // console.log(`Invalid key '${key}' or array not found.`)
    }
  }

  //-----------------------------------------content color picker input-----------------------------------------------------------------

  const colorInputEvent = (color, event) => {
    //console.log('event==>', event)
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

        //console.log('color==>', color)

        const myInput2 = newHtmlContent.getElementById('htmlContentParent')
        const myInput1 = newHtmlContent.getElementById('htmlContentContainer')
        const myInput = newHtmlContent.getElementById('htmlContent')

        if (myInput2) {
          myInput2.style.color = color.hex
        }
        if (myInput1) {
          myInput1.style.color = color.hex
        }
        if (myInput) {
          myInput.style.color = color.hex
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

        console.log('new html==>', newHtmlContent)
      } else {
        // console.log(`Object with id '${idToFind}' not found in data.`)
        // console.log('testing picking old html from state==> ', state[key][index].htmlContent)
      }

      //---------------------------------------------------------------------------------------------------------------------
    } else {
      // console.log(`Invalid key '${key}' or array not found.`)
    }
  }

  //-----------------------------------------HEADING content color picker input-----------------------------------------------------------------

  const heading_colorInputEvent = (color, event) => {
    //console.log('event==>', event)
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

        //console.log('color==>', color)

        const myInput = newHtmlContent.getElementById('htmlContentHeading')

        if (myInput) {
          myInput.style.color = color.hex
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

        console.log('new html==>', newHtmlContent)
      } else {
        // console.log(`Object with id '${idToFind}' not found in data.`)
        // console.log('testing picking old html from state==> ', state[key][index].htmlContent)
      }

      //---------------------------------------------------------------------------------------------------------------------
    } else {
      // console.log(`Invalid key '${key}' or array not found.`)
    }
  }

  //-----------------------------------------bgcontent color picker input-----------------------------------------------------------------
  const bgcolorInputEvent = (color, event) => {
    //console.log('event==>', event)
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

        //console.log('color==>', color)
        const myInput =
          newHtmlContent.getElementById('htmlContentHeading') || newHtmlContent.getElementById('htmlContent')
        //myInput.style.color = color.hex
        myInput.style.backgroundColor = color.hex

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

        // console.log('new html==>', newHtmlContent)
      } else {
        // console.log(`Object with id '${idToFind}' not found in data.`)
        // console.log('testing picking old html from state==> ', state[key][index].htmlContent)
      }

      //---------------------------------------------------------------------------------------------------------------------
    } else {
      // console.log(`Invalid key '${key}' or array not found.`)
    }
  }

  //--------------------------------------------------------------------------------------------------------------

  return (
    <div>
      {elementTypeName != null ? (
        <div className="input-text d-flex flex-column">
          <Notice>{/* Selected: {elementTypeName}  */}</Notice>
        </div>
      ) : null}
      <form>
        {elementType === -1 || elementType === undefined ? (
          <Notice>{/* Select An Element */}</Notice>
        ) : (
          <>
            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 7 ||
            elementType === 8 ? (
              <div className="input-text d-flex flex-column">
                FLEX DIRECTION
                <select name="flex-direction" onChange={inputEvent}>
                  <option value="flex-column">Column</option>
                  <option value="flex-row">Row</option>
                </select>
              </div>
            ) : null}

            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 6 ||
            elementType === 7 ||
            elementType === 8 ||
            elementType === 13 ||
            elementType === 14 ||
            elementType === 15 ? (
              <div className="input-text d-flex flex-column">
                PADDING Vertical
                <input
                  type="number"
                  placeholder="Enter Padding Value"
                  defaultValue={3}
                  onChange={inputEvent}
                  name="padding_vertical"
                />
              </div>
            ) : null}

            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 6 ||
            elementType === 7 ||
            elementType === 8 ||
            elementType === 13 ||
            elementType === 14 ||
            elementType === 15 ? (
              <div className="input-text d-flex flex-column">
                PADDING Horizontal
                <input
                  type="number"
                  placeholder="Enter Padding Value"
                  defaultValue={3}
                  onChange={inputEvent}
                  name="padding_horizontal"
                />
              </div>
            ) : null}

            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 6 ||
            elementType === 7 ||
            elementType === 8 ||
            elementType === 12 ||
            elementType === 13 ||
            elementType === 14 ||
            elementType === 15 ? (
              <div className="input-text d-flex flex-column">
                MARGIN
                <input
                  type="number"
                  placeholder="Enter Margin Value"
                  defaultValue={0}
                  onChange={inputEvent}
                  name="margin"
                />
              </div>
            ) : null}

            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 6 ||
            elementType === 7 ||
            elementType === 8 ||
            elementType === 13 ||
            elementType === 14 ||
            elementType === 15 ? (
              <div className="input-text d-flex flex-column">
                ALIGN
                <select name="align" onChange={inputEvent}>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            ) : null}

            {/*-------------------Heading Styling STARTS------------ */}

            {elementType === 6 || elementType === 7 || elementType === 8 ? (
              <div className="input-text d-flex flex-column">
                <Notice>Heading Styling</Notice>
              </div>
            ) : null}

            {elementType === 6 || elementType === 7 || elementType === 8 ? (
              <div className="input-text d-flex flex-column">
                HEADING FONT STYLE
                <select name="heading_fontStyle" onChange={inputEvent}>
                  <option value="bold">Bold</option>
                  <option value="italic">Italic</option>
                  <option value="underline">Underline</option>
                </select>
              </div>
            ) : null}

            {elementType === 6 || elementType === 7 || elementType === 8 ? (
              <div className="input-text d-flex flex-column">
                HEADING FONT
                <select name="heading_font" onChange={inputEvent}>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Courier">Courier</option>
                  <option value="Times-Roman">Times-Roman</option>
                </select>
              </div>
            ) : null}

            {elementType === 6 || elementType === 7 || elementType === 8 ? (
              <div className="input-text d-flex flex-column">
                HEADING FONT SIZE
                <input
                  type="number"
                  placeholder="Enter Font Size Value"
                  defaultValue={16}
                  onChange={inputEvent}
                  name="heading_fontSize"
                />
              </div>
            ) : null}

            {elementType === 6 || elementType === 7 || elementType === 8 ? (
              <div className="input-text d-flex flex-column">
                HEADING COLOR
                <ChromePicker
                  onChange={setHeading_color}
                  onChangeComplete={heading_colorInputEvent}
                  color={heading_color}
                  disableAlpha
                />
              </div>
            ) : null}

            {elementType === 6 || elementType === 7 || elementType === 8 || elementType === 13 || elementType === 14 ? (
              <div className="input-text d-flex flex-column">
                HEADING BACKGROUND COLOR
                <ChromePicker onChange={setbgColor} onChangeComplete={bgcolorInputEvent} color={bgcolor} disableAlpha />
              </div>
            ) : null}

            {/*--------------------------Heading Styling ENDS--------------------- */}

            {elementType === 6 || elementType === 7 || elementType === 8 ? (
              <div className="input-text d-flex flex-column">
                <Notice>Options Styling</Notice>
              </div>
            ) : null}

            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 6 ||
            elementType === 7 ||
            elementType === 8 ||
            elementType === 13 ? (
              <div className="input-text d-flex flex-column">
                FONT STYLE
                <select name="fontStyle" onChange={inputEvent}>
                  <option value="bold">Bold</option>
                  <option value="italic">Italic</option>
                  <option value="underline">Underline</option>
                </select>
              </div>
            ) : null}
            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 6 ||
            elementType === 7 ||
            elementType === 8 ||
            elementType === 13 ? (
              <div className="input-text d-flex flex-column">
                FONT
                <select name="font" onChange={inputEvent}>
                  <option value="Courier">Courier</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times-Roman">Times-Roman</option>
                </select>
              </div>
            ) : null}

            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 6 ||
            elementType === 7 ||
            elementType === 8 ||
            elementType === 13 ? (
              <div className="input-text d-flex flex-column">
                FONT SIZE
                <input
                  type="number"
                  placeholder="Enter Font Size Value"
                  defaultValue={16}
                  onChange={inputEvent}
                  name="fontSize"
                />
              </div>
            ) : null}

            {elementType === 1 ||
            elementType === 2 ||
            elementType === 3 ||
            elementType === 4 ||
            elementType === 5 ||
            elementType === 6 ||
            elementType === 7 ||
            elementType === 8 ||
            elementType === 12 ||
            elementType === 13 ||
            elementType === 14 ? (
              <div className="input-text d-flex flex-column">
                COLOR
                <ChromePicker onChange={setColor} onChangeComplete={colorInputEvent} color={color} disableAlpha />
              </div>
            ) : null}

            {elementType === 12 ? (
              <div className="input-text d-flex flex-column">
                BORDER
                <input
                  type="number"
                  placeholder="Enter Border Value"
                  defaultValue={0}
                  onChange={inputEvent}
                  name="border"
                />
              </div>
            ) : null}

            {elementType === 15 ? (
              <div className="input-text d-flex flex-column">
                IMAGE WIDTH
                <input
                  type="number"
                  placeholder="Enter Image Width Value"
                  defaultValue={100}
                  onChange={inputEvent}
                  name="width"
                />
              </div>
            ) : null}

            {elementType === 15 ? (
              <div className="input-text d-flex flex-column">
                IMAGE HEIGHT
                <input
                  type="number"
                  placeholder="Enter Image Height Value"
                  defaultValue={100}
                  onChange={inputEvent}
                  name="height"
                />
              </div>
            ) : null}
            {elementType === 14 || elementType === 15 ? (
              <div className="input-text d-flex flex-column">
                BORDER RADIUS
                <input
                  type="number"
                  placeholder="Enter Border Radius Value"
                  defaultValue={0}
                  onChange={inputEvent}
                  name="borderRadius"
                />
              </div>
            ) : null}
            {elementType === 12 ? (
              <div className="input-text d-flex flex-column">
                TYPE
                <select name="type" onChange={inputEvent}>
                  <option value="solid">Solid</option>
                  <option value="dotted">Dotted</option>
                  <option value="dashed">Dash</option>
                </select>
              </div>
            ) : null}
          </>
        )}
      </form>
    </div>
  )
}

export default StylingProperty
