import { useState, useEffect } from 'react';
import { productAPI, cartAPI } from '../services/api';
import './Products.css';

function Products({ onCartUpdate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts(page, 20);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Make sure the backend is running on http://localhost:3000');
      } else {
        setError(err.response?.data?.msg || 'Failed to load products');
      }
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await cartAPI.addToCart(productId, 1);
      onCartUpdate();
      alert('Product added to cart!');
    } catch (err) {
      alert('Failed to add product to cart');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="products-container">
      <h1>Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product-quote.png';
              }}
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price.toLocaleString()}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => fetchProducts(pagination.page - 1)}
            disabled={!pagination.hasPrev}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => fetchProducts(pagination.page + 1)}
            disabled={!pagination.hasNext}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;

