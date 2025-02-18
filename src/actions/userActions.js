import axios from 'axios';
import {
  USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_PASSWORD_RESET, USER_PASSWORD_RESET_FAIL
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      'Content-Type': 'application/json',
    };

    const { data } = await axios.post('https://verdant-store.herokuapp.com/user/login', { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
// forget password 
export const forgotPassword = (email) => async (dispatch) => {
  try{
    dispatch({
      type: USER_PASSWORD_RESET
    })

     const config = {
      'Content-Type': 'application/json',
    };

    const { data } = await axios.post('https://verdant-store.herokuapp.com/user/forgetpassword', { email}, config);

    dispatch({
      type: USER_PASSWORD_RESET,
      payload: data,
    });

    localStorage.setItem('forgotPassword', JSON.stringify(data));
    
  }  catch (error) {
    dispatch({
      type: USER_PASSWORD_RESET_FAIL,
    });
}}



export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const register = (firstname, lastname, email, phone, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      'Content-Type': 'application/json',
    };

    const { data } = await axios.post('https://verdant-store.herokuapp.com/user/register', {
      firstname, lastname, email, phone, password,
    }, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    };

    const { data } = await axios.get('https://verdant-store.herokuapp.com/user/me', config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Update User
export const updateUserP = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    };

    const data = await axios.put('https://verdant-store.herokuapp.com/user/updateme', user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
