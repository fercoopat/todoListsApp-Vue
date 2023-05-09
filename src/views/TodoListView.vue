<template>
  <div class="container" v-cloak>
    <!-- VIEW TITLE -->
    <h1 class="display-4 mb-3 text-center">{{ todosList?.title }} ToDo List</h1>

    <!-- MODAL COMPONENT TO ADD -->
    <AppModal
      :ariaLabel="'addTodo'"
      :id-modal="'addTodo'"
      :modalHeader="'Add Todo'"
    >
      <template #triggerButton>
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#addTodo"
        >
          Add
        </button>
      </template>

      <template #modalBody>
        <div class="input-group input-group-lg mb-3">
          <span class="input-group-text" id="basic-addon1">Title</span>
          <input
            type="text"
            class="form-control"
            placeholder="Title..."
            aria-label="Title"
            aria-describedby="basic-addon1"
            v-model="todoInput.title"
          />
        </div>
      </template>

      <template #modalActions>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-dismiss="modal"
          @click="handleAddTodo"
        >
          Save Todo
        </button>
      </template>
    </AppModal>

    <!-- SEARCHBAR -->
    <div class="col-4 mt-3">
      <input
        type="text"
        class="form-control"
        placeholder="Type to search..."
        v-model="searchValue"
      />
    </div>

    <hr />

    <h1 class="my-2" v-if="error">An error has ocurred! {{ error }} :(</h1>
    <h1 class="my-2" v-else-if="isLoading">Loading... Please wait! :)</h1>

    <h1 class="my-2" v-else-if="!filteredList.length">
      There's no coincidences :(
    </h1>

    <div class="list-group" v-for="todo in filteredList" :key="todo.id">
      <SingleTodo :todo="todo" @update-data="handleUpdateData" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import AppModal from '@/components/common/AppModal.vue';
  import SingleTodo from '@/components/todo/SingleTodo.vue';
  import { useDebounce, useTodoListsService } from '@/composables';
  import { useTodosService } from '@/composables/useTodoService';
  import { ITodo, ITodosList } from '@/interfaces';
  import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const todosListId = ref(+route.params.id);

  const { getDataById } = useTodoListsService();

  const todosList = ref<ITodosList>();

  onMounted(
    async () => (todosList.value = await getDataById(todosListId.value))
  );

  const { data, isLoading, error, loadData, addData } = useTodosService();

  watchEffect(() => {
    data.value = data.value.filter(
      (todo) => todo.todosListId === todosListId.value
    );
  });

  const { searchValue } = useDebounce();

  const filteredList = computed(() => {
    return data.value.filter((todo) =>
      todo.title.toLowerCase().includes(searchValue.value.toLowerCase().trim())
    );
  });

  const todoInput = reactive<ITodo>({
    id: Math.floor(Math.random() * 1000),
    title: '',
    completed: false,
    todosListId: todosListId.value,
  });

  const handleAddTodo = async () => {
    if (!todoInput.title) return alert('Need to input some title!');
    const newTodo: ITodo = {
      id: todoInput.id,
      title: todoInput.title,
      completed: todoInput.completed,
      todosListId: todoInput.todosListId,
    };

    await addData(newTodo);
    await loadData();
  };

  const handleUpdateData = async () => await loadData();
</script>

<style>
  [v-cloak] {
    display: none;
  }
</style>
