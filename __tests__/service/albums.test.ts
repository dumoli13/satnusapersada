import * as albumsApi from '@/src/service/fetch/albums';
import {
  FetchAlbumListRequest,
  FetchAlbumListResponse,
  AlbumDetail,
  FetchCreateAlbumRequest,
} from '@/src/interface/albums';

jest.mock('@/src/service/fetch/index', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/src/service/fetch/albums', () => ({
  __esModule: true,
  fetchAlbums: jest.fn(),
  fetchAlbumDetail: jest.fn(),
  fetchCreateAlbum: jest.fn(),
  fetchUpdateAlbum: jest.fn(),
  fetchDeleteAlbum: jest.fn(),
}));

describe('Albums API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchAlbums', async () => {
    const mockAlbums: FetchAlbumListResponse = [
      {
        userId: 1,
        id: 1,
        title: 'Album one',
      },
    ];
    (albumsApi.fetchAlbums as jest.Mock).mockResolvedValue(mockAlbums);

    const result = await albumsApi.fetchAlbums();
    expect(result).toEqual(mockAlbums);
    expect(albumsApi.fetchAlbums).toHaveBeenCalledTimes(1);
  });

  test('fetchAlbums', async () => {
    const payload: FetchAlbumListRequest = {
      q: 'one',
    };
    const mockAlbums: FetchAlbumListResponse = [
      {
        userId: 1,
        id: 1,
        title: 'Album one',
      },
    ];
    (albumsApi.fetchAlbums as jest.Mock).mockResolvedValue(mockAlbums);

    const result = await albumsApi.fetchAlbums(payload);
    expect(result).toEqual(mockAlbums);
    expect(albumsApi.fetchAlbums).toHaveBeenCalledTimes(1);
  });

  test('fetchAlbumDetail', async () => {
    const mockAlbumId = '1';
    const mockAlbumDetail: AlbumDetail = {
      userId: 1,
      id: 1,
      title: 'Album 1',
    };
    (albumsApi.fetchAlbumDetail as jest.Mock).mockResolvedValue(
      mockAlbumDetail,
    );

    const result = await albumsApi.fetchAlbumDetail(mockAlbumId);
    expect(result).toEqual(mockAlbumDetail);
    expect(albumsApi.fetchAlbumDetail).toHaveBeenCalledWith(mockAlbumId);
  });

  test('fetchCreateAlbum', async () => {
    const mockNewAlbumData: FetchCreateAlbumRequest = {
      userId: 1,
      title: 'New Album',
    };
    (albumsApi.fetchCreateAlbum as jest.Mock).mockResolvedValue(null);

    const result = await albumsApi.fetchCreateAlbum(mockNewAlbumData);
    expect(result).toBeNull();
    expect(albumsApi.fetchCreateAlbum).toHaveBeenCalledWith(mockNewAlbumData);
  });

  test('fetchUpdateAlbum', async () => {
    const mockAlbumId = 1;
    const mockUpdatedAlbumData: FetchCreateAlbumRequest = {
      userId: 1,
      title: 'Updated Album',
    };
    (albumsApi.fetchUpdateAlbum as jest.Mock).mockResolvedValue(null);

    const result = await albumsApi.fetchUpdateAlbum(
      mockAlbumId,
      mockUpdatedAlbumData,
    );
    expect(result).toBeNull();
    expect(albumsApi.fetchUpdateAlbum).toHaveBeenCalledWith(
      mockAlbumId,
      mockUpdatedAlbumData,
    );
  });

  test('fetchDeleteAlbum', async () => {
    const mockAlbumId = 1;
    (albumsApi.fetchDeleteAlbum as jest.Mock).mockResolvedValue(null);

    const result = await albumsApi.fetchDeleteAlbum(mockAlbumId);
    expect(result).toBeNull();
    expect(albumsApi.fetchDeleteAlbum).toHaveBeenCalledWith(mockAlbumId);
  });
});
