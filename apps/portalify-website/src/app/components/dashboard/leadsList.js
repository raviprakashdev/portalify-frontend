import React from 'react'
import { useState } from 'react'

const LeadsList = () => {
  return (
    <div className="leadslist-box">
      <div className="leadslist-head-outer">
        <div className="leadslist-head">Today Leads</div>
        <div className="leadlist-view-more">View more</div>
      </div>
      <div className='row lead-table'>
        <div className='col-5 lead-name-col'>LEAD NAME</div>
        <div className='col-5 lead-name-col'>CONTACT</div>
        <div className='col-2 lead-name-col'>STATUS</div>
      </div>
      {/* <div className='metrics-number'>10</div>
      <div className='metrics-text'>Open Leads</div> */}
    </div>
  )
}

export default LeadsList
