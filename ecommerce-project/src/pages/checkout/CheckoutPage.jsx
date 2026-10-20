import axios from 'axios';
import { useState, useEffect } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './checkout-header.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const deliveryResponse = await axios.get(
          '/api/delivery-options?expand=estimatedDeliveryTime'
        );
        setDeliveryOptions(deliveryResponse.data);
   
        const paymentResponse = await axios.get('/api/payment-summary');
        setPaymentSummary(paymentResponse.data);
      } catch (error) {
        console.error("Failed to load checkout data", error);
      }
    };

    fetchCheckoutData();
  }, []); // Run only once on mount! (Or use cart.length if you need it to refresh on change)

  // Calculate total items dynamically instead of hardcoding "3 items"
  const totalItemsCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              {totalItemsCount} items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary 
            cart={cart} 
            deliveryOptions={deliveryOptions}
            loadCart={loadCart} 
          />

          {/* Only render PaymentSummary when data is ready to prevent NaN crashes */}
          {paymentSummary && (
            <PaymentSummary 
              paymentSummary={paymentSummary} 
              loadCart={loadCart} 
            />
          )}
        </div>
      </div>
    </>
  );
}