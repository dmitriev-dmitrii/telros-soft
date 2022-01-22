import { createStore } from 'vuex';

import admin from '@/store/admin';
import users from '@/store/users';
import user from '@/store/user';

export default createStore({

  modules: {
    admin,
    users,
    user,
  }

})
