import React from 'react';
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
import { CommentDetail, PostDetail } from '@/src/interface/posts';
import {
  fetchPostComments,
  fetchPostDetail,
  fetchPosts,
} from '@/src/service/fetch/posts';
import ListPosts from './components/ListPosts';

const styles = {
  headerContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'base',
    lg: {
      marginBottom: 'xl',
    },
  }),
  headerCtaContainer: css({
    display: 'flex',
    gap: 'base',
  }),
  heading: css({
    fontSize: '3xl',
    fontWeight: 'bold',
    lg: {
      fontSize: '5xl',
    },
  }),
  cardContainer: css({
    display: 'grid',
    gap: '2xl',
    gridTemplateColumns: '1',
    md: {
      gridTemplateColumns: '2',
    },
    lg: {
      gridTemplateColumns: '3',
    },
  }),
};

interface Properties {
  searchParams?: { [key: string]: string | undefined };
}

const PostsPage = async ({ searchParams }: Properties) => {
  const id = searchParams?.id;
  const q = searchParams?.q;
  const postResponse = await fetchPosts({
    q,
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

  if (postResponse.success && userListResponse.success) {
    const postList = postResponse.data;
    const userList = userListResponse.data;

    return (
      <Layout>
        <div className={styles.headerContainer}>
          <h1 className={styles.heading}>Post</h1>
          <div className={styles.headerCtaContainer}>
            <ButtonAdd userList={userList} />
            <FilterSearchQuery placeholder="Search Post" />
          </div>
        </div>
        {postList.length > 0 && (
          <ListPosts
            data={postList}
            userList={userList}
            postDetail={postDetail}
            commentList={commentList}
          />
        )}
        {postList.length === 0 && q && (
          <EmptyList
            icon={<SearchIcon sx={{ width: 250, height: 250 }} color="error" />}
            title="No Data found"
            description="Please try another post title"
          />
        )}
        {postList.length === 0 && !q && (
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
