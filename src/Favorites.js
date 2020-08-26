import React, { Component } from 'react'
import { fetchFavorites } from './whats_cookn_api';
import { Link } from 'react-router-dom';


export default class Favorites extends Component {
    state = {
        favorites: null
    }

    componentDidMount = async () => {
       
        if (!this.props.token) {
            this.props.history.push('/');
        } else {
        const data = await fetchFavorites(this.props.token)
        
        this.setState({
            favorites: data.body
        })

    }}

    render() {
        console.log(this.state.favorites)
        return (
            
            <div className="fave">
                <h2>Favorite Recipes</h2>
                <div className="fav">
                {
                    
                        this.state.favorites && this.state.favorites.map((favorite) => {
                        return <div className='favorite-box'>
                           <Link to={`/detail/${favorite.source_id}`}
                        key={`${favorite.id}-${favorite.source_id}`}><br/>{`${favorite.owner_id}`}<img src={favorite.image_url} alt={favorite.title}/><br/></Link>
                           {`${favorite.title}`} <br/> {`${favorite.notes}`}
                        </div>
                    })
                }
</div>
                
            </div>
        )
    }
}
