export type FetchPhotoListRequest = {
  albumId?: string;
  id?: string;
  title?: string;
};

export type PhotoDetail = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
export type FetchPhotoListResponse = Array<PhotoDetail>;

export type FetchCreatePhotoRequest = {
  albumId: number;
  title: string;
  body: string;
};
