import React from 'react'
import { useState, useEffect} from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/formbuilder-context'

const SingleLineInputProperty = (selectedElement) => {


  const { label, min_length, max_length, default_value, placeholder, required, updateUserData } =
    useContext(UserContext)

    

    const [state, setState] = useState({
      
      
        "8e8c0ed6-188c-495d-b269-8a8f8fe3ff79": [
            {
                "index": 1,
                "id": "6cd2b10a-a3c9-4407-a6d2-e28e63e5e210",
                "name": "Single Line",
                "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADUSURBVHgBzZNvDcIwEMUfC9+ZhOIACXOAhUrAAg6Yg0kABRsKFhQMB8MB3KXXrJBboQ0f9kteern+fW0PiGNILamXOJuG9BSdYgNXiDME4zakLemhDSwii1g4Oxc5WUnaIYMznCUjC3DcIhEjE/sg10qu1CbMWaukrYPcVdoDEhhk91HiIcip9tZKju/DwL3ODfppWR2+0MjOVumz+OFPebwFo/TxRY+iNzRr/G/uok/Ybo2Zl1sWvtb4b+yRR0c6clBhqvBcVQX+hLdmMZVFKh2peQEV1T1fpgFEkwAAAABJRU5ErkJggg==",
                "htmlContent": "<label> <input id='htmlContent' type='text' value=''/></label>",
                "label": ""
            },
            {
                "index": 1,
                "id": "26497b57-3c86-4bdc-a8a9-974724a93b4d",
                "name": "Single Line",
                "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADUSURBVHgBzZNvDcIwEMUfC9+ZhOIACXOAhUrAAg6Yg0kABRsKFhQMB8MB3KXXrJBboQ0f9kteern+fW0PiGNILamXOJuG9BSdYgNXiDME4zakLemhDSwii1g4Oxc5WUnaIYMznCUjC3DcIhEjE/sg10qu1CbMWaukrYPcVdoDEhhk91HiIcip9tZKju/DwL3ODfppWR2+0MjOVumz+OFPebwFo/TxRY+iNzRr/G/uok/Ybo2Zl1sWvtb4b+yRR0c6clBhqvBcVQX+hLdmMZVFKh2peQEV1T1fpgFEkwAAAABJRU5ErkJggg==",
                "htmlContent": "<label> <input id='htmlContent' type='text' value=''/></label>",
                "label": ""
            }
        ]
    
    
    
  })




  const inputEvent = (event) => {

//--------------------------------------------------------------------------------------------------------------------
    selectedElement=['8e8c0ed6-188c-495d-b269-8a8f8fe3ff79','6cd2b10a-a3c9-4407-a6d2-e28e63e5e210']
    var index=-1
    const key = selectedElement[0]
    const idToFind = selectedElement[1]
    const dataArray = state[key]
      if (key in state && Array.isArray(state[key])) {
         index = dataArray.findIndex((obj) => obj.id === idToFind)
         if (index !== -1) {
          const oldHtmlContent =  state[key][index].htmlContent
          console.log("old html==>", oldHtmlContent);
          const parser = new DOMParser();
          const newHtmlContent = parser.parseFromString(oldHtmlContent, 'text/html');
          
          //----------------------------------------------------------------------------------------------------------------------
          
          
              const { name, value } = event.target
              updateUserData({ [name]: value })
              switch (name) {
                case 'default_value':
                  {
                    const myInput = newHtmlContent.getElementById('htmlContent');
                    myInput.setAttribute('value', value);
          
                    setState((prevState) => {
                      const updatedArray = [...prevState[key]]
                      updatedArray[index] = { ...updatedArray[index], htmlContent: newHtmlContent.documentElement.innerHTML }
                      return { ...prevState, [key]: updatedArray }
                    })
                  
                    console.log(newHtmlContent.documentElement.innerHTML);
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
         else {
          console.log(`Object with id '${idToFind}' not found in data.`)

        console.log('testing picking old html from state==> ', state[key][index].htmlContent)
      }

//---------------------------------------------------------------------------------------------------------------------

    }
    else {
      console.log(`Invalid key '${key}' or array not found.`)
    }

  }


  //--------------------------------------------------------------------------------------------------------------

  // useEffect(() => {
  //   updateValueOnClick()
  //   console.log('selectedElement:', selectedElement)
  // }, [selectedElement])

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
