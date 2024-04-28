import React from 'react';
import { Metadata } from 'next';
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
};

const TodosPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const userId = searchParams?.userId;
  const q = searchParams?.q;

  const [todoResponse, userListResponse] = await Promise.all([
    fetchTodos({ q, userId }),
    fetchUsers(),
  ]);

  if (todoResponse.success && userListResponse.success) {
    const todoList = todoResponse.data;
    const userList = userListResponse.data;

    return (
      <Layout>
        <div className={styles.headerContainer}>
          <h1 className={styles.heading}>Todo</h1>
          <div className={styles.headerCtaContainer}>
            <ButtonAdd userList={userList} />
            <FilterSearchQuery placeholder="Search Todo" />
          </div>
        </div>
        {todoList.length > 0 ? (
          <ListTodos
            data={todoList.sort(
              (a, b) => Number(a.completed) - Number(b.completed),
            )}
            userList={userList}
          />
        ) : (
          <EmptyList
            title="No data found"
            isSearching={q != null}
            description={
              q ? 'Please try another todo keyword' : 'Create new todo'
            }
          />
        )}
      </Layout>
    );
  }
  return <ErrorFetchingPage />;
};

export default TodosPage;

export const metadata: Metadata = {
  title: 'TODOS - SAT NUSAPERSADA',
};
