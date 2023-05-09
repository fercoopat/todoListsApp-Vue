<template>
  <div class="card-body">
    <h3 class="card-title text-bold">
      {{ todosList.title }}
    </h3>
    <div class="text-center mt-4">
      <button
        class="mx-1 btn btn-outline-primary"
        @click="handleUpdate(todosList.id)"
      >
        Edit
      </button>
      <button
        class="mx-1 btn btn-outline-danger"
        @click="handleDelete(todosList.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTodoListsService } from '@/composables';
  import { ITodosList } from '@/interfaces';
  import { defineProps, defineEmits } from 'vue';
  import { useRouter } from 'vue-router';

  defineProps<{
    todosList: ITodosList;
  }>();

  const emit = defineEmits(['updateData']);

  const router = useRouter();

  const { loadData, deleteData } = useTodoListsService();

  const handleDelete = async (id: number) => {
    await deleteData(id);

    emit('updateData', loadData());
  };

  const handleUpdate = (id: number) =>
    router.push({ name: 'todo-list', params: { id } });
</script>
