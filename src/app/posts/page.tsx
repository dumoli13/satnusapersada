import React from 'react';
import { Metadata } from 'next';
import ErrorFetchingPage from '@/src/components/ErrorFetchingPage';
import Layout from '@/src/components/Layout';
import { fetchUsers } from '@/src/service/fetch/users';
import { css } from '@/styled-system/css';
import FilterSearchQuery from '@/src/components/FilterSearchQuery';
import EmptyList from '@/src/components/EmptyList';
import { CommentDetail, PostDetail } from '@/src/interface/posts';
import {
  fetchPostComments,
  fetchPostDetail,
  fetchPosts,
} from '@/src/service/fetch/posts';
import ListPosts from './components/ListPosts';
import ButtonAdd from './components/ButtonAdd';

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

const PostsPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const id = searchParams?.id;
  const q = searchParams?.q;

  const [postResponse, userListResponse] = await Promise.all([
    fetchPosts({ q }),
    fetchUsers(),
  ]);

  if (postResponse.success && userListResponse.success) {
    const postList = postResponse.data;
    const userList = userListResponse.data;

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

    return (
      <Layout>
        <div className={styles.headerContainer}>
          <h1 className={styles.heading}>Post</h1>
          <div className={styles.headerCtaContainer}>
            <ButtonAdd userList={userList} />
            <FilterSearchQuery placeholder="Search Post" />
          </div>
        </div>
        {postList.length > 0 ? (
          <ListPosts
            data={postList}
            userList={userList}
            postDetail={postDetail}
            commentList={commentList}
          />
        ) : (
          <EmptyList
            title="No data found"
            isSearching={q != null}
            description={
              q ? 'Please try another post keyword' : 'Create new post'
            }
          />
        )}
      </Layout>
    );
  }

  return <ErrorFetchingPage />;
};

export default PostsPage;

export const metadata: Metadata = {
  title: 'POSTS - SAT NUSAPERSADA',
};
