<script setup>
import { ref } from 'vue';
import DOMPurify from 'dompurify';

const comment = ref('');
const comments = ref([]);

const submitComment = () => {
  // Sanitasi input sebelum ditambahkan ke array comments
  const sanitizedComment = DOMPurify.sanitize(comment.value);
  comments.value.push({
    text: sanitizedComment
  });
  comment.value = '';
};
</script>

<template>
  <div>
    <h3>Comments</h3>
    <input v-model="comment" placeholder="Leave a comment" />
    <button @click="submitComment">Submit</button>
    <div v-for="comment in comments" :key="comment.text">
      <p>{{ comment.text }}</p>
    </div>
  </div>
</template>