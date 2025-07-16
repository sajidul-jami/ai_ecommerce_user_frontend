// File: pages/product/[id].js
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`, {
        product_id: product.product_id,
        quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Added to cart');
    } catch (err) {
      alert('Please login first');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <img src={product.image_url} alt={product.name} style={{ width: 300 }} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h3>৳ {product.price}</h3>
      <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} min={1} />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}