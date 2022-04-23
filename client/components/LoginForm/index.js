import React, { useRef, useState, useEffect, Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { authenticate } from '../../store'
import './index.css'


/**
 * Component
 */
const LoginForm = props => {
  const { name, displayName, handleSubmit, error } = props

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // this is where we set react router to redirect to the home page

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  return (
    <>
      <div className='container'>
        <div className='screen'>
          <div className='screen__content'>
            <form className='signin' onSubmit={handleSubmit} name={name}>
              <div className="signin__field">
                <i className='signin__icon fas fa-user'></i>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input
                  name="email"
                  type="text"
                  className="signin__input"
                  placeholder='Enter your email'
                  ref={userRef}
                  onChange={(evt) => setEmail(evt.target.value)}
                  value={email}
                  required
                  />
              </div>
              <div className="signin__field">
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input
                  name="password"
                  type="password"
                  className="signin__input"
                  placeholder='Password'
                  onChange={(evt) => setPassword(evt.target.value)}
                  value={password}
                  required
                  />
              </div>
              <button className="button signin__submit" type="submit">Login</button>
                {error && error.response && <div> {error.response.data} </div>}
            </form>

          </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value

      dispatch(authenticate(null, null, email, password, formName))
    }
  }
}

export default connect(mapLogin, mapDispatch)(LoginForm)
