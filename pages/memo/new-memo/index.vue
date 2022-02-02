<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <PostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import PostForm from "@/components/Memos/PostForm";

export default {
  layout: "default",
  middleware: ["auth"],
  components: {
    PostForm,
  },
  methods: {
    onSubmitted(memoData) {
      this.$store.dispatch("addMemo", memoData).then(() => {
        this.$router.push("/memo");
      });
    },
  },
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
