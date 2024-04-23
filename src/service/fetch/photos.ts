import {
  FetchCreatePhotoRequest,
  FetchPhotoListRequest,
  FetchPhotoListResponse,
  PhotoDetail,
} from '@/src/interface/photos';
import fetch from './index';

export async function fetchPhotos(payload?: FetchPhotoListRequest) {
  return fetch<FetchPhotoListRequest, FetchPhotoListResponse>({
    url: '/photos',
    method: 'GET',
    payload,
    cache: 'no-store',
  });
}

export async function fetchPhotosDetail(id: string) {
  return fetch<undefined, PhotoDetail>({
    url: `/photos/${id}`,
    method: 'GET',
    cache: 'no-store',
  });
}

export async function fetchCreatePhotos(payload: FetchCreatePhotoRequest) {
  return fetch<FetchCreatePhotoRequest, undefined>({
    url: '/photos',
    method: 'POST',
    payload,
    cache: 'no-store',
  });
}

export async function fetchUpdatePhotos(
  id: string,
  payload: FetchCreatePhotoRequest,
) {
  return fetch<FetchCreatePhotoRequest, undefined>({
    url: `/photos/${id}`,
    method: 'PUT',
    payload,
    cache: 'no-store',
  });
}

export async function fetchDeletePhotos(id: string) {
  return fetch<undefined, undefined>({
    url: `/photos/${id}`,
    method: 'DELETE',
    cache: 'no-store',
  });
}
