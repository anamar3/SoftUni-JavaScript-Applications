const host = 'http://localhost:3030';

import { clearUserData, getUserData, setUserData } from '../api/utils.js';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };
    const userdata = getUserData();
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        
        options.body = JSON.stringify(data);
    }

if(userdata){
    options.headers['X-Authorization'] = userdata.token;
}
    try {
   
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            if (response.status == 403){
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}
export async function login(email, password) {
    const result = await post('/users/login', { email, password });

    const userData = {
        email: result.email,
        username: result.username,
        id: result._id,
        token: result.accessToken
    };
    setUserData(userData);
    return result;
}

export async function register(email, password) {
    const result = await post('/users/register', { email, password });

    const userData = {
        email: result.email,
    
        id: result._id,
        token: result.accessToken
    };
    setUserData(userData);
    return result;
}

export async function logout() {
    get('/users/logout');
    clearUserData();
}
export async function get(url) {
    return  request('get', url);
}

export function post(url, data) {
    return request('post', url, data);
}

export function put(url, data) {
    return request('put', url, data);
}

export function del(url) {
    return request('delete', url);
}