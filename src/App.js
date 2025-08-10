import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('general');

  const themeClass = isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark';

  return React.createElement(
    Router,
    null,
    React.createElement(
      'div',
      { className: themeClass, style: { minHeight: '100vh' } },
      React.createElement(Navbar, {
        isDarkMode,
        onToggleDarkMode: () => setIsDarkMode(!isDarkMode),
        searchQuery,
        onSearchChange: setSearchQuery,
        category,
        onCategoryChange: setCategory,
      }),
      React.createElement(
        'div',
        { className: 'container py-4' },
        React.createElement(
          Routes,
          null,
          React.createElement(Route, {
            path: '/',
            element: React.createElement(Home, { searchQuery, category }),
          }),
          React.createElement(Route, { path: '/about', element: React.createElement(About) }),
          React.createElement(Route, { path: '/contact', element: React.createElement(Contact) })
        )
      )
    )
  );
}