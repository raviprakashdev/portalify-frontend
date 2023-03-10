import React from 'react'
import { NavLink } from 'react-router-dom'
import dashboard_icon from '../assets/icons/dashboard_icon.png'
import leads_icon from '../assets/icons/leads_icon.png'
import mail_icon from '../assets/icons/mail_icon.png'
import builder_icon from '../assets/icons/builder_icon.png'

const DashboardScreen = ({ children }) => {
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
    <section className="dashboard-screen">
      <div className="container">
        <div className="row">
          <div className="col-2 left-side">
            <div className="logo">
              {' '}
              <img src={require('../assets/logos/Logo-white.png')} alt="logo" className="img-fluid" />{' '}
            </div>
            <div className="sidebar">
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

              <div className="logout-dashboard">
                <div className="icon">
                  <img src={require('../assets/icons/logout_icon.png')} alt="icon" />
                </div>
                <div className="link_text">
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-10 right-side">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardScreen