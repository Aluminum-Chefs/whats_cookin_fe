import React, { Component } from 'react'
import { fetchDetails } from './whats_cookn_api.js';

export default class DetailPage extends Component {

    state= {

        isFavorited: false
    }

    componentDidMount = async () => {
        const recipe = await fetchDetails(this.props.match.params.id);
        this.setState(recipe.body);
        this.setState({
            favorite_id: this.props.location.state.favorite_id,
            isFavorited: this.props.location.state.isFavorited,
            notes:this.props.location.state.notes,
        })
        console.log(this.state);
    }

    checkboxHandler = (e) => {

        const checked = e.target.checked;
        this.setState({ isFavorited: checked })

      



       }
       addNote = (e) => {

            const note = e.target.value;

            this.setState({ notes: note });
            console.log(this.state);

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
                <form onSubmit ={this.saveDetail}>
                    <label>SAVE RECIPE
                    <input onChange={this.checkboxHandler} type="checkbox" checked={this.state.isFavorited} />
                    </label>
                    <textarea onChange={this.addNote} value={this.state.notes}>THIS IS A PLACE FOR NOTES</textarea>
                    <button>SAVE</button>
                </form>

            </div>
        )
    }
}
