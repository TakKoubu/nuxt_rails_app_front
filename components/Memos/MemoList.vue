<template>
  <section class="post-list">
    <MemoPreview
      v-for="memo in memos"
      :key="memo.id"
      :id="memo.id"
      :content="memo.content" />
  </section>
</template>

<script>
import MemoPreview from '@/components/Memos/MemoPreview'

export default {
  components: {
    MemoPreview
  },
  props: {
    memos: {
      type: Array,
      required: true
    }
  }
}
</script>


<style scoped>

.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

