'use client';

import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { TodoDetail } from '@/src/interface/todos';
import { UserDetail } from '@/src/interface/users';
import { css } from '@/styled-system/css';
import CardTodo from './CardTodo';
// import TodoChart from '../TodoChart';
import ListUser from '../ListUser';

const TodoChart = dynamic(() => import('../TodoChart'), {
  loading: () => <Skeleton variant="rounded" height={44} />,
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

const TodoWrapper = ({ data, userList }: Properties) => (
  <>
    <TodoChart todoList={data} userList={userList} />
    <ListUser userList={userList} />
    <div className={styles.cardContainer}>
      {data.map((item, index) => (
        <CardTodo key={index} data={item} userList={userList} />
      ))}
    </div>
  </>
);

export default TodoWrapper;
