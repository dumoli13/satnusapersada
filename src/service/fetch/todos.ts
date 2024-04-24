import {
  FetchCreateTodoRequest,
  FetchPatchTodoRequest,
  FetchTodoListRequest,
  FetchTodoListResponse,
} from '@/src/interface/todos';
import fetch from './index';

export async function fetchTodos(payload?: FetchTodoListRequest) {
  return fetch<FetchTodoListRequest, FetchTodoListResponse>({
    url: '/todos',
    method: 'GET',
    payload,
    cache: 'no-store',
  });
}

export async function fetchCreateTodo(payload: FetchCreateTodoRequest) {
  return fetch<FetchCreateTodoRequest, undefined>({
    url: '/todos',
    method: 'POST',
    payload,
    cache: 'no-store',
  });
}

export async function fetchUpdateTodo(
  id: number,
  payload: FetchCreateTodoRequest,
) {
  return fetch<FetchCreateTodoRequest, undefined>({
    url: `/todos/${id}`,
    method: 'PUT',
    payload,
    cache: 'no-store',
  });
}

export async function fetchPatchTodo(
  id: number,
  payload: FetchPatchTodoRequest,
) {
  return fetch<FetchPatchTodoRequest, undefined>({
    url: `/todos/${id}`,
    method: 'PATCH',
    payload,
    cache: 'no-store',
  });
}

export async function fetchDeleteTodo(id: number) {
  return fetch<undefined, undefined>({
    url: `/todos/${id}`,
    method: 'DELETE',
    cache: 'no-store',
  });
}
