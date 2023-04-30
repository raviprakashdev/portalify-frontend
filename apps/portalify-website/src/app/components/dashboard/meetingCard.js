import React from 'react'
import { useState } from 'react'
import callIcon from '../../assets/icons/elements_icon/call-icon.png'

const MeetingCard = () => {
  return (
    <div className="row">
      <div className="col-2 meeting-time">07:00 AM</div>
      <div className="col-10">
        <div className="meeting-card-box row">
          <div className="col-2 " style={{padding:"0"}}>
            <div className="meeting-card-icon">
            <img src={callIcon} alt="logo" className="img-fluid" />
            </div>
          </div>
          <div className="col-10 meeting-card-content-outer">
            <div className="meeting-card-content">
                <div className='meeting-title'>Meeting title lorem ipsum</div>
                <div className='meeting-attendee'>Attendee: Jane Doe </div>
            </div>
          </div>
          {/* <div className='metrics-number'>10</div> */}
          {/* <div className='metrics-text'>Open Leads</div> */}
        </div>
      </div>
    </div>
  )
}

export default MeetingCard
