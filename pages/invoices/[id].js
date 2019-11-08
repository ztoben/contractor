import Layout from '../../components/layout';
import {useRouter} from 'next/router';
import React from 'react';

const Invoice = (/*props*/) => {
  const router = useRouter();

  return (
    <Layout>
      <h1>{`Invoice ${router.query.id}`}</h1>
    </Layout>
  );
};

export default Invoice;
