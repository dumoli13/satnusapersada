export type FetchAlbumListRequest = {
  userId?: string;
  id?: string;
  title?: string;
};

export type FetchAlbumListResponse = Array<{
  userId: string;
  id: string;
  title: string;
}>;

export type FetchAlbumDetailResponse = {
  userId: string;
  id: string;
  title: string;
};

export type FetchCreateAlbumRequest = {
  userId: string;
  title: string;
  body: string;
};

export type FetchUpdateAlbumRequest = {
  userId: string;
  title: string;
  body: string;
};

export type FetchPatchAlbumRequest = {
  userId?: string;
  title?: string;
  body?: string;
};
