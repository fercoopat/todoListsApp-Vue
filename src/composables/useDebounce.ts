import { computed, ref } from "vue";

export const useDebounce = () => {
  const debounceTimeout = ref();
  const debounceValue = ref("");

  const searchValue = computed({
    get() {
      return debounceValue.value;
    },
    set(val: string) {
      if (debounceTimeout.value) clearTimeout(debounceTimeout.value);

      debounceTimeout.value = setTimeout(() => {
        debounceValue.value = val;
      }, 500);
    },
  });

  return { searchValue };
};
