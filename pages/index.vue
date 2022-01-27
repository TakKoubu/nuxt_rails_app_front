<template>
  <div>
    <h1>User</h1>
    <p>users:</p>
    <p>{{ users }}</p>
    <button type="submit" @click="fetchUsers()">fetch Users</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'IndexPage',
  data: () => ({
    users: []
  }),
  methods: {
    fetchUsers() {
      console.log('fetchUsersメソッドが呼び出されました！');
      axios
        .get('http://localhost:3000/users')
        .then(response => {
          console.log('.thenが呼び出されました！');
          console.log(response.data);
          this.users = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>
