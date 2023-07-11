import { useState } from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Layout } from 'antd';
import AppRouter from './components/AppRouter/AppRouter';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <Navbar />
        <AppRouter />
      </Layout>
    </>
  );
}

export default App;
