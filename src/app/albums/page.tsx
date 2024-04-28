import React from 'react';
import { Metadata } from 'next';
import ErrorFetchingPage from '@/src/components/ErrorFetchingPage';
import Layout from '@/src/components/Layout';
import { fetchUsers } from '@/src/service/fetch/users';
import { css } from '@/styled-system/css';
import ButtonAdd from './components/ButtonAdd';
import FilterSearchQuery from '@/src/components/FilterSearchQuery';
import EmptyList from '@/src/components/EmptyList';
import { fetchAlbumDetail, fetchAlbums } from '@/src/service/fetch/albums';
import { fetchPhotos } from '@/src/service/fetch/photos';
import { AlbumDetail } from '@/src/interface/albums';
import ListAlbums from './components/ListAlbums';

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
  const userId = searchParams?.userId;
  const q = searchParams?.q;
  const id = searchParams?.id;

  const [albumResponse, photoResponse, userListResponse] = await Promise.all([
    fetchAlbums({ q, userId }),
    fetchPhotos(),
    fetchUsers(),
  ]);

  if (
    albumResponse.success &&
    photoResponse.success &&
    userListResponse.success
  ) {
    const albumList = albumResponse.data;

    let albumDetail: AlbumDetail | null = null;
    if (id) {
      const userDetailReponse = await fetchAlbumDetail(id);
      if (userDetailReponse.success) {
        albumDetail = userDetailReponse.data;
      }
    }

    return (
      <Layout>
        <div className={styles.headerContainer}>
          <h1 className={styles.heading}>Album</h1>
          <div className={styles.headerCtaContainer}>
            <ButtonAdd userList={userListResponse.data} />
            <FilterSearchQuery placeholder="Search Album" />
          </div>
        </div>
        {albumList.length > 0 ? (
          <ListAlbums
            data={albumList.filter((item) =>
              userId && !Number.isNaN(userId)
                ? item.userId === parseInt(userId, 10)
                : true,
            )}
            photoList={photoResponse.data}
            userList={userListResponse.data}
            albumDetail={albumDetail}
            selectedId={id}
          />
        ) : (
          <EmptyList
            title="No data found"
            isSearching={q != null}
            description={
              q ? 'Please try another album keyword' : 'Create new album'
            }
          />
        )}
      </Layout>
    );
  }

  return <ErrorFetchingPage />;
};

export default AlbumsPage;

export const metadata: Metadata = {
  title: 'ALBUMS - SAT NUSAPERSADA',
};
