import React from 'react';
import { Metadata } from 'next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import ErrorFetchingPage from '@/src/components/ErrorFetchingPage';
import Layout from '@/src/components/Layout';
import { fetchUserDetail, fetchUsers } from '@/src/service/fetch/users';
import { css } from '@/styled-system/css';
import ButtonAdd from './components/ButtonAdd';
import DrawerUserDetail from './components/DrawerUserDetail';
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
    xl: {
      marginBottom: 'xl',
    },
  }),
  heading: css({
    fontSize: '5xl',
    fontWeight: 'bold',
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
  const q = searchParams?.q;
  const response = await fetchUsers({
    q,
  });

  let userDetail: UserDetail | null = null;
  let userTodos: TodoDetail[] | null = null;
  if (searchParams.id) {
    const userDetailReponse = await fetchUserDetail(searchParams.id);
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
      {response.success ? (
        <>
          <div className={styles.headerContainer}>
            <ButtonAdd />
            <h1 className={styles.heading}>User</h1>
            <FilterSearchQuery placeholder="Search User" />
          </div>
          {response.data.length > 0 && <ListUsers data={response.data} />}
          {response.data.length === 0 && searchParams.q && (
            <EmptyList
              icon={
                <SearchIcon sx={{ width: 250, height: 250 }} color="error" />
              }
              title="No Data found"
              description="Please try another user name"
            />
          )}
          {response.data.length === 0 && !searchParams.q && (
            <EmptyList
              icon={
                <HighlightOffIcon
                  sx={{ width: 250, height: 250 }}
                  color="error"
                />
              }
              title="No Data found"
              description="Create new user"
            />
          )}
          {userDetail && (
            <DrawerUserDetail data={userDetail} todos={userTodos} />
          )}
        </>
      ) : (
        <ErrorFetchingPage />
      )}
    </Layout>
  );
};

export default UsersPage;

export const metadata: Metadata = {
  title: 'USERS - SAT NUSAPERSADA',
};
