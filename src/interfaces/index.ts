export interface ITodosList {
  id: number;
  title: string;
}

export interface ITodo {
  todosListId: number;
  id: number;
  title: string;
  completed: boolean;
}
