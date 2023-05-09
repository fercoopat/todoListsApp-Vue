<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-primary">
    <div class="container-fluid">
      <span class="navbar-brand">{{ headerTitle }}</span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <slot name="headerActions" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  defineProps<{
    headerTitle: string;
  }>();
</script>
