import React from 'react'
import Typed from 'react-typed'
import { Player } from '@lottiefiles/react-lottie-player'
const ConfirmAuthScreen = () => {
  return (
    <section className="welcome-screen">
      <div className="container">
        <div className="logo">
          {' '}
          <img src={require('../assets/logos/Logo-white.png')} alt="logo" className="img-fluid" />{' '}
        </div>

        <div className="row">
          <div className="welcome-content">Please Check Your Inbox For Login Credentials</div>
        </div>
      </div>
    </section>
  )
}

export default ConfirmAuthScreen
