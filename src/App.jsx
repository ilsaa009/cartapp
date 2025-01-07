import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Layout, ProductDescription } from './router';



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <Layout>
              <ProductDescription />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
