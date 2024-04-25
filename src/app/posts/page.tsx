import { Metadata } from 'next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import ErrorFetchingPage from '@/src/components/ErrorFetchingPage';
import Layout from '@/src/components/Layout';
import { fetchUsers } from '@/src/service/fetch/users';
import { css } from '@/styled-system/css';
import ButtonAdd from './components/ButtonAdd';
import FilterSearchQuery from '@/src/components/FilterSearchQuery';
import EmptyList from '@/src/components/EmptyList';
import DrawerPostDetail from './components/DrawerPostDetail';
import { CommentDetail, PostDetail } from '@/src/interface/posts';
import {
  fetchPostComments,
  fetchPostDetail,
  fetchPosts,
} from '@/src/service/fetch/posts';
import CardPost from './components/CardPost';

const styles = {
  headerContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'base',
    xl: {
      marginBottom: 'xl',
    },
  }),
  heading: css({
    fontSize: '5xl',
    fontWeight: 'bold',
  }),
  cardContainer: css({
    display: 'block',
    columnCount: '3',
    columnGap: '2xl',
    overflowY: 'auto',
  }),
};

interface Properties {
  searchParams: { [key: string]: string | undefined };
}

const PostsPage = async ({ searchParams }: Properties) => {
  const { id, q } = searchParams;

  const responsePost = await fetchPosts({
    title: q,
  });
  const userListResponse = await fetchUsers();

  let postDetail: PostDetail | null = null;
  let commentList: Array<CommentDetail> = [];
  if (id) {
    const [postDetailResponse, commentListResponse] = await Promise.all([
      fetchPostDetail(id),
      fetchPostComments(id),
    ]);

    if (postDetailResponse.success) {
      postDetail = postDetailResponse.data;
    }
    if (commentListResponse.success) {
      commentList = commentListResponse.data;
    }
  }

  if (responsePost.success && userListResponse.success) {
    const userList = userListResponse.data;
    return (
      <Layout>
        <div className={styles.headerContainer}>
          <ButtonAdd userList={userList} />
          <h1 className={styles.heading}>Post</h1>
          <FilterSearchQuery placeholder="Search Post" />
        </div>
        {responsePost.data.length > 0 && (
          <div className={styles.cardContainer}>
            {responsePost.data.map((item, index) => {
              const author = userList.find((user) => user.id === item.userId);
              return <CardPost key={index} data={item} user={author} />;
            })}
          </div>
        )}
        {responsePost.data.length === 0 && q && (
          <EmptyList
            icon={<SearchIcon sx={{ width: 250, height: 250 }} color="error" />}
            title="No Data found"
            description="Please try another post title"
          />
        )}
        {responsePost.data.length === 0 && !q && (
          <EmptyList
            icon={
              <HighlightOffIcon
                sx={{ width: 250, height: 250 }}
                color="error"
              />
            }
            title="No Data found"
            description="Create new post"
          />
        )}
        {postDetail && (
          <DrawerPostDetail
            data={postDetail}
            comments={commentList}
            userList={userListResponse.data}
          />
        )}
      </Layout>
    );
  }
  return (
    <Layout>
      <ErrorFetchingPage />
    </Layout>
  );
};

export default PostsPage;

export const metadata: Metadata = {
  title: 'POSTS - SAT NUSAPERSADA',
};
