import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';
import Login from './Login.js';
import Favorites from './Favorites.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  
} from 'react-router-dom';
import SideNav,
{ Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './react-sidenav.css';

export default class App extends Component {
  state = {
    token: localStorage.getItem('token'),
  }

  handleToken = (token) => {
this.setState({ token: token })
localStorage.setItem( 'token', token)
  }

  clearToken = () => {
    this.setState({ token: ''})

    localStorage.setItem('token', '')
  }
  render() {
    
  return (
    <div className="App">
      <Router>
             <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav className='side-bar'
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="/">
                    <NavItem eventKey="">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Login
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="favorites">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Favorites
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
              <Switch>
                <Route path="/" exact render={(routerProps) => <Login handleToken={this.handleToken} token={this.state.token} clearToken={this.clearToken} {...routerProps} />} />
                <Route path='/home' render={(routerProps) => <Home token={this.state.token} {...routerProps}/>} />
                <Route path="/favorites" render={(routerProps) => <Favorites token={this.state.token} {...routerProps}/>} />
              </Switch>
            </main>
        </React.Fragment>
    )}
    />
                    </Router>
    </div>
  );
}


}