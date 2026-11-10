import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface OrderItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

interface OrderDto {
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItemDto[];
  shippingAddress: string;
}

interface OrderItemEntity extends OrderItemDto {
  id: string;
}

interface OrderEntity extends OrderDto {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3000';

export default function OrderPage() {
  const [orders, setOrders] = useState<OrderEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<OrderEntity | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const [formData, setFormData] = useState<OrderDto>({
    customerId: '',
    customerName: '',
    customerEmail: '',
    items: [{ productId: '', quantity: 1, unitPrice: 0 }],
    shippingAddress: ''
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<OrderEntity[]>(`${API_BASE_URL}/orders`);
      setOrders(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar pedidos';
      setError(message);
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);
      
      const validItems = formData.items.filter(
        item => item.productId && item.quantity > 0 && item.unitPrice > 0
      );
      
      if (validItems.length === 0) {
        setError('Debe agregar al menos un producto al pedido');
        return;
      }

      if (editingOrder) {
        const response = await axios.put<OrderEntity>(
          `${API_BASE_URL}/orders/${editingOrder.id}`,
          { ...formData, items: validItems }
        );
        setOrders(prev => 
          prev.map(o => o.id === editingOrder.id ? response.data : o)
        );
        setSuccess('Pedido actualizado correctamente');
      } else {
        const response = await axios.post<OrderEntity>(
          `${API_BASE_URL}/orders`,
          { ...formData, items: validItems }
        );
        setOrders(prev => [...prev, response.data]);
        setSuccess('Pedido creado correctamente');
      }
      
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar pedido';
      setError(message);
      console.error('Error saving order:', err);
    }
  };

  const handleEdit = (order: OrderEntity) => {
    setEditingOrder(order);
    setFormData({
      customerId: order.customerId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      items: order.items.length > 0 ? order.items : [{ productId: '', quantity: 1, unitPrice: 0 }],
      shippingAddress: order.shippingAddress
    });
    setIsFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este pedido?')) {
      return;
    }
    
    try {
      setError(null);
      setSuccess(null);
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
      setOrders(prev => prev.filter(o => o.id !== id));
      setSuccess('Pedido eliminado correctamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar pedido';
      setError(message);
      console.error('Error deleting order:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      customerId: '',
      customerName: '',
      customerEmail: '',
      items: [{ productId: '', quantity: 1, unitPrice: 0 }],
      shippingAddress: ''
    });
    setEditingOrder(null);
    setIsFormVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index: number, field: keyof OrderItemDto, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index 
          ? { ...item, [field]: typeof value === 'string' ? value : value }
          : item
      )
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      pending: '#f39c12',
      processing: '#3498db',
      shipped: '#9b59b6',
      delivered: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#7f8c8d';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="page-header">
        <h2>Gestión de Pedidos</h2>
        <button 
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="btn btn-primary"
        >
          {isFormVisible ? 'Cancelar' : 'Nuevo Pedido'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {isFormVisible && (
        <div className="form-container">
          <h3>{editingOrder ? 'Editar Pedido' : 'Crear Pedido'}</h3>
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-section">
              <h4>Información del Cliente</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customerId">ID Cliente</label>
                  <input
                    type="text"
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleInputChange}
                    required
                    placeholder="ID del cliente"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerName">Nombre</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Nombre del cliente"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="customerEmail">Email</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="email@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="shippingAddress">Dirección de Envío</label>
                <textarea
                  id="shippingAddress"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="Dirección completa"
                  rows={2}
                />
              </div>
            </div>

            <div className="form-section">
              <h4>Productos del Pedido</h4>
              {formData.items.map((item, index) => (
                <div key={index} className="item-row">
                  <div className="form-group">
                    <label>ID Producto</label>
                    <input
                      type="text"
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      required
                      placeholder="ID del producto"
                    />
                  </div>
                  <div className="form-group">
                    <label>Cantidad</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      required
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Precio Unitario</label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeItem(index)}
                    className="btn btn-remove"
                    disabled={formData.items.length <= 1}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button type="button" onClick={addItem} className="btn btn-secondary">
                + Agregar Producto
              </button>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingOrder ? 'Actualizar' : 'Crear'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="orders-list">
        <h3>Lista de Pedidos ({orders.length})</h3>
        {orders.length === 0 ? (
          <p className="empty-message">No hay pedidos registrados</p>
        ) : (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Pedido #{order.id}</span>
                  <span 
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
                
                <div className="order-body">
                  <div className="order-info">
                    <strong>Cliente:</strong> {order.customerName}
                  </div>
                  <div className="order-info">
                    <strong>Email:</strong> {order.customerEmail}
                  </div>
                  <div className="order-info">
                    <strong>Dirección:</strong> {order.shippingAddress}
                  </div>
                  <div className="order-info">
                    <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                  </div>
                  <div className="order-info">
                    <strong>Fecha:</strong> {formatDate(order.createdAt)}
                  </div>
                  <div className="order-items">
                    <strong>Productos ({order.items.length}):</strong>
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          Producto: {item.productId} | Cant: {item.quantity} | ${item.unitPrice.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="order-actions">
                  <button 
                    onClick={() => handleEdit(order)}
                    className="btn btn-edit"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(order.id)}
                    className="btn btn-delete"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
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
        
        .form-section {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
        }
        
        .form-section h4 {
          margin-bottom: 1rem;
          color: #34495e;
        }
        
        .order-form {
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
        
        .item-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap: 1rem;
          align-items: end;
          margin-bottom: 1rem;
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
        
        .btn-remove {
          background-color: #e74c3c;
          color: white;
          padding: 0.75rem;
          font-size: 1.2rem;
          line-height: 1;
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
        
        .orders-list {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .orders-list h3 {
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        
        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        
        .order-card {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #f8f9fa;
          border-bottom: 1px solid #eee;
        }
        
        .order-id {
          font-weight: 600;
          color: #2c3e50;
        }
        
        .order-status {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          color: white;
          font-size: 0.85rem;
          text-transform: capitalize;
        }
        
        .order-body {
          padding: 1rem;
        }
        
        .order-info {
          margin-bottom: 0.5rem;
          color: #555;
        }
        
        .order-items {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }
        
        .order-items ul {
          margin-top: 0.5rem;
          padding-left: 1.5rem;
        }
        
        .order-actions {
          display: flex;
          padding: 1rem;
          border-top: 1px solid #eee;
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