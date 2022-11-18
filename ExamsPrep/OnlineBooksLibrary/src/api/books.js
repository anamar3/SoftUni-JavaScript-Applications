import * as api from './api.js';

export  const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    dashboard: '/data/books?sortBy=_createdOn%20desc',
    recent:'/data/games?sortBy=_createdOn%20desc&distinct=category',
    byId: '/data/books/',
    myBooks: (userId)=> `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/books',
    update: '/data/books/',
    deleteById: '/data/books/',
    likeABook: '/data/likes',
    getAllLikes: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
likeFromSpecificUser: (bookId,userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}
export async function getLikeFromUser(bookId,userId){
    return api.get(endpoints.likeFromSpecificUser(bookId,userId));
}
export async function getAllLikes(bookId){
    return api.get(endpoints.getAllLikes(bookId));
}
export async function likeABook(bookId){
    return api.post(endpoints.likeABook,{
        bookId
    });
}

export async function getMyBooks(userId){
    return api.get(endpoints.myBooks(userId));
}
export async function getAll(){
    return api.get(endpoints.dashboard);
}
export async function createBook(data){
    return api.post(endpoints.create,data);
}
export async function getById(id){
    return api.get(endpoints.byId + id);
    }
    export async function deleteBook(id){
        return api.del(endpoints.deleteById + id);
    }
    export async function updateBook(id,data){
        return api.put(endpoints.update+id,data);
    }
    
     




export async function getRecent(){
    return api.get(endpoints.recent)
}


