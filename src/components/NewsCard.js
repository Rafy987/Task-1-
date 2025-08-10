import React from 'react';

export default function NewsCard({ title, description, imageUrl, articleUrl, sourceName, publishedAt }) {
  const imageNode = imageUrl
    ? React.createElement('img', {
        src: imageUrl,
        className: 'card-img-top',
        alt: title || 'News',
        style: { objectFit: 'cover', height: 180 },
      })
    : React.createElement('div', { className: 'bg-secondary', style: { height: 180 } });

  const descriptionNode = description
    ? React.createElement('p', { className: 'card-text flex-grow-1' }, description)
    : null;

  return React.createElement(
    'div',
    { className: 'card h-100 shadow-sm' },
    imageNode,
    React.createElement(
      'div',
      { className: 'card-body d-flex flex-column' },
      React.createElement('h5', { className: 'card-title' }, title),
      descriptionNode,
      React.createElement(
        'div',
        { className: 'd-flex justify-content-between align-items-center mt-2' },
        React.createElement('small', { className: 'text-muted' }, sourceName),
        React.createElement('small', { className: 'text-muted' }, new Date(publishedAt).toLocaleDateString())
      ),
      React.createElement(
        'a',
        { href: articleUrl, target: '_blank', rel: 'noopener noreferrer', className: 'btn btn-primary mt-3' },
        'Read More'
      )
    )
  );
}