// File: pages/checkout.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCart(res.data)).catch(console.error);
  }, []);

  const handleOrder = async () => {
    const token = localStorage.getItem('token');
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      const orderRes = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
        shipping_address: shippingAddress
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments`, {
        order_id: orderRes.data.order_id,
        amount: totalAmount,
        method: 'COD'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Order placed successfully!');
      router.push('/');
    } catch (err) {
      alert('Order failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 Checkout</h1>
      <textarea
        placeholder="Enter shipping address"
        value={shippingAddress}
        onChange={e => setShippingAddress(e.target.value)}
        rows={4} style={{ width: '100%' }}
      /><br /><br />
      <h3>Total: ৳{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h3>
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
}