'use client';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import ErrorFetchingPage from '../components/ErrorFetchingPage';

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <ErrorFetchingPage />
    </Layout>
  );
};

export default Error;
