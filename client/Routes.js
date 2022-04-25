import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home'
import AllProducts from './components/AllProducts'
import AllUsers from './components/AllUsers'
import { me } from './store'
import SingleProduct from './components/SingleProduct'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import AdminDashboard from './components/AdminDashboard'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/logout" component={Home} />
            <Route path="/users" component={AllUsers} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:productId" component={SingleProduct} />
            <Route path="/admin" component={AdminDashboard} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/users" component={AllUsers} />
            <Route
              exact
              path="/products/:productId"
              component={SingleProduct}
            />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
