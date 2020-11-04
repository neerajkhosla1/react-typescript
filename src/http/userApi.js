import axios from 'axios';

export const userInstance = axios.create({
    baseURL: 'http://173.255.252.28:3000/api/user/',
  });

export const doPostRegister = body =>
  userInstance.post('register', body);
  
export const doPostLogin = body =>
  userInstance.post('login', body);

export const doPostResetPassword = body =>
  userInstance.post('reset-password', body);
  
export const doPostForgotPassword = body =>
  userInstance.post('forgot-password', body);