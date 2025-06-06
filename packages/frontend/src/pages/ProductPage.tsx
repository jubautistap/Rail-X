import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTelegram } from '../hooks/useTelegram';

const Container = styled.div`
  background-color: #1e1e1e;
  min-height: 100vh;
  color: #ffffff;
`;

const ImageGallery = styled.div`
  height: 400px;
  background-color: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0b0b0;
  font-size: 18px;
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #ffffff;
`;

const ProductBrand = styled.p`
  font-size: 16px;
  color: #b0b0b0;
  margin-bottom: 16px;
`;

const ProductPrice = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #64DDA0;
  margin-bottom: 16px;
`;

const DeliveryInfo = styled.div`
  background-color: #2a2a2a;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const DeliveryTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
`;

const DeliveryTime = styled.p`
  font-size: 14px;
  color: #64DDA0;
  margin-bottom: 4px;
`;

const SizeSelector = styled.div`
  margin-bottom: 20px;
`;

const SizeTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
`;

const SizeGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const SizeButton = styled.button<{ selected?: boolean }>`
  padding: 12px 16px;
  background-color: ${props => props.selected ? '#64DDA0' : '#2a2a2a'};
  color: ${props => props.selected ? '#1e1e1e' : '#ffffff'};
  border: 1px solid ${props => props.selected ? '#64DDA0' : '#3a3a3a'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
`;

const Description = styled.div`
  margin-bottom: 20px;
`;

const DescriptionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #b0b0b0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1e1e1e;
  border-top: 1px solid #3a3a3a;
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 16px;
  background-color: #2a2a2a;
  color: #ffffff;
  border: 1px solid #64DDA0;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const BuyNowButton = styled.button`
  flex: 2;
  padding: 16px;
  background: linear-gradient(135deg, #64DDA0 0%, #4ECDC4 100%);
  color: #1e1e1e;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { webApp } = useTelegram();
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    // Настройка темы для Telegram WebApp
    if (webApp) {
      (webApp as any).setHeaderColor?.('#1e1e1e');
      (webApp as any).setBackgroundColor?.('#1e1e1e');
    }
  }, [webApp]);

  // Мок данные товара
  const product = {
    id: Number(id),
    name: 'Oversized толстовка премиум',
    brand: 'Street Brand',
    price: 2490,
    delivery: '2-4 часа',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Стильная oversized толстовка из премиального хлопка. Идеально подходит для создания современного городского образа. Мягкая текстура и удобный крой обеспечивают максимальный комфорт.',
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Выберите размер');
      return;
    }
    // Добавление в корзину
    console.log('Добавлено в корзину:', { productId: id, size: selectedSize });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Выберите размер');
      return;
    }
    // Быстрая покупка
    console.log('Быстрая покупка:', { productId: id, size: selectedSize });
  };

  return (
    <Container>
      <ImageGallery>
        📷 Галерея фото товара
      </ImageGallery>

      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductBrand>{product.brand}</ProductBrand>
        <ProductPrice>{product.price.toLocaleString()} ₽</ProductPrice>

        <DeliveryInfo>
          <DeliveryTitle>🚚 Доставка</DeliveryTitle>
          <DeliveryTime>{product.delivery}</DeliveryTime>
          <p style={{ fontSize: '12px', color: '#b0b0b0' }}>
            Курьерская доставка по Москве
          </p>
        </DeliveryInfo>

        <SizeSelector>
          <SizeTitle>Размер</SizeTitle>
          <SizeGrid>
            {product.sizes.map((size) => (
              <SizeButton
                key={size}
                selected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </SizeButton>
            ))}
          </SizeGrid>
        </SizeSelector>

        <Description>
          <DescriptionTitle>Описание</DescriptionTitle>
          <DescriptionText>{product.description}</DescriptionText>
        </Description>
      </ProductInfo>

      <ActionButtons>
        <AddToCartButton onClick={handleAddToCart}>
          В корзину
        </AddToCartButton>
        <BuyNowButton onClick={handleBuyNow}>
          Купить сейчас
        </BuyNowButton>
      </ActionButtons>
    </Container>
  );
}; 