import request from 'superagent';
const URL = process.env.REACT_APP_API_URL;


export function signUp(userData) {
    try {
        return request.post(`${URL}/auth/signup`, userData);

    } catch(e) {
        return { error: e.message }
    }
}

export function signIn(userData) {
    try {
        return request.post(`${URL}/auth/signin`, userData);
    } catch(e) {
        return { error: e.message }
    }
}

export function fetchFavorites() {
    const token = localStorage.getItem( 'token' );
    try {
        return request
        .get(`${URL}/api/favorites`)
        .set('Authorization', token);
        
    } catch(e) { 
        return { error: e.message }
    }
}

export function searchRecipes(options) {
    const token = localStorage.getItem( "token" );
    try {
        console.log(options)
        return request
        .get(`${URL}/api/search`, options)
        .set('Authorization', token);
    } catch(e) {
        return { error: e.message }
    }
}
