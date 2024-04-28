import React from 'react';
import { css } from '@/styled-system/css';
import EmptyList from './EmptyList';
import Layout from './Layout';

const styles = {
  root: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};
const ErrorFetchingPage = () => (
  <Layout>
    <div className={styles.root}>
      <EmptyList
        title="Error While Fetching Data"
        description="Please try again later"
      />
    </div>
  </Layout>
);

export default ErrorFetchingPage;
