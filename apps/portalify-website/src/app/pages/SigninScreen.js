import React from 'react';
import { useState } from 'react';

const SigninScreen = ({form:SignInForm}) => {




  return (
    <section className='signin-screen'>
        <div className='container'>
            <div className='row'>

                <div className="col-lg-8 left-side">

                  <div className='logo'> <img src={require('../assets/logos/Logo-white.png')} alt="logo" className="img-fluid"/> </div>

                    
                    
                    <img src={require('../assets/sample-image.jpg')} alt="sampleimage" className="signin-image-child2 signin-image-all img-fluid justify-centre"/>
                    <img src={require('../assets/sample-image.jpg')} alt="sampleimage" className="signin-image-child3 signin-image-all img-fluid justify-centre"/>
                    <img src={require('../assets/sample-image.jpg')} alt="sampleimage" className="signin-image-child1 signin-image-all img-fluid justify-centre"/>
                    
                </div>





                <div className='col-lg-4 right-side'>
                        <SignInForm/>
                     
                </div>

            </div>

        </div>
    </section>


  );
};

export default SigninScreen;