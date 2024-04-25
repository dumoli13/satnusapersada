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
import EmptyList from '@/src/components/EmptyList';
import ListUser from './components/ListUser';
import { fetchAlbumDetail, fetchAlbums } from '@/src/service/fetch/albums';
import { fetchPhotos } from '@/src/service/fetch/photos';
import { AlbumDetail } from '@/src/interface/albums';
import DrawerAlbumDetail from './components/DrawerAlbumDetail';
import AlbumWrapper from './components/AlbumWrapper';

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
      q,
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
            <h1 className={styles.heading}>Album</h1>
            <FilterSearchQuery placeholder="Search Album" />
          </div>
          {responseAlbum.data.length > 0 && (
            <>
              <ListUser userList={userListResponse.data} />
              <AlbumWrapper
                data={responseAlbum.data}
                photos={responsePhoto.data}
                userId={userId}
              />
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
