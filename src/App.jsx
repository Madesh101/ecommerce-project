import axios from 'axios';
import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import { HomePage } from './Pages/home/HomePage';
import { CheckoutPage } from './Pages/checkout/CheckoutPage';
import { OrdersPage } from './Pages/orders/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage';
import './App.css'


function App() {
  const [cart, setCart] = useState([]);
const loadCart = async () => {
  try {
    const response = await axios.get(
      'https://ecommerce-project-5oie.onrender.com/api/cart-items?expand=product'
    );
    setCart(response.data);
  } catch (error) {
    console.error("Error loading cart:", error);
  }
};

  useEffect(() => {

    loadCart();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>

  )
}

export default App
