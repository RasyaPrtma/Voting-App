import axios from "axios";
import { API_URL } from "./API_URL";

export const setToken = (token) =>{
    localStorage.setItem('accesToken', token);
}

export const getToken = () =>{
  return localStorage.getItem('accesToken') ?? null;
}

export const addCandidate = async (nama,thumbnail,noUrut) =>{
    const apiAdd = await axios.post((API_URL + "admin/kandidat/candidate"),{
        name:nama,
        thumbnail:thumbnail,
        no_urut:noUrut
    })
    .then((response) => {
        return response
    })
    .catch((err) => {
        return err.response
    })
    return apiAdd
}

export const getCandidate = async () => {
    const apiGet = await axios.get((API_URL + "admin/kandidat/candidate"))
    .then((response) => {
        return response
    })
    .catch((err) => {
        return err.response
    })
    return apiGet
}

export const updateCandidate = async (nama,thumbnail,noUrut,id) => {
    const apiUpdate = await axios.put((API_URL + "admin/kandidat/candidate/" + id),{
        name:nama,
        thumbnail:thumbnail,
        no_urut:noUrut
    })
    .then((response) => {
        return response
    })
    .catch((err) => {
        return err.response
    })
    return apiUpdate
}

export const deleteCandidate = async (id) => {
    const apiDelete = await axios.delete((API_URL + "admin/kandidat/candidate/" + id))
    .then((response) => {
        return response
    })
    .catch((err) => {
        return err.response
    })
    return apiDelete
}

export const Voting = async (idCandidate) => {
    const token = getToken();
    const apiVote = await axios.post((API_URL + "vote"),{
        candidatesId:idCandidate
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        return response
    })
    .catch((err) => {
        return err.response
    })
    return apiVote
}

export const resultVote = async () => {
    const apiResultVote = await axios.get((API_URL + "vote"))
    .then((response) => {
        return response
    })
    .catch((err) => {
        return err.response
    })
    return apiResultVote ?? null
}

export const Logins = async (email,password) => {
    const apiLogin = await axios.post((API_URL + "login"),{
        email:email,
        password:password
    })
    .then((response) => {
        return response
    })
    .catch((err) => {
        return err.response
    })
    return apiLogin
}

export const Logout = async () => {
    const token = getToken();
    const apiLogout = await axios.post((API_URL + "logout"),{},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) =>{
        return response
    })
    .catch((err) => {
        return err.response
    })
    return apiLogout
} 
