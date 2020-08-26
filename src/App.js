import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';
import Login from './Login.js';
import Favorites from './Favorites.js';
import SearchPage from './SearchPage.js';
import DetailPage from './DetailPage.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  
} from 'react-router-dom';
import SideNav,
{ NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
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
    <main>
      <header/>
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
                          <i  />
                        </NavIcon>
                        <NavText>
                            Login
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="home">
                        <NavIcon>
                          <i/>
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="favorites">
                        <NavIcon>
                            <img src="./assets/keyicon.png" alt=""/>
                        </NavIcon>
                        <NavText>
                            Favorites
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="search">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '2em' }} />
                        </NavIcon>
                        <NavText>
                            Search
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="detail">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '2em' }} />
                        </NavIcon>
                        <NavText>
                            Details
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <div className='content'>
              <div className='sidebar'></div>
                <Switch>
                <Route path="/" exact render={(routerProps) => <Login handleToken={this.handleToken} token={this.state.token} clearToken={this.clearToken} {...routerProps} />} />
                <Route path='/home' render={(routerProps) => <Home token={this.state.token} {...routerProps}/>} />
                <Route path="/favorites" render={(routerProps) => <Favorites token={this.state.token} {...routerProps}/>} />
                <Route path='/search' render={(routerProps) => <SearchPage token={this.state.token} {...routerProps} />} />
                <Route path='/detail/:id' exact render={(routerProps) => <DetailPage token={this.state.token} {...routerProps} />} />
              </Switch>
            </div>
        </React.Fragment>
    )}
    />
    </Router>
    </main>
  );
}


}