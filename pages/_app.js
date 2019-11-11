import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import {firebaseConfig} from "../firebaseConfig";

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  presence: 'presence',
  sessions: 'sessions'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig).firestore();
} else {
  firebase.app().firestore();
}

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState);

export default class Contractor extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={rrfConfig}
          dispatch={store.dispatch}
          createFirestoreInstance={createFirestoreInstance}
        >
          <Head>
            <title>Contractor</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}
