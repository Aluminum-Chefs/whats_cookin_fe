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
            <div className="detail">

                <h1>{this.state.title}</h1>
                <h3>serves {this.state.servings}</h3>
                <h3>ready in {this.state.readyInMinutes} minutes</h3>
                 <img src={this.state.image} alt={this.state.title}/>
                 <div dangerouslySetInnerHTML= {{__html:this.state.summary}} />
        <ul>
            {
            this.state.ingredients && this.state.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)
        }
        </ul>
        <ol>
            {
              this.state.instructions && this.state.instructions.map(step => <li key={step}>{step}</li>)
            }
        </ol>
                
                <label>SAVE RECIPE
                <input type="checkbox" />
                </label>
                <textarea value={this.props.notes}>THIS IS A PLACE FOR NOTES</textarea>
                <button>SAVE</button>
            </div>
        )
    }
}
