import React from 'react';
import ProductItem from './ProductItem';

const ProductsList = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return <p className="empty">Товары отсутствуют</p>;
  }

  return (
    <div className="list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductsList;