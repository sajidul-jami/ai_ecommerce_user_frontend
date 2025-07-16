// File: pages/index.js
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🛍️ Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {products.map(p => (
          <div key={p.product_id} style={{ border: '1px solid #ccc', padding: 20, width: 200 }}>
            <img src={p.image_url} alt={p.name} style={{ width: '100%' }} />
            <h3>{p.name}</h3>
            <p>৳ {p.price}</p>
            <Link href={`/product/${p.product_id}`}><button>View</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}