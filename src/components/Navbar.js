import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const categories = [
  { key: 'general', label: 'General' },
  { key: 'business', label: 'Business' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'health', label: 'Health' },
  { key: 'science', label: 'Science' },
  { key: 'sports', label: 'Sports' },
  { key: 'technology', label: 'Technology' },
];

export default function Navbar({
  isDarkMode,
  onToggleDarkMode,
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearchChange(localQuery.trim());
    if (location.pathname !== '/') navigate('/');
  }

  return React.createElement(
    'nav',
    { className: `navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} shadow-sm` },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(Link, { to: '/', className: 'navbar-brand' }, 'ReactNews'),
      React.createElement(
        'button',
        {
          className: 'navbar-toggler',
          type: 'button',
          'data-bs-toggle': 'collapse',
          'data-bs-target': '#navContent',
          'aria-controls': 'navContent',
          'aria-expanded': 'false',
          'aria-label': 'Toggle navigation',
        },
        React.createElement('span', { className: 'navbar-toggler-icon' })
      ),
      React.createElement(
        'div',
        { id: 'navContent', className: 'collapse navbar-collapse' },
        React.createElement(
          'ul',
          { className: 'navbar-nav me-auto mb-2 mb-lg-0' },
          React.createElement(
            'li',
            { className: 'nav-item' },
            React.createElement(NavLink, { end: true, className: 'nav-link', to: '/' }, 'Home')
          ),
          React.createElement(
            'li',
            { className: 'nav-item' },
            React.createElement(NavLink, { className: 'nav-link', to: '/about' }, 'About')
          ),
          React.createElement(
            'li',
            { className: 'nav-item' },
            React.createElement(NavLink, { className: 'nav-link', to: '/contact' }, 'Contact')
          ),
          React.createElement(
            'li',
            { className: 'nav-item dropdown' },
            React.createElement(
              'span',
              { className: 'nav-link dropdown-toggle', role: 'button', 'data-bs-toggle': 'dropdown', 'aria-expanded': 'false' },
              (categories.find(c => c.key === category) || {}).label || 'Category'
            ),
            React.createElement(
              'ul',
              { className: `dropdown-menu ${isDarkMode ? 'dropdown-menu-dark' : ''}` },
              categories.map(c =>
                React.createElement(
                  'li',
                  { key: c.key },
                  React.createElement(
                    'button',
                    {
                      className: 'dropdown-item',
                      onClick: () => {
                        onCategoryChange(c.key);
                        if (location.pathname !== '/') navigate('/');
                      },
                    },
                    c.label
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          'form',
          { className: 'd-flex mb-2 mb-lg-0 me-2', onSubmit: handleSubmit, role: 'search' },
          React.createElement('input', {
            className: 'form-control me-2',
            type: 'search',
            placeholder: 'Search news...',
            value: localQuery,
            onChange: e => setLocalQuery(e.target.value),
          }),
          React.createElement('button', { className: 'btn btn-outline-primary', type: 'submit' }, 'Search')
        ),
        React.createElement(
          'div',
          { className: 'form-check form-switch' },
          React.createElement('input', {
            className: 'form-check-input',
            type: 'checkbox',
            id: 'darkModeSwitch',
            checked: isDarkMode,
            onChange: onToggleDarkMode,
          }),
          React.createElement('label', { className: 'form-check-label', htmlFor: 'darkModeSwitch' }, isDarkMode ? 'Dark' : 'Light')
        )
      )
    )
  );
}