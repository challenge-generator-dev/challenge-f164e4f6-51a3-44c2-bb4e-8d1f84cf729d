import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface ProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

interface ProductEntity extends ProductDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3000';

export default function ProductPage() {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductEntity | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const [formData, setFormData] = useState<ProductDto>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<ProductEntity[]>(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(message);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);
      
      if (editingProduct) {
        const response = await axios.put<ProductEntity>(
          `${API_BASE_URL}/products/${editingProduct.id}`,
          formData
        );
        setProducts(prev => 
          prev.map(p => p.id === editingProduct.id ? response.data : p)
        );
        setSuccess('Producto actualizado correctamente');
      } else {
        const response = await axios.post<ProductEntity>(
          `${API_BASE_URL}/products`,
          formData
        );
        setProducts(prev => [...prev, response.data]);
        setSuccess('Producto creado correctamente');
      }
      
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar producto';
      setError(message);
      console.error('Error saving product:', err);
    }
  };

  const handleEdit = (product: ProductEntity) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category
    });
    setIsFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este producto?')) {
      return;
    }
    
    try {
      setError(null);
      setSuccess(null);
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      setSuccess('Producto eliminado correctamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar producto';
      setError(message);
      console.error('Error deleting product:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: ''
    });
    setEditingProduct(null);
    setIsFormVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="page-header">
        <h2>Gestión de Productos</h2>
        <button 
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="btn btn-primary"
        >
          {isFormVisible ? 'Cancelar' : 'Nuevo Producto'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {isFormVisible && (
        <div className="form-container">
          <h3>{editingProduct ? 'Editar Producto' : 'Crear Producto'}</h3>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Ingrese el nombre del producto"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Ingrese la descripción del producto"
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Precio</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="Ingrese la categoría"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingProduct ? 'Actualizar' : 'Crear'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-list">
        <h3>Lista de Productos ({products.length})</h3>
        {products.length === 0 ? (
          <p className="empty-message">No hay productos registrados</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td className="actions">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="btn btn-edit"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-delete"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .page-header h2 {
          font-size: 1.8rem;
          color: #2c3e50;
        }
        
        .form-container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .form-container h3 {
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        
        .product-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-weight: 500;
          color: #34495e;
        }
        
        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3498db;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .btn-primary {
          background-color: #3498db;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #2980b9;
        }
        
        .btn-secondary {
          background-color: #95a5a6;
          color: white;
        }
        
        .btn-secondary:hover {
          background-color: #7f8c8d;
        }
        
        .btn-edit {
          background-color: #f39c12;
          color: white;
          padding: 0.5rem 1rem;
          margin-right: 0.5rem;
        }
        
        .btn-delete {
          background-color: #e74c3c;
          color: white;
          padding: 0.5rem 1rem;
        }
        
        .products-list {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .products-list h3 {
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        
        .products-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .products-table th,
        .products-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .products-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .products-table tbody tr:hover {
          background-color: #f8f9fa;
        }
        
        .actions {
          display: flex;
        }
        
        .empty-message {
          text-align: center;
          color: #7f8c8d;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}