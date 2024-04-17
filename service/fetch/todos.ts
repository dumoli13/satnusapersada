import {
  FetchCreateTodoRequest,
  FetchPatchTodoRequest,
  FetchTodoDetailResponse,
  FetchTodoListRequest,
  FetchTodoListResponse,
  FetchUpdateTodoRequest,
} from "@/interface/todos";
import fetch from "./index";

export async function fetchTodos(payload: FetchTodoListRequest) {
  return fetch<FetchTodoListRequest, FetchTodoListResponse>({
    url: "/todos",
    method: "GET",
    payload,
    cache: "no-store",
  });
}

export async function fetchTodosDetail(id: string) {
  return fetch<undefined, FetchTodoDetailResponse>({
    url: `/todos/${id}`,
    method: "GET",
    cache: "no-store",
  });
}

export async function fetchCreateTodos(payload: FetchCreateTodoRequest) {
  return fetch<FetchCreateTodoRequest, undefined>({
    url: "/todos",
    method: "POST",
    payload,
    cache: "no-store",
  });
}

export async function fetchUpdateTodos(
  id: string,
  payload: FetchUpdateTodoRequest
) {
  return fetch<FetchUpdateTodoRequest, undefined>({
    url: `/todos/${id}`,
    method: "PUT",
    payload,
    cache: "no-store",
  });
}

export async function fetchPatchTodos(
  id: string,
  payload: FetchPatchTodoRequest
) {
  return fetch<FetchPatchTodoRequest, undefined>({
    url: `/todos/${id}`,
    method: "PATCH",
    payload,
    cache: "no-store",
  });
}

export async function fetchDeleteTodos(id: string) {
  return fetch<undefined, undefined>({
    url: `/todos/${id}`,
    method: "DELETE",
    cache: "no-store",
  });
}
