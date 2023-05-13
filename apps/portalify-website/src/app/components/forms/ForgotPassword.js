import React from 'react'
import { useState } from 'react'

const ForgotPassword = () => {
  const [inputtext, setinputtext] = useState({
    email: '',
  })

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
    // console.log(inputtext)
    alert('form submitted')
  }

  return (
    <div className="signin-card">
      <div className="text my-auto">Forgot Password?</div>

      <p>Enter your registered Email ID. We'll send you a link to reset your password.</p>
      <form onSubmit={submitForm}>
        <div className="input-text">
          Email ID
          <input
            type="email"
            placeholder="Email ID"
            value={inputtext.email}
            onChange={inputEvent}
            name="email"
            required
          />
        </div>

        <div className="buttons">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
