// File: pages/cart.js
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCart(res.data)).catch(err => console.error(err));
  }, []);

  const removeItem = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCart(cart.filter(item => item.cart_item_id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Your Cart</h1>
      {cart.map(item => (
        <div key={item.cart_item_id} style={{ marginBottom: 20 }}>
          <h3>{item.name}</h3>
          <p>৳ {item.price} x {item.quantity}</p>
          <button onClick={() => removeItem(item.cart_item_id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}