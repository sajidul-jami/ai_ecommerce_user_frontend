// File: pages/login.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🔐 Login</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}