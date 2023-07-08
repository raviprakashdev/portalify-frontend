import React, { useState, createContext } from 'react'
import attachment_icon from '../assets/icons/elements_icon/attachment.png'
import checkbox_icon from '../assets/icons/elements_icon/checkbox.png'
import date_icon from '../assets/icons/elements_icon/date.png'
import dateAndTime_icon from '../assets/icons/elements_icon/dateAndTime.png'
import divider_icon from '../assets/icons/elements_icon/divider.png'
import dropdown_icon from '../assets/icons/elements_icon/dropdown.png'
import number_icon from '../assets/icons/elements_icon/number.png'
import singleLine_icon from '../assets/icons/elements_icon/singleLine.png'
import switch_icon from '../assets/icons/elements_icon/switch.png'
import textArea_icon from '../assets/icons/elements_icon/textArea.png'
import radioButton_icon from '../assets/icons/elements_icon/radioButton.png'
import imageselector_icon from '../assets/icons/elements_icon/image selector.png'
import image from '../assets/icons/elements_icon/image.png'
import uuid from 'uuid/v4'

export const UserContext = createContext()

const FormBuilderContext = (props) => {
  //--------------------------
  const [elementType, setElementType] = useState(-1)

  const [elementTypeName, setElementTypeName] = useState(null)
  // console.log('elementTypeValue===> in contect API:', elementType)
  //const [date, setDate] = useState(elementType === 4 || elementType === 5 ? new Date().toISOString().slice(0, 10) : null)

  const [userData, setUserData] = useState({
    // label: '',
    //default_value: `${date}`,
  })

  const updateUserData = (newData) => {
    setUserData((prevState) => ({
      ...prevState,
      ...newData,
    }))
  }

  // console.log('user data: ', userData)

  //--------------------------

  //--------------------------
  const elementList = [
    {
      type: 'Text Elements',
      elements: [
        {
          index: 1,
          id: uuid(),
          name: 'Single Line',
          icon: singleLine_icon,
          htmlContent: `<label id='htmlContentLabel' for='htmlContent'>Sample Label</label>  <input id='htmlContent' type='text'/>  `,
        },
        {
          index: 2,
          id: uuid(),
          name: 'Text Area',
          icon: textArea_icon,
          htmlContent: `<label id='htmlContentLabel' for='htmlContent'>Sample Label</label>   <input id='htmlContent' type='textarea'/>`,
        },
        {
          index: 3,
          id: uuid(),
          name: 'Number',
          icon: number_icon,
          htmlContent: `<label id='htmlContentLabel' for='htmlContent'>Sample Label</label>   <input id='htmlContent' type='number'/>`,
        },
      ],
    },
    {
      type: 'Date Elements',
      elements: [
        {
          index: 4,
          id: uuid(),
          name: 'Date',
          icon: date_icon,
          htmlContent: `<label id='htmlContentLabel' for='htmlContent'>Sample Label  </label>   <input id='htmlContent' type='date'/>`,
        },
        {
          index: 5,
          id: uuid(),
          name: 'Date & Time',
          icon: dateAndTime_icon,
          htmlContent: `<label id='htmlContentLabel' for='htmlContent'>Sample Label  </label>   <input id='htmlContent' type='datetime-local'/>`,
        },
      ],
    },

    {
      type: 'Multi Elements',
      elements: [
        {
          index: 6,
          id: uuid(),
          name: 'Dropdown',
          icon: dropdown_icon,
          htmlContent: `<select name='Sample'><option value='Sample'>Sample</option></select>`,
        },
        {
          index: 7,
          id: uuid(),
          name: 'Radio Button',
          icon: radioButton_icon,
          htmlContent: `<label><input type='radio' value='sample'/> Sample </label>`,
        },
        {
          index: 8,
          id: uuid(),
          name: 'Checkbox',
          icon: checkbox_icon,
          htmlContent: `<label><input type='checkbox' value='sample'/> Sample </label>`,
        },
        {
          index: 9,
          id: uuid(),
          name: 'Switch',
          icon: switch_icon,
          htmlContent: `<label for="toggle-switch" style="display: inline-block; width: 50px; height: 25px; background-color: gray; border-radius: 25px; position: relative;">
          <input type="checkbox" id="toggle-switch" style="display: none;">
          <span class="slider" style="position: absolute; top: 2px; left: 2px; width: 21px; height: 21px; background-color: white; border-radius: 50%; transition: 0.2s;"></span>
        </label>`,
        },
      ],
    },

    {
      type: 'Media Elements',
      elements: [
        {
          index: 10,
          id: uuid(),
          name: 'Image Selector',
          icon: imageselector_icon,
          htmlContent: `<label for='htmlContent'>Upload A Photo: </label> <input type="file" accept="image/*">`,
        },
        {
          index: 11,
          id: uuid(),
          name: 'Attachment',
          icon: attachment_icon,
          htmlContent: `<label for='htmlContent'>Upload An Attachment:   </label><input type='file'></type>`,
        },
      ],
    },
    {
      type: 'Other Elements',
      elements: [
        {
          index: 12,
          id: uuid(),
          name: 'Divider',
          icon: divider_icon,
          htmlContent: `<hr id='htmlContent' style="height:2px;border-width:0px;background-color:black;width:100%">`,
        },
      ],
    },
    {
      type: 'Form Properties',
      elements: [
        {
          index: 13,
          id: uuid(),
          name: 'Name',
          icon: singleLine_icon,
          htmlContent: `<h1 id='htmlContent'> Sample Name </h1>`,
        },
        {
          index: 14,
          id: uuid(),
          name: 'Button',
          icon: textArea_icon,
          htmlContent: `<input id='htmlContent' type='button' value='Sample Text'/>`,
        },
        {
          index: 15,
          id: uuid(),
          name: 'Image',
          icon: image,
          htmlContent: `<img id="htmlContent" src=${require('../../app/assets/formimage/sampleImage.jpg')} alt="image uploaded" width="30%" class="htmlContent" />`,
        },
      ],
    },
  ]
  //--------------------------
  const [state, setState] = useState({
    [uuid()]: [],
  })

  //--------------------------
  const allElements = []

  //--------------------------
  const [selectedElement, setSelectedElement] = useState([])

  //---------------------------
  return (
    <UserContext.Provider
      value={{
        ...userData,
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
        setElementTypeName,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default FormBuilderContext
