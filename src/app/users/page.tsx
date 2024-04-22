import { Metadata } from 'next';
import ErrorFetchingPage from '@/src/components/ErrorFetchingPage';
import Layout from '@/src/components/Layout';
import { fetchUserDetail, fetchUsers } from '@/src/service/fetch/users';
import { css } from '@/styled-system/css';
import CardUser from './components/CardUser';
import ButtonAdd from './components/ButtonAdd';
import DrawerUserDetail from './components/DrawerUserDetail';
import { UserDetail } from '@/src/interface/users';
import FilterSearchQuery from '@/src/components/FilterSearchQuery';

const styles = {
  headerContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'xl',
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
  if (searchParams.id) {
    const userDetailReponse = await fetchUserDetail(searchParams.id);
    if (userDetailReponse.success) {
      userDetail = userDetailReponse.data;
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
          <div className={styles.cardContainer}>
            {response.data.map((item, index) => (
              <CardUser key={index} {...item} />
            ))}
          </div>
          {userDetail && <DrawerUserDetail data={userDetail} />}
        </>
      ) : (
        <ErrorFetchingPage />
      )}
    </Layout>
  );
};

export default UsersPage;

export const metadata: Metadata = {
  title: 'Users - SAT NUSAPERSADA',
};
