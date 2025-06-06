import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #1e1e1e;
  min-height: 100vh;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #ffffff;
`;

const CartItem = styled.div`
  background-color: #2a2a2a;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  gap: 12px;
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #3a3a3a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0b0b0;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #ffffff;
`;

const ItemPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #64DDA0;
`;

const Total = styled.div`
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
`;

const TotalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
`;

const TotalAmount = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #64DDA0;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #64DDA0 0%, #4ECDC4 100%);
  color: #1e1e1e;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
`;

export const CartPage: React.FC = () => {
  const cartItems = [
    { id: 1, name: 'Oversized толстовка', price: 2490, size: 'L' },
    { id: 2, name: 'Джинсы slim', price: 3990, size: 'M' },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Container>
      <Title>Корзина</Title>
      
      {cartItems.map((item) => (
        <CartItem key={item.id}>
          <ItemImage>📷</ItemImage>
          <ItemInfo>
            <ItemName>{item.name}</ItemName>
            <p style={{ color: '#b0b0b0', fontSize: '14px' }}>Размер: {item.size}</p>
            <ItemPrice>{item.price.toLocaleString()} ₽</ItemPrice>
          </ItemInfo>
        </CartItem>
      ))}

      <Total>
        <TotalTitle>Итого</TotalTitle>
        <TotalAmount>{total.toLocaleString()} ₽</TotalAmount>
      </Total>

      <CheckoutButton>
        Оформить заказ
      </CheckoutButton>
    </Container>
  );
}; 