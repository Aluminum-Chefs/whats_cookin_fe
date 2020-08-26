import React, { Component } from 'react'
import { fetchDetails } from './whats_cookn_api.js';

export default class DetailPage extends Component {

    state= {


    }

    componentDidMount = async () => {
        const recipe = await fetchDetails(this.props.match.params.id);
        this.setState(recipe.body)
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>serves {this.state.servings}</h3>
                <h3>ready in {this.state.readyInMinutes} minutes</h3>
                 <img src={this.state.image} alt={this.state.title}/>
                 <p>{this.state.summary}</p>
        <ul>
            {
            this.state.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)
        }
        </ul>
        <ol>
            {
                this.state.instructions.map(step => <li key={step}>{step}</li>)
            }
        </ol>
                

                
            </div>
        )
    }
}
