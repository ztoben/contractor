import Layout from '../components/layout';
import React from 'react';
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

  return (
    <Layout>
      <div className={classes.headerContainer}>
        <h1>Invoices</h1>
      </div>
    </Layout>
  );
}
