import styled from '@emotion/styled';
import { theme } from '@/utils/theme';
import { useTelegram } from '@/hooks/useTelegram';
import { useState } from 'react';

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  padding: ${theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
  padding-top: ${theme.spacing.md};
`;

const Logo = styled.h1`
  font-size: ${theme.typography.h2.fontSize};
  font-weight: ${theme.typography.h2.fontWeight};
  color: ${theme.colors.accent};
  margin: 0;
`;

const UserGreeting = styled.div`
  text-align: right;
`;

const UserName = styled.div`
  font-size: ${theme.typography.bodyMedium.fontSize};
  font-weight: ${theme.typography.bodyMedium.fontWeight};
  color: ${theme.colors.textPrimary};
`;

const UserLocation = styled.div`
  font-size: ${theme.typography.small.fontSize};
  color: ${theme.colors.textSecondary};
  margin-top: 2px;
`;

const Banner = styled.div`
  background: ${theme.colors.accentGradient};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  color: white;
`;

const BannerTitle = styled.h2`
  font-size: ${theme.typography.h3.fontSize};
  font-weight: ${theme.typography.h3.fontWeight};
  margin-bottom: ${theme.spacing.sm};
`;

const BannerSubtitle = styled.p`
  font-size: ${theme.typography.body.fontSize};
  opacity: 0.9;
  margin: 0;
`;

const CategoriesSection = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.h4.fontSize};
  font-weight: ${theme.typography.h4.fontWeight};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.md};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
`;

const CategoryCard = styled.div`
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  text-align: center;
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.cardHover};
  }
`;

const CategoryIcon = styled.div`
  font-size: 32px;
  margin-bottom: ${theme.spacing.sm};
`;

const CategoryName = styled.div`
  font-size: ${theme.typography.smallMedium.fontSize};
  font-weight: ${theme.typography.smallMedium.fontWeight};
  color: ${theme.colors.textPrimary};
`;

const QuickDeliverySection = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
`;

const ProductCard = styled.div`
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.cardHover};
  }
`;

const ProductImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 160px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const DeliveryBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  background: ${theme.colors.accent};
  color: white;
  padding: 2px ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.caption.fontSize};
  font-weight: 600;
`;

const ProductInfo = styled.div`
  padding: ${theme.spacing.md};
`;

const ProductName = styled.div`
  font-size: ${theme.typography.smallMedium.fontSize};
  font-weight: ${theme.typography.smallMedium.fontWeight};
  color: ${theme.colors.textPrimary};
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductBrand = styled.div`
  font-size: ${theme.typography.caption.fontSize};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.sm};
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Price = styled.span`
  font-size: ${theme.typography.priceSmall.fontSize};
  font-weight: ${theme.typography.priceSmall.fontWeight};
  color: ${theme.colors.accent};
`;

const OldPrice = styled.span`
  font-size: ${theme.typography.small.fontSize};
  color: ${theme.colors.textSecondary};
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: ${theme.colors.error};
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
`;

export const HomePage = () => {
  const { user, isReady, hapticFeedback } = useTelegram();
  const [categories] = useState([
    { id: '1', name: 'Мужское', icon: '👔', slug: 'men' },
    { id: '2', name: 'Женское', icon: '👗', slug: 'women' },
    { id: '3', name: 'Аксессуары', icon: '👜', slug: 'accessories' },
  ]);

  const [quickProducts] = useState([
    {
      id: '1',
      name: 'Стильная футболка',
      brand: 'Urban Style',
      price: 2490,
      originalPrice: 3500,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      deliveryTime: '2-4 ч'
    },
    {
      id: '2',
      name: 'Джинсы Slim Fit',
      brand: 'Denim Co',
      price: 4990,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      deliveryTime: '1-3 ч'
    },
    {
      id: '3',
      name: 'Летнее платье',
      brand: 'Style Co',
      price: 3990,
      originalPrice: 5500,
      discount: 27,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      deliveryTime: '2-5 ч'
    },
    {
      id: '4',
      name: 'Кроссовки',
      brand: 'Sport Line',
      price: 6990,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      deliveryTime: '3-6 ч'
    }
  ]);

  const handleCategoryClick = (slug: string) => {
    hapticFeedback.light();
    // Navigate to category
    console.log('Navigate to category:', slug);
  };

  const handleProductClick = (id: string) => {
    hapticFeedback.light();
    // Navigate to product
    console.log('Navigate to product:', id);
  };

  if (!isReady) {
    return (
      <Container>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          color: theme.colors.accent
        }}>
          Загрузка Rail-X...
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Logo>Rail-X</Logo>
        <UserGreeting>
          <UserName>
            {user ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}` : 'Гость'}
          </UserName>
          <UserLocation>Москва, ЦАО</UserLocation>
        </UserGreeting>
      </Header>

      <Banner>
        <BannerTitle>Быстрая доставка за 2-10 часов</BannerTitle>
        <BannerSubtitle>Одежда без складов прямо от продавцов</BannerSubtitle>
      </Banner>

      <CategoriesSection>
        <SectionTitle>Категории</SectionTitle>
        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryCard 
              key={category.id} 
              onClick={() => handleCategoryClick(category.slug)}
            >
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesSection>

      <QuickDeliverySection>
        <SectionTitle>Быстрая доставка</SectionTitle>
        <ProductsGrid>
          {quickProducts.map((product) => (
            <ProductCard 
              key={product.id}
              onClick={() => handleProductClick(product.id)}
            >
              <ProductImage imageUrl={product.image}>
                <DeliveryBadge>{product.deliveryTime}</DeliveryBadge>
              </ProductImage>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductBrand>{product.brand}</ProductBrand>
                <ProductPrice>
                  <Price>{product.price.toLocaleString()} ₽</Price>
                  {product.originalPrice && (
                    <>
                      <OldPrice>{product.originalPrice.toLocaleString()} ₽</OldPrice>
                      <Discount>-{product.discount}%</Discount>
                    </>
                  )}
                </ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      </QuickDeliverySection>
    </Container>
  );
}; 