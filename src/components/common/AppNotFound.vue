<template>
  <div class="container">
    <p class="display-1">Not Found Page</p>
    <button class="btn btn-lg btn-outline-danger" @click="router.go(-1)">
      Go back
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>
