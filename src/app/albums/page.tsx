import { Metadata } from 'next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import ErrorFetchingPage from '@/src/components/ErrorFetchingPage';
import Layout from '@/src/components/Layout';
import { fetchUsers } from '@/src/service/fetch/users';
import { css } from '@/styled-system/css';
import CardAlbum from './components/CardAlbum';
import ButtonAdd from './components/ButtonAdd';
import FilterSearchQuery from '@/src/components/FilterSearchQuery';
import EmptyList from '@/src/components/EmptyList';
import ListUser from './components/ListUser';
import { fetchAlbumDetail, fetchAlbums } from '@/src/service/fetch/albums';
import { fetchPhotos } from '@/src/service/fetch/photos';
import { AlbumDetail } from '@/src/interface/albums';
import DrawerAlbumDetail from './components/DrawerAlbumDetail';

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
    gap: 'large',
    gridTemplateColumns: '1',
    md: {
      gridTemplateColumns: '2',
    },
  }),
};
const AlbumsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { q, userId } = searchParams;

  const [responseAlbum, responsePhoto] = await Promise.all([
    fetchAlbums({
      title: q,
      userId,
    }),
    fetchPhotos(),
  ]);
  const userListResponse = await fetchUsers();

  let albumDetail: AlbumDetail | null = null;
  if (searchParams.id) {
    const userDetailReponse = await fetchAlbumDetail(searchParams.id);
    if (userDetailReponse.success) {
      albumDetail = userDetailReponse.data;
    }
  }

  return (
    <Layout>
      {responseAlbum.success &&
      responsePhoto.success &&
      userListResponse.success ? (
        <>
          <div className={styles.headerContainer}>
            <ButtonAdd userList={userListResponse.data} />
            <FilterSearchQuery placeholder="Search Album" />
          </div>
          {responseAlbum.data.length > 0 && (
            <>
              <ListUser userList={userListResponse.data} />
              <div className={styles.cardContainer}>
                {responseAlbum.data
                  .filter((item) =>
                    userId ? item.userId.toString() === userId : true,
                  )
                  .map((item, index) => (
                    <CardAlbum
                      key={index}
                      data={item}
                      photos={responsePhoto.data.filter(
                        (photo) => item.id === photo.albumId,
                      )}
                    />
                  ))}
              </div>
            </>
          )}
          {responseAlbum.data.length === 0 && searchParams.q && (
            <EmptyList
              icon={
                <SearchIcon sx={{ width: 250, height: 250 }} color="error" />
              }
              title="No Data found"
              description="Please try another album title"
            />
          )}
          {responseAlbum.data.length === 0 && !searchParams.q && (
            <EmptyList
              icon={
                <HighlightOffIcon
                  sx={{ width: 250, height: 250 }}
                  color="error"
                />
              }
              title="No Data found"
              description="Create new album"
            />
          )}
          {albumDetail && (
            <DrawerAlbumDetail
              data={albumDetail}
              photos={responsePhoto.data.filter(
                (photo) => searchParams.id === photo.albumId.toString(),
              )}
              userList={userListResponse.data}
            />
          )}
        </>
      ) : (
        <ErrorFetchingPage />
      )}
    </Layout>
  );
};

export default AlbumsPage;

export const metadata: Metadata = {
  title: 'ALBUMS - SAT NUSAPERSADA',
};