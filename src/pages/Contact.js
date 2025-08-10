import React from 'react';

export default function Contact() {
  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement('h1', { className: 'mb-3' }, 'Contact'),
    React.createElement('p', null, 'For inquiries, reach out at example@example.com.')
  );
}