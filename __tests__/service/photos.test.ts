import * as photosApi from '@/src/service/fetch/photos';
import {
  FetchPhotoListRequest,
  FetchPhotoListResponse,
} from '@/src/interface/photos';

jest.mock('@/src/service/fetch/index', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/src/service/fetch/photos', () => ({
  __esModule: true,
  fetchPhotos: jest.fn(),
}));

describe('Photos API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchPhotos', async () => {
    const mockPhotos: FetchPhotoListResponse = [
      {
        albumId: 1,
        id: 1,
        title: 'Photo one',
        url: 'https://via.placeholder.com/photo1',
        thumbnailUrl: 'https://via.placeholder.com/photo1-thumbnail',
      },
      {
        albumId: 1,
        id: 2,
        title: 'Photo two',
        url: 'https://via.placeholder.com/photo2',
        thumbnailUrl: 'https://via.placeholder.com/photo2-thumbnail',
      },
    ];
    (photosApi.fetchPhotos as jest.Mock).mockResolvedValue(mockPhotos);

    const result = await photosApi.fetchPhotos();
    expect(result).toEqual(mockPhotos);
    expect(photosApi.fetchPhotos).toHaveBeenCalledTimes(1);
  });

  test('fetchPhotos', async () => {
    const payload: FetchPhotoListRequest = {
      q: 'one',
    };
    const mockPhotos: FetchPhotoListResponse = [
      {
        albumId: 1,
        id: 1,
        title: 'Photo one',
        url: 'https://via.placeholder.com/photo1',
        thumbnailUrl: 'https://via.placeholder.com/photo1-thumbnail',
      },
    ];
    (photosApi.fetchPhotos as jest.Mock).mockResolvedValue(mockPhotos);

    const result = await photosApi.fetchPhotos(payload);
    expect(result).toEqual(mockPhotos);
    expect(photosApi.fetchPhotos).toHaveBeenCalledTimes(1);
  });
});
