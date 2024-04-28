import React from 'react';
import { Metadata } from 'next';
import ErrorFetchingPage from '@/src/components/ErrorFetchingPage';
import Layout from '@/src/components/Layout';
import { fetchUserDetail, fetchUsers } from '@/src/service/fetch/users';
import { css } from '@/styled-system/css';
import ButtonAdd from './components/ButtonAdd';
import { UserDetail } from '@/src/interface/users';
import FilterSearchQuery from '@/src/components/FilterSearchQuery';
import { TodoDetail } from '@/src/interface/todos';
import { fetchTodos } from '@/src/service/fetch/todos';
import EmptyList from '@/src/components/EmptyList';
import ListUsers from './components/ListUsers';

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

const UsersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const id = searchParams?.id;
  const q = searchParams?.q;

  const response = await fetchUsers({
    q,
  });

  if (response.success) {
    const userList = response.data;

    let userDetail: UserDetail | null = null;
    let userTodos: TodoDetail[] | null = null;
    if (id) {
      const userDetailReponse = await fetchUserDetail(id);
      if (userDetailReponse.success) {
        userDetail = userDetailReponse.data;
      }

      const userTodosReponse = await fetchTodos({ userId: searchParams.id });
      if (userTodosReponse.success) {
        userTodos = userTodosReponse.data;
      }
    }

    return (
      <Layout>
        <div className={styles.headerContainer}>
          <h1 className={styles.heading}>User</h1>
          <div className={styles.headerCtaContainer}>
            <ButtonAdd />
            <FilterSearchQuery placeholder="Search User" />
          </div>
        </div>
        {userList.length > 0 ? (
          <ListUsers
            userList={userList}
            userDetail={userDetail}
            userTodos={userTodos}
          />
        ) : (
          <EmptyList
            title="No data found"
            isSearching={q != null}
            description={
              q ? 'Please try another user keyword' : 'Create new user'
            }
          />
        )}
      </Layout>
    );
  }
  return <ErrorFetchingPage />;
};

export default UsersPage;

export const metadata: Metadata = {
  title: 'USERS - SAT NUSAPERSADA',
};
