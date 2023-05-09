<template>
  <div class="container" v-cloak>
    <!-- VIEW TITLE -->
    <h1 class="display-4 mb-3 text-center">ToDo Lists</h1>
    <!-- MODAL COMPONENT TO ADD -->
    <AppModal
      :ariaLabel="'addTodosList'"
      :idModal="'addTodosList'"
      :modalHeader="'Add Todo List'"
    >
      <template #triggerButton>
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#addTodosList"
        >
          Add
        </button>
      </template>

      <template #modalBody>
        <div class="mb-3">
          <label for="todoListTitle" class="col-form-label">Title:</label>
          <input
            type="text"
            class="form-control"
            id="todoListTitle"
            placeholder="Type Todo List title..."
            v-model="todosListInput.title"
          />
        </div>
      </template>

      <template #modalActions>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-dismiss="modal"
          @click="handleAddTodosList"
        >
          Save TodoList
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
    <!-- DATA -->
    <div class="row">
      <h1 class="my-2" v-if="error">An error has ocurred! {{ error }} :(</h1>
      <h1 class="my-2" v-else-if="isLoading">Loading... Please wait! :)</h1>
      <h1 class="my-2" v-else-if="!filteredList.length">
        There's no coincidences :(
      </h1>

      <!-- TODOS LISTS COMPONENT -->
      <div
        class="card col-4 mx-2 my-2"
        style="width: 18rem"
        v-for="todosList in filteredList"
        :key="todosList.id"
      >
        <TodosList :todosList="todosList" @updateData="handleUpdateData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import AppModal from '@/components/common/AppModal.vue';
  import TodosList from '@/components/todo-list/TodosList.vue';
  import { useDebounce, useTodoListsService } from '@/composables';
  import { ITodosList } from '@/interfaces';
  import { computed, reactive } from 'vue';

  const { data, isLoading, error, addData, loadData } = useTodoListsService();

  const { searchValue } = useDebounce();

  const filteredList = computed<ITodosList[]>(() => {
    return data.value.filter((todoList: ITodosList) =>
      todoList.title
        .toLowerCase()
        .includes(searchValue.value.toLowerCase().trim())
    );
  });

  const todosListInput = reactive<ITodosList>({
    id: Math.floor(Math.random() * 1000),
    title: '',
  });

  const handleAddTodosList = async () => {
    if (!todosListInput.title) return alert('Need to input some title!');
    const newTodosList: ITodosList = {
      id: todosListInput.id,
      title: todosListInput.title,
    };

    await addData(newTodosList);
    await loadData();

    todosListInput.title = '';
  };

  const handleUpdateData = async () => {
    await loadData();
  };
</script>

<style>
  [v-cloak] {
    display: none;
  }
</style>
