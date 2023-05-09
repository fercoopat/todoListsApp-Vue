<template>
  <div
    class="list-group-item list-group-item-action my-1 active"
    :class="todo.completed ? 'bg-success' : 'bg-danger'"
  >
    <h5 class="mb-1">{{ todo.title }}</h5>

    <button
      class="btn mx-1"
      @click="handleToggle(todo)"
      :class="todo.completed ? 'btn-secondary' : 'btn-dark'"
    >
      {{ todo.completed ? 'Done' : 'Undone' }}
    </button>
    <button
      class="btn mx-1"
      @click="handleDelete(todo.id)"
      :class="todo.completed ? 'btn-secondary' : 'btn-dark'"
    >
      Delete
    </button>
    <!-- <div class="btn-group">
    </div> -->
  </div>
</template>

<script setup lang="ts">
  import { useTodosService } from '@/composables/useTodoService';
  import { ITodo } from '@/interfaces';
  import { defineEmits, defineProps } from 'vue';

  defineProps<{
    todo: ITodo;
  }>();

  const emit = defineEmits(['updateData']);

  const { editData, loadData, deleteData } = useTodosService();

  const handleToggle = async (todo: ITodo) => {
    const newTodo: ITodo = {
      ...todo,
      completed: !todo.completed,
    };

    await editData(todo.id, newTodo);

    emit('updateData', await loadData());
  };

  const handleDelete = async (id: number) => {
    await deleteData(id);

    emit('updateData', await loadData());
  };
</script>
