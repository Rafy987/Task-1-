import React from 'react';
import NewsList from '../components/NewsList';

export default function Home({ searchQuery, category }) {
  return React.createElement(
    'div',
    null,
    React.createElement(NewsList, { searchQuery, category })
  );
}