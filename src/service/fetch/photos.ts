import {
  FetchPhotoListRequest,
  FetchPhotoListResponse,
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
