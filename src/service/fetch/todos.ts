import {
  FetchCreateTodoRequest,
  FetchPatchTodoRequest,
  FetchTodoDetailResponse,
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

export async function fetchTodosDetail(id: number) {
  return fetch<undefined, FetchTodoDetailResponse>({
    url: `/todos/${id}`,
    method: 'GET',
    cache: 'no-store',
  });
}

export async function fetchCreateTodos(payload: FetchCreateTodoRequest) {
  return fetch<FetchCreateTodoRequest, undefined>({
    url: '/todos',
    method: 'POST',
    payload,
    cache: 'no-store',
  });
}

export async function fetchUpdateTodos(
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

export async function fetchPatchTodos(
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

export async function fetchDeleteTodos(id: number) {
  return fetch<undefined, undefined>({
    url: `/todos/${id}`,
    method: 'DELETE',
    cache: 'no-store',
  });
}
