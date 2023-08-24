// in order to utilize axios everywhere
import axios from 'axios'

// create axios instance. This is not creating an api call its just creating an instance and saving that instance to the api The purpose is so that if you open a dicitonary, youll be able to see the baseurl is througout the entire duration
// so you dont have to change your url on every single page youre doing an api call
export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});


