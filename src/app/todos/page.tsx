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
import { fetchTodos } from '@/src/service/fetch/todos';
import EmptyList from '@/src/components/EmptyList';
import ListTodos from './components/ListTodos';

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
};

const TodosPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const userId = searchParams?.userId;
  const q = searchParams?.q;

  const [todoResponse, userListResponse] = await Promise.all([
    fetchTodos({ q }),
    fetchUsers(),
  ]);

  if (todoResponse.success && userListResponse.success) {
    const todoList = todoResponse.data;

    return (
      <Layout>
        <div className={styles.headerContainer}>
          <ButtonAdd userList={userListResponse.data} />
          <h1 className={styles.heading}>Todo</h1>
          <FilterSearchQuery placeholder="Search Todo" />
        </div>
        {todoList.length > 0 && (
          <ListTodos
            data={todoList
              .filter((item) =>
                userId ? item.userId.toString() === userId : true,
              )
              .sort((a, b) => Number(a.completed) - Number(b.completed))}
            userList={userListResponse.data}
          />
        )}
        {todoList.length === 0 && searchParams.q && (
          <EmptyList
            icon={<SearchIcon sx={{ width: 250, height: 250 }} color="error" />}
            title="No Data found"
            description="Please try another todo keyword"
          />
        )}
        {todoList.length === 0 && !searchParams.q && (
          <EmptyList
            icon={
              <HighlightOffIcon
                sx={{ width: 250, height: 250 }}
                color="error"
              />
            }
            title="No Data found"
            description="Create new todo"
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

export default TodosPage;

export const metadata: Metadata = {
  title: 'TODOS - SAT NUSAPERSADA',
};
