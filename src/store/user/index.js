import axios from 'axios';
axios.defaults.withCredentials = true;

import  url  from  '@/url'

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
  },

}
