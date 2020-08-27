import React, { Component } from 'react'
import { fetchDetails } from './whats_cookn_api.js';
import './DetailPage.css';
export default class DetailPage extends Component {

    state= {

        isFavorited: false
    }

    componentDidMount = async () => {
        const recipe = await fetchDetails(this.props.match.params.id);
        this.setState(recipe.body)
        console.log(this.state)
        console.log(this.props);
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
            <div className='detail-content'>
                <div className='detail'>
                <h2>{this.state.title}</h2>
                <img className='detail-img' src={this.state.image} alt={this.state.title}/>
                    <div className='label-detail' >
                    
                    <input id='check' className='input-detail' onChange={this.checkboxHandler} type="checkbox" />
                    <label for='check' className= 'checkmark'><h2>SAVE RECIPE</h2></label>
                    </div>
                <h3>Servings: {this.state.servings}</h3>
                <h3>Ready in {this.state.readyInMinutes} minutes</h3>
                </div>
                 <div className='summary' dangerouslySetInnerHTML= {{__html:this.state.summary}} />
                 <h2>Ingredients</h2>
        <ul className='ingredients-list'>
            {
            this.state.ingredients && this.state.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)
        }
        </ul>
        <h2>Instructions</h2>
        <ol className='ingredients-list'>
            {
              this.state.instructions && this.state.instructions.map(step => <li key={step}>{step}</li>)
            }
                    
        </ol>
                <form className='form-detail' onSubmit ={this.saveDetail}>
                    <textarea onChange={this.addNote} value={this.props.notes}>THIS IS A PLACE FOR NOTES</textarea>
                    <button>SAVE</button>
                </form>

            </div>
        )
    }
}
