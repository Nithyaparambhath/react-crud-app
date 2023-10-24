import { serviceURL } from "./serviceURL"
import { commonAPI } from "./commonAPI"
// add users
export const addUser = async (reqBody)=>{
    //make post http request to http://localhost:4000/users to add users in json server and return respose to add component
    return await commonAPI("POST",`${serviceURL}/users`,reqBody)
}


// get all users from json server
export const getAllUsers = async ()=>{
    //make get http request to http://localhost:4000/users to get all users from json server and return respose to View component
    return await commonAPI("GET",`${serviceURL}/users`,"")
}

// get a user from json server
export const getAUser = async (id)=>{
    //make get http request to http://localhost:4000/users/id to get all users from json server and return respose to View componenti
    return await commonAPI("GET",`${serviceURL}/users/${id}`,"")
}


// delete a user from json server
export const deleteAUser = async (id)=>{
    //make delete http request to http://localhost:4000/users/id to remove a user from json server and return respose to View componenti
    return await commonAPI("DELETE",`${serviceURL}/users/${id}`,{})
}

// update a user from json server
export const updateAUser = async (id,reqBody)=>{
    //make update http request to http://localhost:4000/users/id to update a user from json server and return respose to View componenti
    return await commonAPI("PUT",`${serviceURL}/users/${id}`,reqBody)
}