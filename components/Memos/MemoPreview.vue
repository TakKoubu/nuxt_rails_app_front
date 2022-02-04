<template>
  <div>
    <article>
      <div class="post-content">
        <h1>{{ content }}</h1>
        <AppButton
          type="button"
          style="margin-left: 10px"
          btn-style="cancel"
          @click="onDelete(id)"
        >
          Delete
        </AppButton>
        <AppButton type="button" style="margin-left: 10px" @click="addLike(id)">
          {{ like }}いいね
        </AppButton>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedMemo: this.memo
        ? { ...this.memo }
        : {
            content: "",
            like: 0,
          },
    };
  },
  name: "MemoPreview",
  props: {
    id: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
    },
  },
  computed: {},
  methods: {
    onDelete(id) {
      this.$store.dispatch("deleteMemo", id);
    },
    addLike(id) {
      this.$store.dispatch("addLike", id);
    },
  },
};
</script>


<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  display: block;
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}

.btn-area {
  display: inline-block;
}
</style>
