import  axios from 'axios';
    
const http = axios.create({
  baseURL: 'https://three-points.herokuapp.com/',
  withCredentials: true
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error?.response.status === 401){
      localStorage.clear();
      window.location.replace('/login');
    }
  }
);

export const getPost = () => http.get('api/posts');

export const getUser = (users) => http.get('api/users/' + users);

export const login = (body) => http.post('api/login', body);

export const logout = (body) => http.post('api/logout', body);

export const likePost = (postid) => http.post(`api/posts/${postid}/like`);
