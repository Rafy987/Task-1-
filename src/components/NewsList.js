import React, { useEffect, useRef, useState } from 'react';
import NewsCard from './NewsCard';
import { NEWS_API_KEY } from '../config';

const PAGE_SIZE = 12;

export default function NewsList({ searchQuery, category }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');

  const lastRequestSignature = useRef('');

  function buildUrl(pageNumber) {
    const url = new URL('https://newsapi.org/v2/top-headlines');
    url.searchParams.set('country', 'us');
    if (category) url.searchParams.set('category', category);
    if (searchQuery) url.searchParams.set('q', searchQuery);
    url.searchParams.set('pageSize', PAGE_SIZE.toString());
    url.searchParams.set('page', pageNumber.toString());
    return url.toString();
  }

  async function fetchPage(pageNumber, replace = false) {
    setIsLoading(true);
    setError('');
    try {
      const url = buildUrl(pageNumber);
      lastRequestSignature.current = `${category}|${searchQuery}`;
      const response = await fetch(url, {
        headers: { 'X-Api-Key': NEWS_API_KEY },
      });
      const data = await response.json();
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Failed to fetch news');
      }
      if (lastRequestSignature.current !== `${category}|${searchQuery}`) return;

      setArticles(prev => (replace ? data.articles : [...prev, ...data.articles]));
      const total = data.totalResults || 0;
      const reachedEnd = PAGE_SIZE * pageNumber >= total || data.articles.length < PAGE_SIZE;
      setHasMore(!reachedEnd);
    } catch (err) {
      setError(err.message || 'Unexpected error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    fetchPage(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, category]);

  function handleLoadMore() {
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  }

  const gridChildren = articles.map((article, idx) =>
    React.createElement(
      'div',
      { className: 'col', key: `${article.url}-${idx}` },
      React.createElement(NewsCard, {
        title: article.title,
        description: article.description,
        imageUrl: article.urlToImage,
        articleUrl: article.url,
        sourceName: article.source?.name,
        publishedAt: article.publishedAt,
      })
    )
  );

  const actions = React.createElement(
    'div',
    { className: 'd-flex justify-content-center my-4' },
    isLoading
      ? React.createElement('button', { className: 'btn btn-outline-secondary', disabled: true }, 'Loading...')
      : hasMore
      ? React.createElement('button', { className: 'btn btn-outline-primary', onClick: handleLoadMore }, 'Load More')
      : articles.length > 0
      ? React.createElement('span', { className: 'text-muted' }, 'No more results')
      : null
  );

  return React.createElement(
    'div',
    null,
    error
      ? React.createElement('div', { className: 'alert alert-danger', role: 'alert' }, error)
      : null,
    React.createElement('div', { className: 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4' }, gridChildren),
    actions
  );
}