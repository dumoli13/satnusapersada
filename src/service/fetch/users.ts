import {
  FetchCreateUserRequest,
  FetchUserListRequest,
  FetchUserListResponse,
  UserDetail,
} from '@/src/interface/users';
import fetch from './index';

export async function fetchUsers(payload?: FetchUserListRequest) {
  return fetch<FetchUserListRequest, FetchUserListResponse>({
    url: '/users',
    method: 'GET',
    payload,
    cache: 'no-store',
  });
}

export async function fetchUserDetail(id: string) {
  return fetch<undefined, UserDetail>({
    url: `/users/${id}`,
    method: 'GET',
    cache: 'no-store',
  });
}

export async function fetchCreateUser(payload: FetchCreateUserRequest) {
  return fetch<FetchCreateUserRequest, undefined>({
    url: '/users',
    method: 'POST',
    payload,
    cache: 'no-store',
  });
}

export async function fetchUpdateUser(
  id: number,
  payload: FetchCreateUserRequest,
) {
  return fetch<FetchCreateUserRequest, undefined>({
    url: `/users/${id}`,
    method: 'PUT',
    payload,
    cache: 'no-store',
  });
}

export async function fetchDeleteUser(id: number) {
  return fetch<undefined, undefined>({
    url: `/users/${id}`,
    method: 'DELETE',
    cache: 'no-store',
  });
}
