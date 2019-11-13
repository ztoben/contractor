import React from 'react';
import Header from './header';
import {isEmpty, isLoaded} from 'react-redux-firebase';
import {useSelector} from 'react-redux';
import {CircularProgress} from '@material-ui/core';

export default function Layout (props) {
  const auth = useSelector(state => state.firebase.auth);

  return (
    <div>
      <style jsx global>{`
      body {
        color: black;
      }
    `}</style>
      <Header />
      <div style={{margin: 15}}>
        {isEmpty(auth) ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 60,
              flexDirection: 'column'
            }}
          >
            {!isLoaded(auth) ? <CircularProgress /> : (
              <>
                <img src="/logo.svg" alt="logo" width={300}/>
                <h1>Please login to start using Contractor.</h1>
              </>
            )}
          </div>
        ) : props.children}
      </div>
    </div>
  );
}
