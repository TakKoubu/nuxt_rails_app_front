<template>
  <div class="admin-page">
    <section class="new-post">
      <!-- <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton> -->
      <AppButton style="margin-left: 10px" @click="onLogout">Logout</AppButton>
      <h1>Existing Posts</h1>
      <MemoList :memos="loadedMemos" />
    </section>
  </div>
</template>

<script>
export default {
  layout: "default",
  middleware: ["auth"],
  computed: {
    user() {
      console.log(this.$auth)
      return this.$auth.user;
    },
    loadedMemos() {
      return this.$store.getters.loadedMemos
    }
  },
  methods: {
    onLogout() {
      this.$auth.logout();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
