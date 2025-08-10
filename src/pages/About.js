import React from 'react';

export default function About() {
  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement('h1', { className: 'mb-3' }, 'About'),
    React.createElement(
      'p',
      null,
      'This React news app showcases functional components, hooks, routing, theming, and responsive Bootstrap UI.'
    ),
    React.createElement('p', null, 'Data is fetched from NewsAPI.')
  );
}