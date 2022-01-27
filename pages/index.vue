<template>
  <div>
    <h1>User</h1>
    <p>users:</p>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
    <button type="submit" @click="fetchUsers()">fetch Users</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  data(){
    return {
      users: []
    }
  },
  name: 'IndexPage',
  computed: {
    ...mapGetters,
  },
  methods: {
    fetchUsers() {
      console.log('fetchUsersメソッドが呼び出されました！');
      axios
        .get('http://localhost:3000/api/users')
        .then(response => {
          console.log('.thenが呼び出されました！');
          console.log(response.data);
          this.users = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    ...mapActions
  }
}
</script>
