import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { cartAPI, authAPI } from './services/api';
import './App.css';

const CartContext = createContext();
const AuthContext = createContext();

export const useCart = () => useContext(CartContext);
export const useAuth = () => useContext(AuthContext);

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  const fetchCartCount = async () => {
    try {
      const response = await cartAPI.getCart();
      setCartCount(response.data.count || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartCount(0);
    }
  };

  const loadUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/';
    }
  };

  useEffect(() => {
    loadUser();
    fetchCartCount();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      <CartContext.Provider value={{ cartCount, updateCart: fetchCartCount }}>
        <Router>
          <Navbar cartCount={cartCount} user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Products onCartUpdate={fetchCartCount} />} />
            <Route path="/cart" element={<Cart onCartUpdate={fetchCartCount} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

function Navbar({ cartCount, user, onLogout }) {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Nexora Fashion
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Products
          </Link>
          <Link to="/cart" className={`cart-link ${location.pathname === '/cart' ? 'active' : ''}`}>
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          {user ? (
            <>
              <span className="user-name">Hello, {user.name}</span>
              <button onClick={onLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                Login
              </Link>
              <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default App;
