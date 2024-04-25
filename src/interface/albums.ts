export type FetchAlbumListRequest = {
  q?: string;
  userId?: string;
  id?: string;
  title?: string;
};

export type AlbumDetail = {
  userId: number;
  id: number;
  title: string;
};

export type FetchAlbumListResponse = Array<AlbumDetail>;

export type FetchCreateAlbumRequest = {
  userId: number;
  title: string;
};
