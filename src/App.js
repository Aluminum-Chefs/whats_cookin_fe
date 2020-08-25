import React from 'react';
import './App.css';
import Home from './Home.js';
import Login from './Login.js';
import Favorites from './Favorites.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import SideNav,
{ Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

function App() {
  return (
    <div className="App">
      <Router>
             <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
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
                <Route path="/" exact component={props => <Login />} />
                <Route path="/home" component={props => <Home />} />
                <Route path="/favorites" component={props => <Favorites />} />
              </Switch>
            </main>
        </React.Fragment>
    )}
    />
                    </Router>
    </div>
  );
}

export default App;
