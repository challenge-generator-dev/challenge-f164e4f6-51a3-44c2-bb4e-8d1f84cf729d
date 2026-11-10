import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  // Props del componente si las hay
}

const HomePage: React.FC<HomePageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <div className="home-page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Sistema de Gestión de Inventario</h1>
        <p style={{ color: '#666' }}>Bienvenido al panel de control</p>
        <small style={{ color: '#999' }}>Hora actual: {currentTime}</small>
      </header>

      <nav style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', transition: 'box-shadow 0.2s' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Gestión de Productos</h2>
          <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>Administra el catálogo de productos disponibles en el inventario.</p>
          <Link 
            to="/products" 
            style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: '#1976d2', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: '500' }}
          >
            Ir a Productos
          </Link>
        </div>

        <div className="card" style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', transition: 'box-shadow 0.2s' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Gestión de Pedidos</h2>
          <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>Visualiza y gestiona los pedidos de los clientes.</p>
          <Link 
            to="/orders" 
            style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: '#388e3c', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: '500' }}
          >
            Ir a Pedidos
          </Link>
        </div>
      </nav>

      <section style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Información del Sistema</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: '#555' }}>
          <li style={{ marginBottom: '0.5rem' }}>Base de datos SQL: Gestión de productos</li>
          <li style={{ marginBottom: '0.5rem' }}>Base de datos NoSQL: Gestión de pedidos</li>
          <li style={{ marginBottom: '0.5rem' }}>Interfaz RESTful para operaciones CRUD</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;