import React from 'react';
import Header from './header';

const Layout = props => (
  <div>
    <style jsx global>{`
      body {
        color: black;
      }
    `}</style>
    <Header />
    {props.children}
  </div>
);

export default Layout;
