import {
  FetchCreateUserRequest,
  FetchPatchUserRequest,
  FetchUpdateUserRequest,
  FetchUserDetailResponse,
  FetchUserListRequest,
  FetchUserListResponse,
} from '@/src/interface/users';
import fetch from './index';

export async function fetchUsers(payload: FetchUserListRequest) {
  return fetch<FetchUserListRequest, FetchUserListResponse>({
    url: '/users',
    method: 'GET',
    payload,
    cache: 'no-store',
  });
}

export async function fetchUserDetail(id: string) {
  return fetch<undefined, FetchUserDetailResponse>({
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
  id: string,
  payload: FetchUpdateUserRequest,
) {
  return fetch<FetchUpdateUserRequest, undefined>({
    url: `/users/${id}`,
    method: 'PUT',
    payload,
    cache: 'no-store',
  });
}

export async function fetchPatchUser(
  id: string,
  payload: FetchPatchUserRequest,
) {
  return fetch<FetchPatchUserRequest, undefined>({
    url: `/users/${id}`,
    method: 'PATCH',
    payload,
    cache: 'no-store',
  });
}

export async function fetchDeleteUser(id: string) {
  return fetch<undefined, undefined>({
    url: `/users/${id}`,
    method: 'DELETE',
    cache: 'no-store',
  });
}
