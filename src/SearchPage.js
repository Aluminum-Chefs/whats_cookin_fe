import React, { Component } from 'react';

import { cuisines, diets } from './data.js';
import { searchRecipes, postFavorites } from './whats_cookn_api.js';
import {
   Link
    } from 'react-router-dom';

import './SearchPage.css'

export default class searchPage extends Component {
    state = {
        searchByCuisine: '',
        searchByDiet: '',
        searchByIngredients: '',
        isLoading: false,
        
        currentPage: 1,
        totalPages: 1,
    }

    componentDidMount = async () => {
        
        
    }

    makeRequest = async () => {
        this.setState({ isLoading: true });
        const options = {
        cuisine: this.state.searchByCuisine,
        diet: this.state.searchByDiet,
        ingredients: this.state.searchByIngredients
        }
        console.log(options);
        const recipeData = await searchRecipes(options);
        await this.setState({
            results: recipeData.body.results,
            totalPages: Math.ceil(recipeData.body.count / 20),
            isLoading: false,
            
        })
        console.log(this.state.results);

        
    }

        handlePrevClick = async () => {
            await this.setState({ currentPage: Number(this.state.currentPage) -1 })
            await this.makeRequest()
      }
    
        handleNextClick = async () => {
            await this.setState({ currentPage: Number(this.state.currentPage) +1 })
            await this.makeRequest()
      }
      handleFormSubmit = async (e) => {
            e.preventDefault();
            await this.makeRequest()

      } 
      handleItemChange = async (e) => {
          const target = e.target;
          const name = target.name;
          const val = target.value;
          await this.setState({[name]:val});
      }

      handleFavoriteAdd = async (e) => {
        postFavorites({
            source_id: this.stateresults
        })
      }

    
    render() {
        return (
            <div>
                <form className='search-form'onSubmit={this.handleFormSubmit}>
                <select className='fav-select'name='searchByCuisine' value={this.state.searchByCuisine}onChange={this.handleItemChange}>
                        {
                        cuisines.map(cuisine => <option value={cuisine}>{cuisine}</option>)
                        }
                </select>
                <select className='fav-select' name='searchByDiet' value={this.state.searchByDiet}onChange={this.handleItemChange}>
                        {
                        diets.map(diet => <option value={diet}>{diet}</option>)
                        }
                </select>
                <input className= 'search-input'placeHolder='Ingredient'name='searchByIngredients' value={this.state.searchByIngredients} onChange={this.handleItemChange}/>
                <button className='search-button' >Search</button>
                </form>
                <div className='recipe-results'>
                
                    {
                    this.state.results && this.state.results.map((result) => { return <div className='recipe-card'>
                       <Link to={`/detail/${result.id}`}> <img className='result-img'src={result.image} alt={result.title} /> </Link>
                        <h3>{result.title}</h3>
                         </div>
                         })
                    }
                </div>
                    
                

                
            </div>
            )}}
