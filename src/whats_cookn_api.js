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

export function postFavorites(newFavorite) {
    const token = localStorage.getItem( 'token' );
    try {
        return request.post(`${URL}/api/favorites`, newFavorite)
        
        .set('Authorization', token);

    } catch(e) {
        return { error: e.message }
    }
}

export function putFavorites(modifiedFavorite) {
    const token = localStorage.getItem( 'token' );
    try {
        return request
            .put(`${URL}/api/favorites/${modifiedFavorite.id}`, modifiedFavorite)
            .set('Authorization', token);

    } catch(e) {
        return { error: e.message }
    }
}

export function searchRecipes(options) {
    const token = localStorage.getItem( "token" );
    try {
        
        return request
        .get(`${URL}/api/search`, options)
        .set('Authorization', token);
    } catch(e) {
        return { error: e.message }
    }
}

export function fetchDetails(source_id) {
    const token = localStorage.getItem( "token" );
    try {
        return request
            .get(`${URL}/api/favorites/${source_id}`)
            .set('Authorization', token);

    } catch(e) {
        return { error: e.message }
    }
}

export function fetchDays() {
    const token =localStorage.getItem( "token" )
    try {
        return request
            .get(`${URL}/api/days`)
            .set('Authorization', token);

    } catch (e) {
        return { error: e.message }
    }
}
export function postDays(newDay) {
    const token = localStorage.getItem( 'token' );
    try {
        return request.post(`${URL}/api/days`, newDay)
        
        .set('Authorization', token);

    } catch(e) {
        return { error: e.message }
    }
}


export function fetchSchedules() {
    
    try {
        return request
        .get(`${URL}/schedules`)
        
    } catch(e) { 
        return { error: e.message }
    }
}

export function postSchedules(newSchedule) {
        try {
        return request.post(`${URL}/schedules`, newSchedule)

    } catch(e) {
        return { error: e.message }
    }
}
