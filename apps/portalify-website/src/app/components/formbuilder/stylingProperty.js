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
  const [bgcolor, setbgColor] = useState('#f9000000')

  const inputEvent = (event) => {
    //console.log('event==>', event)
    //---------------------------------------getting old html from selected element---------------------------------------------
    var index = -1
    const key = selectedElement[0]
    const idToFind = selectedElement[1]
    const dataArray = state[key]
    if (key in state && Array.isArray(state[key])) {
      index = dataArray.findIndex((obj) => obj.id === idToFind)
      if (index !== -1) {
        const oldHtmlContent = state[key][index].htmlContent
        const parser = new DOMParser()
        const newHtmlContent = parser.parseFromString(oldHtmlContent, 'text/html')

        //------------------------------------updating the element attribute-----------------------------------------------------

        const { name, value } = event.target
        console.log('name==>', name)
        updateUserData({ [name]: value })
        switch (name) {
          case 'border':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              myInput.style.borderWidth = value

              setState((prevState) => {
                const updatedArray = [...prevState[key]]
                updatedArray[index] = {
                  ...updatedArray[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return { ...prevState, [key]: updatedArray }
              })
            }
            break
          case 'align':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')

              switch (value) {
                case 'left':
                  myInput.style.textAlign = 'left'
                  break
                case 'center':
                  myInput.style.textAlign = 'center'
                  break
                case 'right':
                  myInput.style.textAlign = 'right'
                  break
                default:
                  break
              }
              setState((prevState) => {
                const updatedArray = [...prevState[key]]
                updatedArray[index] = {
                  ...updatedArray[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return { ...prevState, [key]: updatedArray }
              })
            }
            break
            case 'fontStyle':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              switch (value) {
                case 'bold':
                  myInput.style.fontWeight = myInput.style.fontWeight === 'bold' ? 'normal' : 'bold';
                  break
                case 'italic':
                  myInput.style.fontStyle = myInput.fontStyle === 'italic' ? 'normal' : 'italic';
                  break
                case 'underline':
                  myInput.style.textDecoration = myInput.textDecoration === 'underline' ? 'none' : 'underline';
                  break
                default:
                  break
              }
              setState((prevState) => {
                const updatedArray = [...prevState[key]]
                updatedArray[index] = {
                  ...updatedArray[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return { ...prevState, [key]: updatedArray }
              })
            }
            break
            case 'font':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')

              switch (value) {
                case 'Courier':
                  myInput.style.fontFamily = 'Courier'
                  break
                case 'Helvetica':
                  myInput.style.fontFamily = 'Helvetica'
                  break
                case 'Times-Roman':
                  myInput.style.fontFamily = 'Times-Roman'
                  break
                default:
                  break
              }
              setState((prevState) => {
                const updatedArray = [...prevState[key]]
                updatedArray[index] = {
                  ...updatedArray[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return { ...prevState, [key]: updatedArray }
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
                const updatedArray = [...prevState[key]]
                updatedArray[index] = {
                  ...updatedArray[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
                return { ...prevState, [key]: updatedArray }
              })
            }
            break
          case 'margin':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')
              myInput.style.marginTop = value
              myInput.style.marginBottom = value

              setState((prevState) => {
                const updatedArray = [...prevState[key]]
                updatedArray[index] = {
                  ...updatedArray[index],
                  htmlContent: newHtmlContent.documentElement.innerHTML,
                }
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
    const dataArray = state[key]
    if (key in state && Array.isArray(state[key])) {
      index = dataArray.findIndex((obj) => obj.id === idToFind)
      if (index !== -1) {
        const oldHtmlContent = state[key][index].htmlContent
        const parser = new DOMParser()
        const newHtmlContent = parser.parseFromString(oldHtmlContent, 'text/html')

        //------------------------------------updating the element attribute-----------------------------------------------------

        //console.log('color==>', color)
        const myInput = newHtmlContent.getElementById('htmlContent')
        myInput.style.color = color.hex
        //myInput.style.backgroundColor = color.hex

        setState((prevState) => {
          const updatedArray = [...prevState[key]]
          updatedArray[index] = {
            ...updatedArray[index],
            htmlContent: newHtmlContent.documentElement.innerHTML,
          }
          return { ...prevState, [key]: updatedArray }
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
    const dataArray = state[key]
    if (key in state && Array.isArray(state[key])) {
      index = dataArray.findIndex((obj) => obj.id === idToFind)
      if (index !== -1) {
        const oldHtmlContent = state[key][index].htmlContent
        const parser = new DOMParser()
        const newHtmlContent = parser.parseFromString(oldHtmlContent, 'text/html')

        //------------------------------------updating the element attribute-----------------------------------------------------

        //console.log('color==>', color)
        const myInput = newHtmlContent.getElementById('htmlContent')
        //myInput.style.color = color.hex
        myInput.style.backgroundColor = color.hex

        setState((prevState) => {
          const updatedArray = [...prevState[key]]
          updatedArray[index] = {
            ...updatedArray[index],
            htmlContent: newHtmlContent.documentElement.innerHTML,
          }
          return { ...prevState, [key]: updatedArray }
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

  //--------------------------------------------------------------------------------------------------------------

  return (
    <div>
      {elementTypeName != null ? (
        <div className="input-text">
          <Notice>{/* Selected: {elementTypeName}  */}</Notice>
        </div>
      ) : null}
      <form>
        {elementType === -1 || elementType === undefined ? (
          <Notice>{/* Select An Element */}</Notice>
        ) : (
          <>
            {elementType === 13 ? (
              <div className="input-text">
                FONT STYLE
                <select name="fontStyle" onChange={inputEvent}>
                  <option value="bold">Bold</option>
                  <option value="italic">Italic</option>
                  <option value="underline">Underline</option>
                </select>
              </div>
            ) : null}


            {elementType === 12 || elementType === 13 ? (
              <div className="input-text">
                COLOR
                <ChromePicker onChange={setColor} onChangeComplete={colorInputEvent} color={color} disableAlpha />
              </div>
            ) : null}

            {elementType === 13 ? (
              <div className="input-text">
                BACKGROUND COLOR
                <ChromePicker onChange={setbgColor} onChangeComplete={bgcolorInputEvent} color={bgcolor} disableAlpha />
              </div>
            ) : null}

            {elementType === 13 ? (
              <div className="input-text">
                FONT
                <select name="font" onChange={inputEvent}>
                  <option value="Courier">Courier</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times-Roman">Times-Roman</option>
                </select>
              </div>
            ) : null}

            {elementType === 12 ? (
              <div className="input-text">
                BORDER
                <input
                  type="number"
                  placeholder="Enter Minimum Length"
                  defaultValue={0}
                  onChange={inputEvent}
                  name="border"
                />
              </div>
            ) : null}

            {elementType === 13 ? (
              <div className="input-text">
                ALIGN
                <select name="align" onChange={inputEvent}>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            ) : null}
            {elementType === 12 ? (
              <div className="input-text">
                TYPE
                <select name="type" onChange={inputEvent}>
                  <option value="solid">Solid</option>
                  <option value="dotted">Dotted</option>
                  <option value="dashed">Dash</option>
                </select>
              </div>
            ) : null}

            {elementType === 12 || elementType === 13 ? (
              <div className="input-text">
                MARGIN
                <input
                  type="number"
                  placeholder="Enter Minimum Length"
                  defaultValue={0}
                  onChange={inputEvent}
                  name="margin"
                />
              </div>
            ) : null}
          </>
        )}
      </form>
    </div>
  )
}

export default StylingProperty
