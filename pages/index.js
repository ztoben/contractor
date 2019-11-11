import Layout from '../components/layout';
import React from 'react';
import {useSelector} from 'react-redux';

export default function Index() {
  const auth = useSelector(state => state.firebase.auth);

  return (
    <Layout>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h1>{`Welcome, ${auth.displayName}!`}</h1>
      </div>
    </Layout>
  );
}
