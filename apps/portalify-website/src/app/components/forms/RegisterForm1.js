import React from 'react';
import { useState } from 'react';

const RegisterForm1 = () => {


    const[inputtext,setinputtext]=useState({
        email:"",
        password:""
        });

        const inputEvent=(event)=>{
            const name=event.target.name;
            const value=event.target.value;
            setinputtext((lastValue)=>{
            return{
            ...lastValue,
            [name]:value
            }
            });
            
            }
        
        
        
        const submitForm=(e)=>{   
        alert("form submitted"); 
        }
        
        

  return (
    
                        
                    
                    <div className="signin-card">
                            <div className="text my-auto">
                                Register
                            </div>
                        <form onSubmit={submitForm}>

                            <div className="input-text">
                            First Name
                                <input type="text" placeholder="First Name" value={inputtext.firstname} onChange={inputEvent} name="firstname" required/>
                            </div>

                            <div className="input-text">
                            Last Name
                                <input type="text" placeholder="Last Name" value={inputtext.lastname} onChange={inputEvent} name="lastname" required/>
                            </div>

                            <div className="input-text">
                            Organisation Name
                                <input type="text" placeholder="Organisation Name" value={inputtext.orgname} onChange={inputEvent} name="orgname" required/>
                            </div>

                            <div className="buttons">
                                <button type="submit">Sign up</button>
                            </div>
                            
                        </form>
                    </div>   


  );
};

export default RegisterForm1;
