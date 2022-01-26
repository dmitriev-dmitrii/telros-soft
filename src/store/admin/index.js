import axios from 'axios';
axios.defaults.withCredentials = true;

import  url  from  '@/url'

export default {
  state: {
    name:'' ,
    pasword:'',
    isLogin:true,
    serverMessage:''
  },

  mutations: {
    UPDATE_LOGIN: (state,bollean) => {
      state.isLogin=bollean;
      },
    UPDATE_NAME: (state,string) => {
        state.name=string;
      },
    UPDATE_MESSAGE: (state,string) => {
        state.serverMessage=string;
    },
  },

  actions: {
    LOGIN: async (context,data) => {

      context.commit('UPDATE_MESSAGE', '' )
      const request = await  axios.post( url + '/admin-login', data )
      console.log(request);
      if (request.status == 401) { context.commit('UPDATE_LOGIN', false ) }
      if (request.status == 200) { 
        context.commit('UPDATE_LOGIN', request.data.logined )
        context.commit('UPDATE_NAME', request.data.name )
        context.commit('UPDATE_MESSAGE', request.data.message )
      }

    },

    LOGOUT: async (context) => {

      const request = await axios.post( url + '/admin-logout' );

      if (request.status == 200) {

        // console.log(request); 
        document.cookie=''
        context.commit('UPDATE_LOGIN', false )
        context.commit('UPDATE_NAME', '' )
      }

    },

    LOGIN_TEST: async (context) => {

        const request = await axios.get( url + '/admin-login-test/' );
        if (request.status == 200) {
          context.commit('UPDATE_LOGIN', request.data.logined )
          if (request.data.logined) 
            { context.commit('UPDATE_NAME',  request.data.name )}
        }

    },

  },

}
