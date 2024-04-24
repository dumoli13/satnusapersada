import { FetchCreateCommentRequest } from '@/src/interface/comments';
import fetch from './index';

export async function fetchCreateComment(payload: FetchCreateCommentRequest) {
  return fetch<FetchCreateCommentRequest, undefined>({
    url: '/comments',
    method: 'POST',
    payload,
    cache: 'no-store',
  });
}
