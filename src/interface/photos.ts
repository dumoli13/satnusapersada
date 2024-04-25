export type FetchPhotoListRequest = {
  q?: string;
};

export type PhotoDetail = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
export type FetchPhotoListResponse = Array<PhotoDetail>;
