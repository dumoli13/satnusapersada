import {
  AlbumDetail,
  FetchAlbumListRequest,
  FetchAlbumListResponse,
  FetchCreateAlbumRequest,
} from '@/src/interface/albums';
import fetch from './index';

export async function fetchAlbums(payload?: FetchAlbumListRequest) {
  return fetch<FetchAlbumListRequest, FetchAlbumListResponse>({
    url: '/albums',
    method: 'GET',
    payload,
    cache: 'no-store',
  });
}

export async function fetchAlbumDetail(id: string) {
  return fetch<undefined, AlbumDetail>({
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
  id: number,
  payload: FetchCreateAlbumRequest,
) {
  return fetch<FetchCreateAlbumRequest, null>({
    url: `/albums/${id}`,
    method: 'PUT',
    payload,
    cache: 'no-store',
  });
}

export async function fetchDeleteAlbum(id: number) {
  return fetch<undefined, null>({
    url: `/albums/${id}`,
    method: 'DELETE',
    cache: 'no-store',
  });
}
