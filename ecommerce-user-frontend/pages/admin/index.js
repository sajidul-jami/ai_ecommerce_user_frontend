// File: pages/admin/index.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/products`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>✅ Admin Dashboard</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.product_id}>
              <td>{p.product_id}</td>
              <td>{p.name}</td>
              <td>৳ {p.price}</td>
              <td>{p.stock_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
