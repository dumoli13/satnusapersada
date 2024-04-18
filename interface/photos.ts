export type FetchPhotoListRequest = {
  albumId?: string;
  id?: string;
  title?: string;
};

export type FetchPhotoListResponse = Array<{
  albumId: string;
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}>;

export type FetchPhotoDetailResponse = {
  albumId: string;
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type FetchCreatePhotoRequest = {
  userId: string;
  title: string;
  body: string;
};

export type FetchUpdatePhotoRequest = {
  userId: string;
  title: string;
  body: string;
};

export type FetchPatchPhotoRequest = {
  userId?: string;
  title?: string;
  body?: string;
};
