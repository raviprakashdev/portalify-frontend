import React from 'react'
import TopBar from '../components/formbuilder/topBar'
import Elements from '../components/formbuilder/elements'
import SingleLineInputProperty from '../components/formbuilder/singleLineInputProperty'

const FormBuilderScreen = () => {
  return (
    <section className="formbuilder-screen">
      <div className="container">
        <TopBar />
        <div className="row ">
          <div className="col-3 elementList">
            <Elements />
          </div>
          <div className="col-6">Main Area</div>
          <div className="col-3 inputProperties">
            <p>INPUT PROPERTIES</p> <SingleLineInputProperty />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormBuilderScreen
