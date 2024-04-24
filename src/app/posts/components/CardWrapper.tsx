'use client';

import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { PostDetail } from '@/src/interface/posts';
import { css } from '@/styled-system/css';
import { UserDetail } from '@/src/interface/users';

const CardPost = dynamic(() => import('./CardPost'), {
  loading: () => <Skeleton height={44} />,
});

interface Properties {
  data: Array<PostDetail>;
  userList: Array<UserDetail>;
}

const styles = {
  cardContainer: css({
    display: 'block',
    columnCount: '3',
    columnGap: '2xl',
    overflowY: 'auto',
  }),
};

const CardWrapper = ({ data, userList }: Properties) => (
  <div className={styles.cardContainer}>
    {data.map((item, index) => {
      const author = userList.find((user) => user.id === item.userId);
      return <CardPost key={index} data={item} user={author} />;
    })}
  </div>
);

export default CardWrapper;
