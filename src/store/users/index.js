import axios from 'axios';
axios.defaults.withCredentials = true;

import  url  from  '@/url'

export default {
  state: {
    list:[],
  },
  mutations: {
    UPDATE_LIST: (state,arr) => {
      state.list = arr ;
    },
  },
  actions: {
    GET_USERS: async (context) => {
      const request = await axios.get( url + '/users' );
      if (request.status == 200) {
        // console.log(request);
        context.commit('UPDATE_LIST', request.data )
      }
    },
  },

}
