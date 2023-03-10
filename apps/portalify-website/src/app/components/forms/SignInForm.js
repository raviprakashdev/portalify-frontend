import React from 'react'
import { useState } from 'react'

const SignInForm = () => {
  const [inputtext, setinputtext] = useState({
    email: '',
    password: '',
  })

  const [eye, seteye] = useState(true)
  const [password, setpassword] = useState('password')
  const [type, settype] = useState(false)

  const inputEvent = (event) => {
    const name = event.target.name
    const value = event.target.value
    setinputtext((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      }
    })
  }

  const submitForm = (e) => {
    alert('form submitted')
  }

  const Eye = () => {
    if (password === 'password') {
      setpassword('text')
      seteye(false)
      settype(true)
    } else {
      setpassword('password')
      seteye(true)
      settype(false)
    }
  }

  return (
    <>
      <p>Sales Dashboard</p>

      <div className="signin-card">
        <div className="text my-auto">Sign In</div>
        <form onSubmit={submitForm}>
          <div className="input-text">
            Email
            <input
              type="email"
              placeholder="Registered mail ID"
              value={inputtext.email}
              onChange={inputEvent}
              name="email"
              required
            />
          </div>
          <div className="input-text">
            Password
            <input
              type={password}
              placeholder="Password"
              value={inputtext.password}
              onChange={inputEvent}
              name="password"
              required
            />
            <i onClick={Eye} className={`fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </div>
          <div className="forgot">
            <a href="#">Forgot password? </a>
          </div>
          <div className="buttons">
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignInForm
