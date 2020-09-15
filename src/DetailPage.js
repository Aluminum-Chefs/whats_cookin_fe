import React, { Component } from 'react'
import { fetchDetails, postFavorites, putFavorites } from './whats_cookn_api.js';
import './DetailPage.css';

export default class DetailPage extends Component {
    state= {
        isFavorited: false
    }

    componentDidMount = async () => {
        try {
        const recipe = await fetchDetails(this.props.match.params.id);
        this.setState(recipe.body);
        if(this.props.location.state) {
            this.setState({
                favorite_id: this.props.location.state.favorite_id,
                isFavorited: this.props.location.state.isFavorited,
                notes:this.props.location.state.notes,
            })
        }
    
        } catch (e) {
            console.log(e.message)
        }
    }

    checkboxHandler = (e) => {
        const checked = e.target.checked;
        this.setState({ isFavorited: checked })
       }

    addNote = (e) => {
            const note = e.target.value;
            this.setState({ notes: note });
       }

    saveDetail = async (e) => {
            e.preventDefault();
            
           if(this.state.favorite_id){
                await putFavorites({
                    id: this.state.favorite_id,
                    source_id: this.state.id,
                    title: this.state.title,
                    image_url: this.state.image,
                    notes: this.state.notes
                })            
           } else {
                await postFavorites({
                    source_id: this.state.id,
                    title: this.state.title,
                    image_url: this.state.image,
                    notes: this.state.notes
                })
        
           }

           this.props.history.push('/favorites')
       }



    
    render() {
        return (
            <div className='detail-content'>
                <div className='detail'>
                <h2>{this.state.title}</h2>
                <img className='detail-img' src={this.state.image} alt={this.state.title}/>
                    <div className='label-detail' >
                    <input id='check' className='input-detail' onChange={this.checkboxHandler} type="checkbox" />
                    <label htmlFor='check' className= 'checkmark'><h2>SAVE RECIPE</h2></label>
                    </div>
                <h3>Servings: {this.state.servings}</h3>
                <h3>Ready in {this.state.readyInMinutes} minutes</h3>
                </div>
                {/* nice! */}
                 <div className='ingredients-list' dangerouslySetInnerHTML= {{__html:this.state.summary}} />
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
                    <textarea className='text-area' onChange={this.addNote} value={this.state.notes}/>
                    <button className='notes-button' >SAVE</button>
                </form>

            </div>
        )
    }
}
