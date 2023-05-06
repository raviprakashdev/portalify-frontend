import React from 'react'
import { useState } from 'react'
import MeetingCard from '../dashboard/meetingCard'

const MeetingsList = () => {
  return (
    <div className="meetinglist-box">
      <div className="meeting-head">Today Meetings</div>
      <div>
        <MeetingCard />
        <ul className="bar">
          <li></li>
          <li></li>
        </ul>
        <MeetingCard />
        <ul className="bar">
          <li></li>
          <li></li>
        </ul>
        <MeetingCard />
      </div>
      {/* <div className='metrics-number'>10</div>
      <div className='metrics-text'>Open Leads</div> */}
    </div>
  )
}

export default MeetingsList
