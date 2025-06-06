import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTelegram } from '../hooks/useTelegram';

const Container = styled.div`
  padding: 20px;
  background-color: #1e1e1e;
  min-height: 100vh;
  color: #ffffff;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #ffffff;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 16px;
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border-color: #64DDA0;
  }

  &::placeholder {
    color: #b0b0b0;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
`;

const FilterChip = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#64DDA0' : '#2a2a2a'};
  color: ${props => props.active ? '#1e1e1e' : '#ffffff'};
  border: none;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ProductCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #3a3a3a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0b0b0;
`;

const ProductInfo = styled.div`
  padding: 12px;
`;

const ProductName = styled.h3`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #ffffff;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #64DDA0;
  margin-bottom: 4px;
`;

const ProductDelivery = styled.p`
  font-size: 12px;
  color: #b0b0b0;
`;

export const CatalogPage: React.FC = () => {
  const { webApp } = useTelegram();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    webApp?.setHeaderColor('#1e1e1e');
    webApp?.setBackgroundColor('#1e1e1e');
  }, [webApp]);

  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'men', label: 'Мужское' },
    { id: 'women', label: 'Женское' },
    { id: 'accessories', label: 'Аксессуары' },
    { id: 'fast', label: 'Быстрая доставка' },
  ];

  // Мок данные товаров
  const products = [
    { id: 1, name: 'Oversized толстовка', price: 2490, delivery: '2-4 часа' },
    { id: 2, name: 'Джинсы slim', price: 3990, delivery: '3-6 часов' },
    { id: 3, name: 'Кроссовки Air', price: 8990, delivery: '1-3 часа' },
    { id: 4, name: 'Рубашка классик', price: 2890, delivery: '4-8 часов' },
    { id: 5, name: 'Куртка bomber', price: 5490, delivery: '2-5 часов' },
    { id: 6, name: 'Футболка базовая', price: 990, delivery: '1-2 часа' },
  ];

  return (
    <Container>
      <Header>
        <Title>Каталог</Title>
        <SearchBar
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Header>

      <FiltersContainer>
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </FilterChip>
        ))}
      </FiltersContainer>

      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage>
              📷 Фото
            </ProductImage>
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price.toLocaleString()} ₽</ProductPrice>
              <ProductDelivery>🚚 {product.delivery}</ProductDelivery>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
}; 