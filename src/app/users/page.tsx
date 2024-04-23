import { Metadata } from 'next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import ErrorFetchingPage from '@/src/components/ErrorFetchingPage';
import Layout from '@/src/components/Layout';
import { fetchUserDetail, fetchUsers } from '@/src/service/fetch/users';
import { css } from '@/styled-system/css';
import CardUser from './components/CardUser';
import ButtonAdd from './components/ButtonAdd';
import DrawerUserDetail from './components/DrawerUserDetail';
import { UserDetail } from '@/src/interface/users';
import FilterSearchQuery from '@/src/components/FilterSearchQuery';
import { TodoDetail } from '@/src/interface/todos';
import { fetchTodos } from '@/src/service/fetch/todos';
import EmptyList from '@/src/components/EmptyList';

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
  const response = await fetchUsers({
    name: searchParams.q,
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
            <FilterSearchQuery placeholder="Search User" />
          </div>
          {response.data.length > 0 && (
            <div className={styles.cardContainer}>
              {response.data.map((item, index) => (
                <CardUser key={index} {...item} />
              ))}
            </div>
          )}
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
