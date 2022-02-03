<template>
  <form @submit.prevent="onSave">
    <AppControlInput control-type="textarea" v-model="editedMemo.content"
      >Content
    </AppControlInput>

    <AppButton type="submit">Save</AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
    >
      Cancel
    </AppButton>
  </form>
</template>

<script>
export default {
  props: {
    memo: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      editedMemo: this.memo
        ? { ...this.memo }
        : {
            content: "",
          },
    };
  },
  methods: {
    onSave() {
      // Save the post
      this.$emit("submit", this.editedMemo);
    },
    onCancel() {
      // Navigate back
      this.$router.push("/memo");
    },
  },
};
</script>
