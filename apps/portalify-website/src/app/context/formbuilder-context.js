import React, { useState, createContext } from 'react';
//import {inputtext} from '../components/formbuilder/singleLineInputProperty';
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
import image_icon from '../assets/icons/elements_icon/image.png'
import uuid from 'uuid/v4'

export const UserContext = createContext();

const FormBuilderContext=(props)=> {
  const [userData, setUserData] = useState({
    // label: '',
    // default_value: '',
  });



  const updateUserData = (newData) => {
    setUserData((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };

  const initializeUserData = (attributes) => {
    return attributes.reduce((acc, curr) => {
      acc[curr] = '';
      return acc;
    }, {});
  };

  const initialUserData = initializeUserData(['label', 'default_value']);


  console.log("user data: ",userData);

  //------------1--------------
  const elementList = [
    {
      type: 'Text Elements',
      elements: [
        {
          index: 1,
          id: uuid(),
          name: 'Single Line',
          icon: singleLine_icon,
          htmlContent: `<label> <input id='htmlContent' type='text' value=''/></label>`,
          label: '',
        },
        {
          index: 2,
          id: uuid(),
          name: 'Text Area',
          icon: textArea_icon,
          htmlContent: `<input type='textarea'/>`,
        },
        {
          index: 3,
          id: uuid(),
          name: 'Number',
          icon: number_icon,
          htmlContent: `<input type='number'/>`,
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
          htmlContent: `<input type='date'/>`,
        },
        {
          index: 5,
          id: uuid(),
          name: 'Date & Time',
          icon: dateAndTime_icon,
          htmlContent: `<input type='datetime-local'/>`,
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
          name: 'Image',
          icon: image_icon,
          htmlContent: `<label>Upload A Photo:<input type="file" accept="image/*"></label>`,
        },
        {
          index: 11,
          id: uuid(),
          name: 'Attachment',
          icon: attachment_icon,
          htmlContent: `<label >Upload An Attachment:<input type='file'></type></label>`,
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
          htmlContent: `<hr style="height:2px;border-width:10;color:black;background-color:black">`,
        },
      ],
    },
  ]
//------------2--------------
  const [state, setState] = useState({
    [uuid()]: [],
  })

//------------3--------------
  const allElements = []


//------------4--------------
  const [selectedElement, setSelectedElement] = useState([])

//---------------------------
  return (
    <UserContext.Provider value={{ ...initialUserData, ...userData, updateUserData,elementList,allElements,selectedElement,setSelectedElement,state,setState }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default FormBuilderContext;