import Layout from '../components/layout';
import React from 'react';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core';

export default function Index() {
  const useStyles = makeStyles({
    headerContainer: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center'
    }
  });
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth);

  return (
    <Layout>
      <div className={classes.headerContainer}>
        <h1>{`Welcome, ${auth.displayName}!`}</h1>
      </div>
    </Layout>
  );
}
