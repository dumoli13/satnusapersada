import {
  FetchCreatePostRequest,
  FetchPostListRequest,
  FetchPostListResponse,
  PostDetail,
  CommentDetail,
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
  return fetch<undefined, PostDetail>({
    url: `/posts/${id}`,
    method: 'GET',
    cache: 'no-store',
  });
}

export async function fetchPostComments(id: string) {
  return fetch<undefined, CommentDetail[]>({
    url: `/posts/${id}/comments`,
    method: 'GET',
    cache: 'no-store',
  });
}

export async function fetchCreatePost(payload: FetchCreatePostRequest) {
  return fetch<FetchCreatePostRequest, null>({
    url: '/posts',
    method: 'POST',
    payload,
    cache: 'no-store',
  });
}

export async function fetchUpdatePost(
  id: number,
  payload: FetchCreatePostRequest,
) {
  return fetch<FetchCreatePostRequest, null>({
    url: `/posts/${id}`,
    method: 'PUT',
    payload,
    cache: 'no-store',
  });
}

export async function fetchDeletePost(id: number) {
  return fetch<undefined, null>({
    url: `/posts/${id}`,
    method: 'DELETE',
    cache: 'no-store',
  });
}
