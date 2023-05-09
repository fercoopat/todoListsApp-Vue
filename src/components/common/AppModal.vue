<template>
  <!-- Button trigger modal -->
  <slot name="triggerButton" />

  <!-- Modal -->
  <div
    class="modal fade"
    :id="idModal"
    tabindex="-1"
    :aria-labelledby="ariaLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            {{ modalHeader }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <slot name="modalBody" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <slot name="modalActions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  defineProps<{
    ariaLabel: string;
    idModal: string;
    modalHeader: string;
  }>();
</script>
