import React, { Component } from 'react'
import { signIn, signUp } from './whats_cookn_api.js';
import './Login.css';
export default class Login extends Component {

    state = {
        signInEmail: '',
        signInPassword: '',
        signUpEmail: '',
        signUpPassword: '',
        schedule_id: null
    }

    handleSignUp = async (e) => {
        e.preventDefault();

        const user = await signUp({
            email: this.state.signUpEmail,
            password: this.state.signUpPassword
        });

        this.props.handleToken(user.body.token);
        this.props.history.push('/home');
    }

    handleSignIn = async (e) => {
        e.preventDefault();

        const user = await signIn({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        });

        this.props.handleToken(user.body.token);
        this.props.history.push('/home');
    }

    
    render() {
        return (
            <div className='form-login'>
                <form onSubmit={this.handleSignIn} className='login-forms'>
                    Sign-in
                    <label>
                        Email
                        <input onChange={e => this.setState({ signInEmail: e.target.value})} value={this.state.signInEmail}/>
                    </label>
                    <label>
                        Password
                        <input type='password' onChange={e => this.setState({ signInPassword: e.target.value})} value={this.state.signInPassword}/>
                    </label>
                    <button>Submit</button>
                    
                </form>
                <form onSubmit={this.handleSignUp} className='login-forms'>
                    Sign-up
                    <label>
                        Email
                        <input onChange={e => this.setState({ signUpEmail: e.target.value})} value={this.state.signUpEmail}/>
                    </label>
                    <label>
                        Password
                        <input type='password' onChange={e => this.setState({ signUpPassword: e.target.value})} value={this.state.signUpPassword}/>
                    </label>
                    <label>
                        Schedule ID
                        <input onChange={e => this.setState({ schedule_id: e.target.value})} value={this.state.schedule_id}/>
                    </label>
                    <button>Submit</button>
                    
                </form>
                
            </div>
        )
    }
}
