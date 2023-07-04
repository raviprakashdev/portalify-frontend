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

  const inputEvent = (event) => {
    console.log('event==>', event)
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
          case 'type':
            {
              const myInput = newHtmlContent.getElementById('htmlContent')

              switch (value) {
                case 'solid':
                  myInput.style.borderStyle = 'solid'
                  break
                case 'dash':
                  myInput.style.borderStyle = 'dash'
                  break
                case 'dotted':
                  myInput.style.borderStyle = 'dotted'
                  break
                // Add more cases for other <hr> types
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

  //-----------------------------------------color picker input-----------------------------------------------------------------

  const colorInputEvent = (color, event) => {
    console.log('event==>', event)
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

        console.log('color==>', color)
        const myInput = newHtmlContent.getElementById('htmlContent')
        myInput.style.color = color.hex
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
            {elementType === 12 ? (
              <div className="input-text">
                COLOR PICKER
                <ChromePicker onChange={setColor} onChangeComplete={colorInputEvent} color={color} disableAlpha />
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

            {elementType === 12 ? (
              <div className="input-text">
                TYPE
                <select name="type" onChange={inputEvent}>
                <option value="solid">Solid</option>
                  <option value="dotted">Dotted</option>
                  <option value="dash">Dash</option>
                </select>
              </div>
            ) : null}

            {elementType === 12 ? (
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