import React, { Component } from 'react';

export const LoginContext = React.createContext();

// const jwtDecode = require('jwt-decode');

class LoginProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthenticated: false,
      reset: false,
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if(this.props !== nextProps)
    this.setState({reset: false});
  }

  logIn = (res, token) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('name', `${res.name}`);
    localStorage.setItem('email', `${res.email}`);
    sessionStorage.setItem('loginFlag', true);
    this.setState({
      isAuthenticated: true,
      user: {
        name: res.name,
        email: res.email,
      },
    });
  };

  logOut = res => {
    localStorage.clear();
    sessionStorage.removeItem('loginFlag');
    this.setState({
      isAuthenticated: false,
    });
    if(res === 'viaReset') 
    this.setState({
      reset: true,
    });
  };

  render() {
    return (
      <LoginContext.Provider
        value={{
          ...this.state,
          logIn: this.logIn,
          logOut: this.logOut,
        }}
      >
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}
export default LoginProvider;
