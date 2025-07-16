// File: pages/register.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, form);
      router.push('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 Register</h1>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><br />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /><br />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /><br />
      <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /><br />
      <input placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /><br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}