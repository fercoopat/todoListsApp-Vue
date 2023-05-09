import { ITodo } from '@/interfaces';
import { ApiService } from '@/services';
import { onMounted, ref } from 'vue';

export const useTodosService = () => {
  const service = new ApiService('/todos');

  const data = ref<ITodo[]>([]);
  const error = ref('');
  const isLoading = ref(false);

  const loadData = async () => {
    try {
      isLoading.value = true;
      error.value = '';
      data.value = await service.get();
    } catch (err) {
      error.value = `An error has ocurred ${err}`;
    } finally {
      isLoading.value = false;
    }
  };

  const getDataById = async (id: number) => {
    try {
      isLoading.value = true;
      error.value = '';
      return await service.getById(id);
    } catch (err) {
      error.value = `An error has ocurred ${err}`;
    } finally {
      isLoading.value = false;
    }
  };

  const addData = async (data: ITodo) => {
    try {
      isLoading.value = true;
      error.value = '';
      return await service.insert(data);
    } catch (err) {
      error.value = `An error has ocurred ${err}`;
    } finally {
      isLoading.value = false;
    }
  };

  const editData = async (id: number, data: ITodo) => {
    try {
      isLoading.value = true;
      error.value = '';
      return await service.update(id, data);
    } catch (err) {
      error.value = `An error has ocurred ${err}`;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteData = async (id: number) => {
    await service.delete(id);
  };

  onMounted(async () => loadData());

  return {
    /* DATA */
    data,
    error,
    isLoading,
    /* METHODS */
    addData,
    deleteData,
    editData,
    getDataById,
    loadData,
  };
};
