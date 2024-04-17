export type FetchCommentListRequest = {
  postId?: string;
  id?: string;
  name?: string;
  email?: string;
};

export type FetchCommentListResponse = Array<{
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}>;

export type FetchCommentDetail = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type FetchCreateCommentRequest = {
  postId: number;
  name: string;
  email: string;
};

export type FetchCreateCommentResponse = {
  postId: number;
  name: string;
  email: string;
};
