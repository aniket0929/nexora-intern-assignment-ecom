import { useState, useEffect } from 'react';
import { cartAPI, checkoutAPI } from '../services/api';
import CheckoutModal from '../components/CheckoutModal';
import './Cart.css';

function Cart({ onCartUpdate }) {
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      setCart(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await cartAPI.removeFromCart(itemId);
      await fetchCart();
      onCartUpdate();
    } catch (err) {
      alert('Failed to remove item');
      console.error(err);
    }
  };

  const handleCheckout = async (userData) => {
    try {
      const response = await checkoutAPI.checkout(userData, cart.items);
      setReceipt(response.data);
      setShowCheckout(false);
      // Clear cart after checkout
      setCart({ items: [], total: 0, count: 0 });
      onCartUpdate();
    } catch (err) {
      alert('Checkout failed');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (cart.items.length === 0 && !receipt) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/">Continue Shopping</a>
        </div>
      </div>
    );
  }

  if (receipt) {
    return (
      <div className="cart-container">
        <div className="receipt-container">
          <div className="receipt-success">
            <h2>✓ Order Placed Successfully!</h2>
            <p>Thank you for your purchase, {receipt.user.name}!</p>
            <button
              className="download-invoice-btn"
              onClick={() => downloadInvoice(receipt)}
            >
              Download Invoice
            </button>
            <button
              className="continue-shopping-btn"
              onClick={() => {
                setReceipt(null);
                window.location.href = '/';
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item._id} className="cart-item">
            <img
              src={item.productId?.image || 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product-quote.png'}
              alt={item.productId?.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.productId?.name}</h3>
              <p>₹{item.productId?.price.toLocaleString()} each</p>
              <p>Quantity: {item.qty}</p>
              <p className="item-subtotal">
                Subtotal: ₹{(item.productId?.price * item.qty).toLocaleString()}
              </p>
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemove(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <h2>Total: ₹{cart.total.toLocaleString()}</h2>
        </div>
        <button
          className="checkout-btn"
          onClick={() => setShowCheckout(true)}
        >
          Proceed to Checkout
        </button>
      </div>

      {showCheckout && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}

function downloadInvoice(receipt) {
  const invoiceContent = `
INVOICE
====================
Order Date: ${new Date(receipt.timestamp).toLocaleString()}

Customer Details:
Name: ${receipt.user.name}
Email: ${receipt.user.email}

Items:
${receipt.items.map(item => 
  `${item.name} - Qty: ${item.qty} - ₹${item.price.toLocaleString()} each - Subtotal: ₹${item.subtotal.toLocaleString()}`
).join('\n')}

====================
Total: ₹${receipt.total.toLocaleString()}

Thank you for your purchase!
  `.trim();

  const blob = new Blob([invoiceContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `invoice-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default Cart;


