import { useState } from 'react';
import { Product } from './Product';

export function ProductsGrid({products, loadCart}) {
  const {quantity, setQuantity} = useState(1);

  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
         <Product key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}
