<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="login">
        <AppControlInput type="email" v-model="email">E-Mail</AppControlInput>
        <AppControlInput type="password" v-model="password">Password</AppControlInput>
        <AppControlInput type="password" v-model="password_confirmation">(確認用)Password</AppControlInput>
        <AppButton type="submit">Login</AppButton>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  layout: "default",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    login() {
      this.$auth.loginWith('local',{
        data: {
          email: this.email,
          password: this.password
        }
      }).then((response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      })
    },
  }
};
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
