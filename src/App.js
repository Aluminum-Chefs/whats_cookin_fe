import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';
import Login from './Login.js';
import Favorites from './Favorites.js';
import SearchPage from './SearchPage.js';
import DetailPage from './DetailPage.js';
import CalendarPage from './CalendarPage.js';
import About from './About.js';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  
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
    
    // the complexity of your render method is impressive, but the formatting makes it tough to read. A nice, thorough linting would have done wonders here
  return (
    <main>
      <header>What's Cook'n</header>
      <Router>
             <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav className='side-bar'
                onSelect={(selected) => {
                    const to = '/' + selected;
                    // sooooooo cooooooool what!!
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="/">
                    <NavItem eventKey="">
                        <NavIcon>
                          <span className='nav'role='img' aria-label='home'>💻</span>
                        </NavIcon>
                        <NavText>
                            Login
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="calendar">
                        <NavIcon>
                        <span className='nav'role='img' aria-label='calendar'>⊞</span>
                        </NavIcon>
                        <NavText>
                           Calendar
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="favorites">
                        <NavIcon>
                        <span className='nav'role='img' aria-label='favorites'>✪</span> 
                        </NavIcon>
                        <NavText>
                            Favorites
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="search">
                        <NavIcon>
                        <span className='nav'role='img' aria-label='search'>⌨</span> 
                        </NavIcon>
                        <NavText>
                            Search
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="about">
                        <NavIcon>
                        <span className='nav'role='img' aria-label='about'>α</span> 
                        </NavIcon>
                        <NavText>
                            About
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
                <Route path='/calendar' render={(routerProps) => <CalendarPage token={this.state.token} {...routerProps} />} />
                <Route path='/about' render={(routerProps) => <About token={this.state.token} {...routerProps} />} />
                                           
               </Switch>
            </div>
        </React.Fragment>
    )}
    />
    <footer>
        <Link to='/'>
          <button onClick={this.clearToken} className='logout-button'>Log Out</button>
        </Link>
      </footer>
    </Router>
    </main>
  );
}


}