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


  console.log(userData);

  return (
    <UserContext.Provider value={{ ...initialUserData, ...userData, updateUserData }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default FormBuilderContext;
