import React from 'react';
import './ProductItem.scss';

const ProductItem = ({ product, onEdit, onDelete }) => {
  const { id, title, subtitle, price, rating } = product;

  return (
    <div className="card-container">
      <div className="card-content">
        <img 
          src="/images/default.png" 
          alt={title} 
          className="card-photo"
        />
        <div className="text-content">
          <div className="price_rating">
            <h1 className="price">{price} ₽</h1>
            <div className="rating_group">
              <h1 className="rating">{rating}</h1>
              <img src="/images/star.png" alt="rating" className="star" />
            </div>
          </div>
          <div className="dop_inf">
            <h3 className="title">{title}</h3>
            <h3 className="subtitle">{subtitle}</h3>
          </div>
          <div className="buttons">
            <button className="btn-edit" onClick={() => onEdit(product)}>
              Изменить
            </button>
            <button className="btn-edit" onClick={() => onDelete(id)}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;