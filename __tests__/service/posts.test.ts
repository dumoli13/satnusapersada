import * as postsApi from '@/src/service/fetch/posts';
import {
  FetchCreatePostRequest,
  FetchPostListRequest,
  FetchPostListResponse,
  PostDetail,
  CommentDetail,
} from '@/src/interface/posts';

jest.mock('@/src/service/fetch/index', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/src/service/fetch/posts', () => ({
  __esModule: true,
  fetchPosts: jest.fn(),
  fetchPostDetail: jest.fn(),
  fetchPostComments: jest.fn(),
  fetchCreatePost: jest.fn(),
  fetchUpdatePost: jest.fn(),
  fetchDeletePost: jest.fn(),
}));

describe('Posts API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchPosts', async () => {
    const mockPosts: FetchPostListResponse = [
      {
        userId: 1,
        id: 1,
        title: 'post one',
        body: 'post body',
      },
      {
        userId: 1,
        id: 2,
        title: 'post two',
        body: 'post body',
      },
    ];
    (postsApi.fetchPosts as jest.Mock).mockResolvedValue(mockPosts);

    const result = await postsApi.fetchPosts();
    expect(result).toEqual(mockPosts);
    expect(postsApi.fetchPosts).toHaveBeenCalledTimes(1);
  });

  test('fetchPosts', async () => {
    const payload: FetchPostListRequest = {
      q: 'one',
    };
    const mockPosts: FetchPostListResponse = [
      {
        userId: 1,
        id: 1,
        title: 'post one',
        body: 'post body',
      },
    ];
    (postsApi.fetchPosts as jest.Mock).mockResolvedValue(mockPosts);

    const result = await postsApi.fetchPosts(payload);
    expect(result).toEqual(mockPosts);
    expect(postsApi.fetchPosts).toHaveBeenCalledTimes(1);
  });

  test('fetchPostDetail', async () => {
    const mockPostId = '1';
    const mockPostDetail: PostDetail = {
      userId: 1,
      id: 1,
      title: 'post title',
      body: 'post body',
    };
    (postsApi.fetchPostDetail as jest.Mock).mockResolvedValue(mockPostDetail);

    const result = await postsApi.fetchPostDetail(mockPostId);
    expect(result).toEqual(mockPostDetail);
    expect(postsApi.fetchPostDetail).toHaveBeenCalledWith(mockPostId);
  });

  test('fetchPostComments', async () => {
    const mockPostId = '1';
    const mockComments: CommentDetail[] = [
      {
        postId: 1,
        id: 1,
        name: 'comment name',
        email: 'comment@email.com',
        body: 'comment body',
      },
    ];
    (postsApi.fetchPostComments as jest.Mock).mockResolvedValue(mockComments);

    const result = await postsApi.fetchPostComments(mockPostId);
    expect(result).toEqual(mockComments);
    expect(postsApi.fetchPostComments).toHaveBeenCalledWith(mockPostId);
  });

  test('fetchCreatePost', async () => {
    const mockNewPostData: FetchCreatePostRequest = {
      userId: 1,
      title: 'post title',
      body: 'post body',
    };
    (postsApi.fetchCreatePost as jest.Mock).mockResolvedValue(null);

    const result = await postsApi.fetchCreatePost(mockNewPostData);
    expect(result).toBeNull();
    expect(postsApi.fetchCreatePost).toHaveBeenCalledWith(mockNewPostData);
  });

  test('fetchUpdatePost', async () => {
    const mockPostId = 1;
    const mockUpdatedPostData: FetchCreatePostRequest = {
      userId: 1,
      title: 'post title',
      body: 'post body',
    };
    (postsApi.fetchUpdatePost as jest.Mock).mockResolvedValue(null);

    const result = await postsApi.fetchUpdatePost(
      mockPostId,
      mockUpdatedPostData,
    );
    expect(result).toBeNull();
    expect(postsApi.fetchUpdatePost).toHaveBeenCalledWith(
      mockPostId,
      mockUpdatedPostData,
    );
  });

  test('fetchDeletePost', async () => {
    const mockPostId = 1;
    (postsApi.fetchDeletePost as jest.Mock).mockResolvedValue(null);

    const result = await postsApi.fetchDeletePost(mockPostId);
    expect(result).toBeNull();
    expect(postsApi.fetchDeletePost).toHaveBeenCalledWith(mockPostId);
  });
});
