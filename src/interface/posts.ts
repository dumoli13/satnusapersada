export type FetchPostListRequest = {
  postId?: string;
  id?: string;
  title?: string;
};

export type FetchPostListResponse = Array<{
  userId: string;
  id: string;
  title: string;
  body: string;
}>;

export type FetchPostDetailResponse = {
  userId: string;
  title: string;
  body: string;
};

export type FetchPostCommentsResponse = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type FetchCreatePostRequest = {
  userId: string;
  title: string;
  body: string;
};

export type FetchCreatePostResponse = {
  userId: string;
  title: string;
  body: string;
};

export type FetchUpdatePostRequest = {
  userId: string;
  title: string;
  body: string;
};

export type FetchUpdatePostResponse = {
  userId: string;
  title: string;
  body: string;
};

export type FetchPatchPostRequest = {
  userId?: string;
  title?: string;
  body?: string;
};
