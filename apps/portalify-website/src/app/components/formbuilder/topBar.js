import React from 'react'
import { NavLink } from 'react-router-dom'
import dashboard_icon from '../../assets/icons/dashboard_icon.png'
import leads_icon from '../../assets/icons/leads_icon.png'
import mail_icon from '../../assets/icons/mail_icon.png'
import builder_icon from '../../assets/icons/builder_icon.png'

const TopBar = () => {
  const menuItem = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: dashboard_icon,
    },
    {
      path: '/leads',
      name: 'Leads',
      icon: leads_icon,
    },
    {
      path: '/mail',
      name: 'Mail',
      icon: mail_icon,
    },
    {
      path: '/builder',
      name: 'Builder',
      icon: builder_icon,
    },
  ]

  return (
    <div className="row top-bar align-items-center m-0">
      <div className="col-2">
        <div className="logo">
          {' '}
          <img src={require('../../assets/logos/Logo-white.png')} alt="logo" className="img-fluid" />{' '}
        </div>
      </div>

      <div className="col-8">
        <div className="sidebar d-flex justify-content-evenly">
          {menuItem.map((item, index) => (
            <div className="dashboard-buttons">
              <NavLink
                to={item.path}
                key={index}
                className="link d-flex align-items-center"
                style={{ textDecoration: 'none' }}
              >
                <div className="icon">
                  {' '}
                  <img src={item.icon} alt="icon" />
                </div>
                <div className="link_text">
                  <span>{item.name}</span>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      <div className="col-2">
        <div className="logout-dashboard d-flex justify-content-evenly align-items-center">
          <div className="icon">
            <img src={require('../../assets/icons/logout_icon.png')} alt="icon" />
          </div>
          <div className="user-image">
            <img src={require('../../assets/sample-user-image.png')} alt="icon" />
          </div>
          <div className="user-name">John Doe</div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
