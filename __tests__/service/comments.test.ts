import * as commentsApi from '@/src/service/fetch/comments';
import { FetchCreateCommentRequest } from '@/src/interface/comments';

jest.mock('@/src/service/fetch/index', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/src/service/fetch/comments', () => ({
  __esModule: true,
  fetchCreateComment: jest.fn(),
}));

describe('Comments API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchCreateComment', async () => {
    const mockCommentData: FetchCreateCommentRequest = {
      postId: 1,
      name: 'name',
      email: 'comment@email.com',
      body: 'comment body',
    };
    (commentsApi.fetchCreateComment as jest.Mock).mockResolvedValue(undefined);

    const result = await commentsApi.fetchCreateComment(mockCommentData);
    expect(result).toBeUndefined();
    expect(commentsApi.fetchCreateComment).toHaveBeenCalledWith(
      mockCommentData,
    );
  });
});
