<template>
  <app-header :header-title="headerTitle">
    <template #headerActions>
      <button
        class="btn btn-warning mx-2"
        @click="router.push({ name: 'main' })"
      >
        ToDo Lists
      </button>
    </template>
  </app-header>

  <main class="my-5">
    <router-view />
  </main>
</template>

<script setup lang="ts">
  import AppHeader from '@/components/common/AppHeader.vue';
  import { useRouter } from 'vue-router';

  const headerTitle = 'Simple ToDo App';

  const router = useRouter();
</script>
