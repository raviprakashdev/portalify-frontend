import { useContext, useState } from 'react'
import { UserContext } from '../../context/formbuilder-context'
import { ChromePicker } from 'react-color'
const GlobalProperty = ({ Notice }) => {
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
  const [globalBgcolor, setglobalBgColor] = useState('#f9000000')



  


  //-----------------------------------------bgcontent color picker input-----------------------------------------------------------------
  const globalBgcolorInputEvent = (color) => {
    //console.log('event==>', event)
    //---------------------------------------getting old html from selected element---------------------------------------------

    const key =  Object.keys(state)[0];
    const dataArray = state[key]?.htmlContent;
  
    if (dataArray) {
      const oldHtmlContent = { ...dataArray };
        const name="background-color";
      oldHtmlContent[name] = color.hex;
      const newHtmlContent = { ...oldHtmlContent };

      setState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          htmlContent: newHtmlContent,
        },
      }));

      

      } 
 }

  //--------------------------------------------------------------------------------------------------------------



  //---------------------------------GLOBAL STYLING-----------------------------


  const globalStyling = (event) => {
    const { name, value } = event.target;
    const key =  Object.keys(state)[0];
    const dataArray = state[key]?.htmlContent;
  
    if (dataArray) {
      const oldHtmlContent = { ...dataArray };
      switch (name) {
        case 'margin':{
          oldHtmlContent[name] = value + 'px';
      const newHtmlContent = { ...oldHtmlContent };

      // Update the state with the new HTML content
      setState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          htmlContent: newHtmlContent,
        },
      }));
        }
        break

        case 'padding':{
          oldHtmlContent[name] = value + 'px';
      const newHtmlContent = { ...oldHtmlContent };

      // Update the state with the new HTML content
      setState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          htmlContent: newHtmlContent,
        },
      }));
        }
        break
        case 'border':
          {

            oldHtmlContent[name] = value + 'px solid #828282';
            const newHtmlContent = { ...oldHtmlContent };
         
      
            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break
          case 'border-radius':
          {

            oldHtmlContent[name] = value + 'px';
            const newHtmlContent = { ...oldHtmlContent };
      
            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break
          case 'background-image':
          {

            
                const file = event.target.files[0]
                if (file) {
                  let value= URL.createObjectURL(file);
                
              

            oldHtmlContent[name] = `url('${value}')`
        }
            const newHtmlContent = { ...oldHtmlContent };
                
      
            // Update the state with the new HTML content
            setState((prevState) => ({
              ...prevState,
              [key]: {
                ...prevState[key],
                htmlContent: newHtmlContent,
              },
            }));
          }
          break
        default:
          break;

      }
  
    }
  };

  return (
    <div>
      <form>
       
          
            

           
              <div className="input-text d-flex flex-column">
                GLOBAL MARGIN
                <input
                  type="number"
                  placeholder="Enter Margin Value"
                  defaultValue={0}
                  onChange={globalStyling}
                  name="margin"
                />
              </div>

              <div className="input-text d-flex flex-column">
                GLOBAL PADDING
                <input
                  type="number"
                  placeholder="Enter Padding Value"
                  defaultValue={8}
                  onChange={globalStyling}
                  name="padding"
                />
              </div>
              <div className="input-text d-flex flex-column">
                GLOBAL BORDER
                <input
                  type="number"
                  placeholder="Enter Border Value"
                  defaultValue={0}
                  onChange={globalStyling}
                  name="border"
                />
              </div>
              <div className="input-text d-flex flex-column">
                GLOBAL BORDER RADIUS
                <input
                  type="number"
                  placeholder="Enter Border Value"
                  defaultValue={0}
                  onChange={globalStyling}
                  name="border-radius"
                />
              </div>

              <div className="input-text d-flex flex-column">
                GLOBAL BACKGROUND IMAGE
                <input type="file" accept="image/*" onChange={globalStyling} name="background-image" />
              </div>

              <div className="input-text">
                GLOBAL BACKGROUND COLOR
                <ChromePicker onChange={setglobalBgColor} onChangeComplete={globalBgcolorInputEvent} color={globalBgcolor} disableAlpha />
              </div>

              
          
      </form>
    </div>
  )
}

export default GlobalProperty
