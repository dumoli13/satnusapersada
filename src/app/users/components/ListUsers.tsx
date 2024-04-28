'use client';

import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import SNPagination from '@/src/components/SNPagination';
import { UserDetail } from '@/src/interface/users';
import { css } from '@/styled-system/css';
import { TodoDetail } from '@/src/interface/todos';

const CardUser = dynamic(() => import('./CardUser'), {
  loading: () => <Skeleton variant="rounded" height={125} />,
});

const DrawerUserDetail = dynamic(() => import('./DrawerUserDetail'));

interface Properties {
  userList: Array<UserDetail>;
  userDetail: UserDetail | null;
  userTodos: Array<TodoDetail> | null;
}

const styles = {
  cardContainer: css({
    display: 'grid',
    gap: 'base',
    gridTemplateColumns: '1',
    md: {
      gridTemplateColumns: '2',
    },
    lg: {
      gridTemplateColumns: '3',
    },
  }),
};

const ListUsers = ({ userList, userDetail, userTodos }: Properties) => {
  const limit = 10;
  const [page, setPage] = useState(1);

  return (
    <>
      <div className={styles.cardContainer}>
        {userList.slice((page - 1) * limit, page * limit).map((item, index) => (
          <CardUser key={index} {...item} />
        ))}
      </div>

      {userList.length > limit && (
        <SNPagination
          page={page}
          count={Math.ceil(userList.length / limit)}
          onChange={setPage}
        />
      )}

      {userDetail && <DrawerUserDetail data={userDetail} todos={userTodos} />}
    </>
  );
};

export default ListUsers;
