import React, { useState, useEffect } from 'react';
import './ProductModal.scss';

const ProductModal = ({ open, mode, initialProduct, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (!open) return;
    
    if (initialProduct) {
      setTitle(initialProduct.title || "");
      setSubtitle(initialProduct.subtitle || "");
      setPrice(initialProduct.price?.toString() || "");
      setRating(initialProduct.rating?.toString() || "");
    } else {
      setTitle("");
      setSubtitle("");
      setPrice("");
      setRating("");
    }
  }, [open, initialProduct]);

  if (!open) return null;

  const titleText = mode === "edit" ? "Редактировать товар" : "Создать товар";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Введите название товара");
      return;
    }
    if (!subtitle.trim()) {
      alert("Введите производителя");
      return;
    }
    if (!price.trim()) {
      alert("Введите цену");
      return;
    }
    if (!rating.trim()) {
      alert("Введите рейтинг");
      return;
    }

    onSubmit({
      title: title.trim(),
      subtitle: subtitle.trim(),
      price: Number(price),
      rating: Number(rating)
    });
  };

  return (
    <div className="backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__title">{titleText}</div>
          <button className="iconBtn" onClick={onClose}>✕</button>
        </div>
        
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Название
            <input 
              className="input" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Пудра..."
              autoFocus
            />
          </label>
          
          <label className="label">
            Производитель
            <input 
              className="input" 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Influence..."
            />
          </label>
          
          <label className="label">
            Цена (₽)
            <input 
              className="input" 
              type="number"
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1999"
              min="0"
            />
          </label>
          
          <label className="label">
            Рейтинг (0-5)
            <input 
              className="input" 
              type="number"
              value={rating} 
              onChange={(e) => setRating(e.target.value)}
              placeholder="4.8"
              min="0"
              max="5"
              step="0.1"
            />
          </label>

          <div className="modal__footer">
            <button type="button" className="btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              {mode === "edit" ? "Сохранить" : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;