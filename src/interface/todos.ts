export type TodoDetail = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type FetchTodoListRequest = {
  userId?: string;
  id?: string;
  title?: string;
  completed?: boolean;
};

export type FetchTodoListResponse = Array<TodoDetail>;

export type FetchCreateTodoRequest = {
  userId: number;
  title: string;
  completed: boolean;
};

export type FetchPatchTodoRequest = {
  userId?: string;
  title?: string;
  completed?: boolean;
};
