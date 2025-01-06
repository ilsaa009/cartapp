import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
