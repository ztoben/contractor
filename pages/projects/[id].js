import Layout from '../../components/layout';
import {useRouter} from 'next/router';
import React from 'react';

const Project = (/*props*/) => {
  const router = useRouter();

  return (
    <Layout>
      <h1>{`Project ${router.query.id}`}</h1>
    </Layout>
  );
};

export default Project;
