import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div className='home-box' >
                <h1 className='banner' >Welcome to your new meal planning app!</h1>
                
                
                <Link  to='./'><button className='home-button'>Login</button></Link>
                
            </div>
        )
    }
}
