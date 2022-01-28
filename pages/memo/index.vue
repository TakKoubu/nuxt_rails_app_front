<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
      <AppButton style="margin-left: 10px" @click="onLogout">Logout</AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
    </section>
  </div>
</template>

<script>
export default {
  layout: "default",
  // middleware: ["check-auth", "auth"],
  computed: {
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/user");
    }
  }
};
</script>
