import {
  FetchCreatePostRequest,
  FetchCreatePostResponse,
  FetchPatchPostRequest,
  FetchPostCommentsResponse,
  FetchPostDetailResponse,
  FetchPostListRequest,
  FetchPostListResponse,
  FetchUpdatePostRequest,
  FetchUpdatePostResponse,
} from '@/src/interface/posts';
import fetch from './index';

export async function fetchPosts(payload?: FetchPostListRequest) {
  return fetch<FetchPostListRequest, FetchPostListResponse>({
    url: '/posts',
    method: 'GET',
    payload,
    cache: 'no-store',
  });
}

export async function fetchPostDetail(id: string) {
  return fetch<undefined, FetchPostDetailResponse>({
    url: `/posts/${id}`,
    method: 'GET',
    cache: 'no-store',
  });
}

export async function fetchPostComments(id: string) {
  return fetch<undefined, FetchPostCommentsResponse>({
    url: `/posts/${id}/comments`,
    method: 'GET',
    cache: 'no-store',
  });
}

export async function fetchCreatePost(payload: FetchCreatePostRequest) {
  return fetch<FetchCreatePostRequest, FetchCreatePostResponse>({
    url: '/posts',
    method: 'POST',
    payload,
    cache: 'no-store',
  });
}

export async function fetchUpdatePost(
  id: string,
  payload: FetchUpdatePostRequest,
) {
  return fetch<FetchUpdatePostRequest, FetchUpdatePostResponse>({
    url: `/posts/${id}`,
    method: 'PUT',
    payload,
    cache: 'no-store',
  });
}

export async function fetchPatchPost(
  id: string,
  payload: FetchPatchPostRequest,
) {
  return fetch<FetchPatchPostRequest, FetchUpdatePostResponse>({
    url: `/posts/${id}`,
    method: 'PATCH',
    payload,
    cache: 'no-store',
  });
}

export async function fetchDeletePost(id: string) {
  return fetch<undefined, undefined>({
    url: `/posts/${id}`,
    method: 'DELETE',
    cache: 'no-store',
  });
}
