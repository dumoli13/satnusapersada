export type FetchTodoListRequest = {
  userId?: string;
  id?: string;
  title?: string;
  completed?: boolean;
};

export type FetchTodoListResponse = Array<{
  userId: string;
  id: string;
  title: string;
  completed: boolean;
}>;

export type FetchTodoDetailResponse = {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
};

export type FetchCreateTodoRequest = {
  userId: string;
  title: string;
};

export type FetchUpdateTodoRequest = {
  userId: string;
  title: string;
};

export type FetchPatchTodoRequest = {
  userId?: string;
  title?: string;
  completed?: boolean;
};
