import React from 'react';
import { useState } from 'react';

const RegisterForm2 = () => {



    const[inputtext,setinputtext]=useState({
        email:"",
        password:""
        });
        
        
        const[eye,seteye]=useState(true);
        const[password,setpassword]=useState("password");
        const[ceye,setceye]=useState(true);
        const[cpassword,setcpassword]=useState("password");
        
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
        
        const Eye=()=>{
            if(password==="password"){
                setpassword("text");
                seteye(false);
            }
            else{
                setpassword("password");
                seteye(true);
            }
        }

        const CEye=()=>{
            if(cpassword==="password"){
                setcpassword("text");
                setceye(false);
            }
            else{
                setcpassword("password");
                setceye(true);
            }
        }


  return (
    
                             
                    
                    <div className="signin-card">
                            <div className="text my-auto">
                                Register
                            </div>
                        <form onSubmit={submitForm}>
                            <div className="input-text">
                             Organisation Name
                                <input type="text" placeholder="Organisation Name" value={inputtext.orgname} onChange={inputEvent} name="orgname" required/>
                            </div>
                            <div className="input-text">
                             Password
                                <input type={password} placeholder="Password" value={inputtext.password} onChange={inputEvent} name="password" required/>
                                
                                <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                            </div>
                            
                            <div className="input-text">
                              Confirm Password
                                <input type={cpassword} placeholder="Confirm Password" value={inputtext.cpassword} onChange={inputEvent} name="cpassword" required />
                                
                                <i onClick={CEye} className={`fa ${ceye ? "fa-eye-slash" : "fa-eye" }`}></i>
                            </div>
                            
                            <div className="input-text">
                             Registration Type *

                             <select name="rtype" class="form-control" required>
                                <option value="PartnershipFirm">Partnership Firm</option>
                                <option value="sample2">Sample 2</option>
                                <option value="sample3">Sample 3</option>
                             </select>
                            </div>

                            
                            <div className="buttons">
                                <button type="submit">Submit</button>
                            </div>
                            
                        </form>
                    </div>   


  );
};

export default RegisterForm2;
