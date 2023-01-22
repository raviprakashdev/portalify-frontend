import React from 'react';
import { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const RegisterForm2 = () => {


    
    const [inputtext, setinputtext] = useState({
        email: "",
        password: ""
    });

    //country selector
    const [value, setValue] = useState('');
    const options = useMemo(() => countryList().getData(), []);
    const changeHandlerCountry = value => {
        setValue(value);
    }

    //select primary interests
    const [primaryInt, setPrimaryInt] = useState('');
    const changeHandlerPrimaryInt = value => {
        setPrimaryInt(value);
    }
    const primaryIntList = [
        { value: 'company', label: 'Use it in my company' },
        { value: 'student', label: 'I am a student' },
        { value: 'teacher', label: 'I am a teacher' },
        { value: 'others', label: 'Others' },
    ];

    //select company size
    const [companySize, setCompanySize] = useState('');
    const changeHandlerCompanySize = value => {
        setCompanySize(value);
    }
    const companySizeList = [
        { value: 'lessThan5', label: '< 5 employees' },
        { value: 'lessThan20', label: '5 - 20 employees' },
        { value: 'lessThan50', label: '20 - 50 employees' },
        { value: 'lessThan250', label: '50 - 250 employees' },
        { value: 'moreThan250', label: '> 250 employees' },
    ];

        //select registration Type
        const [rType, setRType] = useState('');
        const changeHandlerRType = value => {
            setRType(value);
        }
        const rTypeList = [
            { value: 'PartnershipFirm', label: 'Organisation / Company' },
            { value: 'sample2', label: 'Individual' },
            { value: 'sample3', label: 'Student' },
            { value: 'sample3', label: 'Other' },
        ];



    //password visibility eye
    // const [eye, seteye] = useState(true);
    // const [password, setpassword] = useState("password");
    // const [ceye, setceye] = useState(true);
    // const [cpassword, setcpassword] = useState("password");

    // const Eye = () => {
    //     if (password === "password") {
    //         setpassword("text");
    //         seteye(false);
    //     }
    //     else {
    //         setpassword("password");
    //         seteye(true);
    //     }
    // }

    // const CEye = () => {
    //     if (cpassword === "password") {
    //         setcpassword("text");
    //         setceye(false);
    //     }
    //     else {
    //         setcpassword("password");
    //         setceye(true);
    //     }
    // }

    const inputEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setinputtext((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        });

    }

    const submitForm = (e) => {
        alert("form submitted");
    }


    return (



        <div className="signin-card">
            <div className="text my-auto">
                Register
            </div>
            <form onSubmit={submitForm}>
                <div className="input-text">
                    Company Name
                    <input type="text" placeholder="Company Name" value={inputtext.campanyname} onChange={inputEvent} name="campanyname" required />
                </div>

                <div className="input-text">
                    Registration Type *
                    <Select options={rTypeList} value={rType} onChange={changeHandlerRType} />
                </div>

                <div className="input-text">
                    Company Size
                    <Select options={companySizeList} value={companySize} onChange={changeHandlerCompanySize} />
                </div>


                {/* <div className="input-text">
                    Password
                    <input type={password} placeholder="Password" value={inputtext.password} onChange={inputEvent} name="password" required />

                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                </div>

                <div className="input-text">
                    Confirm Password
                    <input type={cpassword} placeholder="Confirm Password" value={inputtext.cpassword} onChange={inputEvent} name="cpassword" required />

                    <i onClick={CEye} className={`fa ${ceye ? "fa-eye-slash" : "fa-eye"}`}></i>
                </div> */}

               


                <div className="input-text">
                    Country
                    <Select options={options} value={value} onChange={changeHandlerCountry} />
                </div>

                <div className="input-text">
                    Primary Interest
                    <Select options={primaryIntList} value={primaryInt} onChange={changeHandlerPrimaryInt} />
                </div>



                <div className="buttons">
                    <button type="submit">Submit</button>
                </div>

            </form>
        </div>


    );
};

export default RegisterForm2;
