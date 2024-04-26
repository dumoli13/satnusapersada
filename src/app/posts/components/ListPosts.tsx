'use client';

import { useState } from 'react';
import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { CommentDetail, PostDetail } from '@/src/interface/posts';
import { UserDetail } from '@/src/interface/users';
import { css } from '@/styled-system/css';
import SNPagination from '@/src/components/SNPagination';

const CardPost = dynamic(() => import('./CardPost'), {
  loading: () => <Skeleton variant="rounded" width="100%" height={230} />,
});

const DrawerPostDetail = dynamic(() => import('./DrawerPostDetail'));

interface Properties {
  data: Array<PostDetail>;
  userList: Array<UserDetail>;
  postDetail: PostDetail | null;
  commentList: Array<CommentDetail>;
}

const styles = {
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

const ListPosts = ({ data, userList, postDetail, commentList }: Properties) => {
  const limit = 12;
  const [page, setPage] = useState(1);
  const paginatedData = data.slice((page - 1) * limit, page * limit);

  return (
    <>
      <div className={styles.cardContainer}>
        {paginatedData.map((item, index) => {
          const author = userList.find((user) => user.id === item.userId);
          return <CardPost key={index} data={item} user={author} />;
        })}
      </div>
      {data.length > limit && (
        <SNPagination
          page={page}
          count={Math.ceil(data.length / limit)}
          onChange={setPage}
        />
      )}
      {postDetail && (
        <DrawerPostDetail
          data={postDetail}
          comments={commentList}
          userList={userList}
        />
      )}
    </>
  );
};

export default ListPosts;
