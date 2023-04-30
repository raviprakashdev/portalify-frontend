import React from 'react'
import { useState } from 'react'

const TopBar = () => {
  return (
    <div className='topbar row'>
        <div className="col-10">
      <div className="text my-auto topbar-head">Sales Dashboard</div>
      </div>
      <div className="col-2" style={{display:"flex"}}>
        <div className="logout-dashboard d-flex justify-content-evenly align-items-center">
          <div className="user-image" style={{marginRight:"10px"}}>
            <img src={require('../../assets/sample-user-image.png')} alt="icon" />
          </div>
          <div className="user-name">John Doe</div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
