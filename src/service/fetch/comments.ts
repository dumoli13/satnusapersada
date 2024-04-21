import {
  FetchCommentDetail,
  FetchCommentListRequest,
  FetchCommentListResponse,
  FetchCreateCommentRequest,
} from '@/src/interface/comments';
import fetch from './index';

export async function fetchCommentList(payload?: FetchCommentListRequest) {
  return fetch<FetchCommentListRequest, FetchCommentListResponse>({
    url: `/comments`,
    method: 'GET',
    payload,
    cache: 'no-store',
  });
}

export async function fetchCommentDetail(id: string) {
  return fetch<undefined, FetchCommentDetail>({
    url: `/comments/${id}`,
    method: 'GET',
    cache: 'no-store',
  });
}

export async function fetchCreateTodos(payload: FetchCreateCommentRequest) {
  return fetch<FetchCreateCommentRequest, undefined>({
    url: '/comments',
    method: 'POST',
    payload,
    cache: 'no-store',
  });
}

export async function fetchDeleteComment(id: string) {
  return fetch<undefined, undefined>({
    url: `/comments/${id}`,
    method: 'DELETE',
    cache: 'no-store',
  });
}
