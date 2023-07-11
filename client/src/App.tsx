import { useState } from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Layout } from 'antd';
import AppRouter from './components/AppRouter/AppRouter';
import Paralax from './components/Paralax/Paralax';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Layout className="layout">
        <Navbar />
        <AppRouter />
      </Layout>
      <Paralax />
    </>
  );
}

export default App;
