import React, { useState, createContext } from 'react';
import {inputtext} from '../components/formbuilder/singleLineInputProperty';

export const UserContext = createContext({
  user: {},
  updateUsername: () => {},
});

const FormBuilderContext=(props)=> {
  const [userData, setUserData] = useState({
    // label: '',
    // default_value: '',
  });

  // const [newHtmlContent, setNewHtmlContent] = useState("");


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


  // const handleChange=(event)=>{
  //   const { name, value } = event.target;
  //   updateUserData({ [name]: value });
  //   switch (name) {
  //     case "label":
  //       console.log("switch case actove:"+userData);
        
  //       break;
  //     // case "new":
  //     //   setNewValue(value);
  //     //   break;
  //     // case "placeholder":
  //     //   setPlaceholderValue(value);
  //     //   break;
  //     default:
  //       break;
  //   }
  // }

  console.log("user data: ",userData);

 

  return (
    <UserContext.Provider value={{ ...initialUserData, ...userData, updateUserData }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default FormBuilderContext;
