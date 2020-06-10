
import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

//? AUTHENTICATION

export const registerUser = formData => {
  return axios.post(`${baseUrl}/users/register/`, formData)
}

export const loginUser = formData => {
  return axios.post(`${baseUrl}/users/login/`, formData)
}

//? USERS

export const getAllUsers = () => {
  return axios.get(`${baseUrl}/users/`, withHeaders())
}

//? CLUBS

export const getAllClubs = () => {
  return axios.get(`${baseUrl}/clubs/`, withHeaders())
}

export const getAllMyClubs = () => {
  return axios.get(`${baseUrl}/clubs/myclubs/`, withHeaders())
}

export const createClub = (club) => {
  return axios.post(`${baseUrl}/myclubs/`, club, withHeaders())
}

export const updateClub = (club, clubID) => {
  return axios.put(`${baseUrl}/clubs/${clubID}/`, club, withHeaders())
}

//? TRIPS

export const getAllClubTrips = (clubID) => {
  return axios.get(`${baseUrl}/myclubs/${clubID}/trips/`, withHeaders())
}

export const getAllMyTrips = () => {
  return axios.get(`${baseUrl}/mytrips/`, withHeaders())
}

export const createTrip = (trip) => {
  return axios.post(`${baseUrl}/mytrips/`, trip, withHeaders())
}

//? CHATS

export const getAllMessages = (clubID) => {
  return axios.get(`${baseUrl}/chats/${clubID}`, withHeaders())
}

export const sendMessage = (message) => {
  return axios.post(`${baseUrl}/messages/`, message, withHeaders())
}

export const createChat = (chat) => {
  return axios.post(`${baseUrl}/chats/`, chat, withHeaders())
}

//? REQUESTS

export const getAllRequests = () => {
  return axios.get(`${baseUrl}/requests/`, withHeaders())
}

export const deleteRequest = (reqID) => {
  return axios.delete(`${baseUrl}/requests/${reqID}/`, withHeaders())
}