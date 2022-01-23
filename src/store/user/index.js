import axios from 'axios';
axios.defaults.withCredentials = true;

import  url  from  '@/url';

export default {
  state: {
    item:{
      name:'',
      sureNamme:'',
      patronymic: '',
      bornDate:'',
      email:'',
      phone:'',
      img:'',
    },
    
  },
  
  mutations: {
    UPDATE_USER: (state,obj) => {
      state.item = {...state.item, ...obj };
    },
  },
  actions: {
    GET_USER: async (context,id) => {
      const request = await axios.get( url + '/users/'+ id );
      if (request.status == 200) {
        // console.log(request);
        context.commit('UPDATE_USER', request.data )
      }
    },
    CREATE_USER: async (context,data) => {
      
      const request = await  axios.post( url + '/create-user', data )

      // console.log(request);

      // if (request.status == 401) { context.commit('UPDATE_LOGIN', false ) }
      if (request.status == 200) { 
        console.log(request);
        // context.commit('UPDATE_USER', request.data )
      }
    },

    EDIT_USER: async (context,data) => {
      
      const request = await  axios.put( url + '/update-user', data )

      if (request.status == 200) { 
        // console.log(request);
        context.commit('UPDATE_USER', request.data )
      }

    },

    DELETE_USER: async (context,id) => {
      
      const request = await  axios.post( url + '/delete-user', id )

      if (request.status == 200) { 
        console.log(request);
      }

    },
  },

}
