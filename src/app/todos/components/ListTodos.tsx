'use client';

import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import SNPagination from '@/src/components/SNPagination';
import { TodoDetail } from '@/src/interface/todos';
import { UserDetail } from '@/src/interface/users';
import { css } from '@/styled-system/css';
import { SkeletonListUser } from './ListUser';

const CardTodo = dynamic(() => import('./CardTodo'), {
  loading: () => <Skeleton variant="rounded" width="100%" height={158} />,
});

const ListUser = dynamic(() => import('./ListUser'), {
  loading: () => <SkeletonListUser />,
});

const TodoChart = dynamic(() => import('./TodoChart'), {
  loading: () => <Skeleton variant="rounded" height={300} width="100%" />,
});

interface Properties {
  data: Array<TodoDetail>;
  userList: Array<UserDetail>;
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

const ListTodos = ({ data, userList }: Properties) => {
  const limit = 12;
  const [page, setPage] = useState(1);

  const slicedData = data.slice((page - 1) * limit, page * limit);

  return (
    <>
      <TodoChart todoList={data} userList={userList} />
      <ListUser userList={userList} />
      <div className={styles.cardContainer}>
        {slicedData.map((item, index) => (
          <CardTodo key={index} data={item} userList={userList} />
        ))}
      </div>
      {data.length > limit && (
        <SNPagination
          page={page}
          count={Math.ceil(data.length / limit)}
          onChange={setPage}
        />
      )}
    </>
  );
};

export default ListTodos;
