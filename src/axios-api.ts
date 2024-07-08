import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://my-homework-1337-default-rtdb.europe-west1.firebasedatabase.app/' 
});

export default axiosApi;