import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { useSelector } from 'react-redux'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  let cart = useSelector((store) => store.cart)
  return (
    <header>
      <h1>
        <img src="../bookstack-logo.png" alt="bookstack logo" />
      </h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            {/* The navbar will show these links after you log in */}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/products/">Products</Link>
            {isAdmin ? <Link to="/users/">Users</Link> : null}
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/home/">Home</Link>
            <Link to="/products/">Products</Link>
            <Link to="/login/">Login</Link>
            <Link to="/signup/">Sign Up</Link>
          </div>
        )}

        <div>
          <Link to="/cart/">Cart({cart.totalItems})</Link>
        </div>
      </nav>
      <hr />
    </header>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)
