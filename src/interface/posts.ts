export type FetchPostListRequest = {
  q?: string;
};

export type PostDetail = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CommentDetail = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type FetchPostListResponse = Array<PostDetail>;

export type FetchCreatePostRequest = {
  userId: number;
  title: string;
  body: string;
};
