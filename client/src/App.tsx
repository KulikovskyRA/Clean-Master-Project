import { useState } from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Layout } from 'antd';
import AppRouter from './components/AppRouter/AppRouter';
import Paralax from './components/Paralax/Paralax';

function App() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
