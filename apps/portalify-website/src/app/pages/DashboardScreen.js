import React, { useState } from 'react';
import Leads from '../components/dashboard/leads';
import Mail from '../components/dashboard/mail';
import { NavLink } from 'react-router-dom';

const DashboardScreen = ({ children }) => {


    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: "fa fa-th-large"
        },
        {
            path: "/leads",
            name: "Leads",
            icon: "fa fa-tasks"
        },
        {
            path: "/mail",
            name: "Mail",
            icon: "fa fa-envelope"
        },
        {
            path: "/builder",
            name: "Builder",
            icon: "fa fa-clone"
        }

    ]


    return (
        <section className='dashboard-screen'>
            <div className='container'>
                <div className='row'>

                    <div className="col-3 left-side">

                        <div className='logo'> <img src={require('../assets/logos/Logo-white.png')} alt="logo" className="img-fluid" /> </div>
                        <div className="sidebar">

                            {
                                menuItem.map((item, index) => (
                                    <div className='dashboard-buttons'>
                                        <NavLink to={item.path} key={index} className="link d-flex" style={{ textDecoration: 'none' }}>
                                            <div className="icon"><i className={item.icon}></i></div>
                                            <div className="link_text"><span>{item.name}</span></div>
                                        </NavLink>


                                    </div>


                                ))


                            }

                            <div className='logout-dashboard'>
                            <div className="icon"><i className="fa fa-sign-out"></i></div>
                            <div className="link_text"><span>Logout</span></div>
                            </div>
                        </div>

                    </div>










                    <div className='col-9 right-side'>
                        <main>{children}</main>


                    </div>

                </div>

            </div>





        </section>


    );
};

export default DashboardScreen;
