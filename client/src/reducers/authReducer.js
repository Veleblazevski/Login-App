import {
    SET_CURRENT_USER,
    USER_LOADING
  } from "../actions/types";

  const isEmpty = require('is-empty');

  const initialState = {
      isAuthenticated: false,
      user: {},
      loading:false
  };

  export default function(state = initialState,actions) {
      switch(actions.type) {
          case SET_CURRENT_USER: 
          return {
              ...state,
              isAuthenticated: !isEmpty(actions.payload),
              user:actions.payload
          };
          case USER_LOADING: 
          return {
              ...state,
              loading:true
          };
          default: 
          return state;
      }
  }