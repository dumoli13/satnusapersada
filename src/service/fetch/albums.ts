import {
  FetchAlbumDetailResponse,
  FetchAlbumListRequest,
  FetchAlbumListResponse,
  FetchCreateAlbumRequest,
  FetchPatchAlbumRequest,
  FetchUpdateAlbumRequest,
} from '@/src/interface/albums';
import fetch from './index';

export async function fetchAlbums(payload: FetchAlbumListRequest) {
  return fetch<FetchAlbumListRequest, FetchAlbumListResponse>({
    url: '/albums',
    method: 'GET',
    payload,
    cache: 'no-store',
  });
}

export async function fetchAlbumDetail(id: string) {
  return fetch<undefined, FetchAlbumDetailResponse>({
    url: `/albums/${id}`,
    method: 'GET',
    cache: 'no-store',
  });
}

export async function fetchCreateAlbum(payload: FetchCreateAlbumRequest) {
  return fetch<FetchCreateAlbumRequest, null>({
    url: '/albums',
    method: 'POST',
    payload,
    cache: 'no-store',
  });
}

export async function fetchUpdateAlbum(
  id: string,
  payload: FetchUpdateAlbumRequest,
) {
  return fetch<FetchUpdateAlbumRequest, null>({
    url: `/albums/${id}`,
    method: 'PUT',
    payload,
    cache: 'no-store',
  });
}

export async function fetchPatchAlbum(
  id: string,
  payload: FetchPatchAlbumRequest,
) {
  return fetch<FetchPatchAlbumRequest, null>({
    url: `/albums/${id}`,
    method: 'PATCH',
    payload,
    cache: 'no-store',
  });
}

export async function fetchDeleteAlbum(id: string) {
  return fetch<FetchPatchAlbumRequest, null>({
    url: `/albums/${id}`,
    method: 'DELETE',
    cache: 'no-store',
  });
}
