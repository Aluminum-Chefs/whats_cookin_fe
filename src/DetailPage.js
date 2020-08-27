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
    
        } catch (error) {
            console.log(error.message)
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
            const modifiedFavorite = {
                id: this.state.favorite_id,
                source_id: this.state.id,
                title: this.state.title,
                image_url: this.state.image,
                notes: this.state.notes
            }
                await putFavorites(modifiedFavorite)
                
            
           } else {
            const newFavorite = {
                source_id: this.state.id,
                title: this.state.title,
                image_url: this.state.image,
                notes: this.state.notes
            }
                await postFavorites(newFavorite)
        
           }
           this.props.history.push('/favorites')
       }



    
    render() {
        return (
            <div className='detail-content'>
                <div className='detail'>
                <h2>{this.state.title}</h2>
                <img className='detail-img' src={this.state.image} alt={this.state.title}/>
                <h3>Servings: {this.state.servings}</h3>
                <h3>Ready in {this.state.readyInMinutes} minutes</h3>
                </div>
                 <div className='summary' dangerouslySetInnerHTML= {{__html:this.state.summary}} />
        <ul className='ingredients-list'>
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
                    <textarea onChange={this.addNote} value={this.state.notes}/>
                    <button>SAVE</button>
                </form>

            </div>
        )
    }
}
