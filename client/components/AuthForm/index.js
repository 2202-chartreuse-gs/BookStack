import React, { useRef, useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../../store'
import './index.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // this is where we set react router to redirect to the home page

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  return (
    <div className='container'>
      {displayName === "Sign Up" ? (
        <div className='screens'>
          <div className='title'>{displayName}</div>
            <form className='login__field' onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                name="email"
                type="text"
                ref={userRef}
                onChange={(evt) => setEmail(evt.target.value)}
                value={email}
                required />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>


          <div>
            <button type="submit">{displayName}</button>
          </div>
            {error && error.response && <div> {error.response.data} </div>}

        </form>
      </div>
      ) : (
        <>
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

                <button className="button signin__submit" type="submit">{displayName}</button>


              {error && error.response && <div> {error.response.data} </div>}
            </form>

          </div>
            <div class="screen__background">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
            </div>
        </div>
        </>
        )
      }
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      if (evt.target.name === 'signup') {
        const formName = evt.target.name
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        const email = evt.target.email.value
        const password = evt.target.password.value

        dispatch(authenticate(firstName, lastName, email, password, formName))
      } else {
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(authenticate(null, null, email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
