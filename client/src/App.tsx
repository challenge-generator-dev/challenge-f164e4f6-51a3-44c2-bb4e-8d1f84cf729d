import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProductPage from '@/pages/ProductPage';
import OrderPage from '@/pages/OrderPage';

// HomePage se carga de forma lazy para optimizar el rendimiento inicial
const HomePage = lazy(() => import('@/pages/HomePage'));

const App = () => {
  return (
    <div className="app-container">
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;