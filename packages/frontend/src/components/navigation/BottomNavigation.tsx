import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #2a2a2a;
  border-top: 1px solid #3a3a3a;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  z-index: 1000;
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  color: ${props => props.active ? '#64DDA0' : '#b0b0b0'};
  cursor: pointer;
  transition: color 0.3s ease;
`;

const NavIcon = styled.span`
  font-size: 24px;
`;

const NavLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
`;

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Главная' },
    { path: '/catalog', icon: '🔍', label: 'Поиск' },
    { path: '/favorites', icon: '❤️', label: 'Избранное' },
    { path: '/cart', icon: '🛒', label: 'Корзина' },
    { path: '/profile', icon: '👤', label: 'Профиль' },
  ];

  return (
    <NavigationContainer>
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        >
          <NavIcon>{item.icon}</NavIcon>
          <NavLabel>{item.label}</NavLabel>
        </NavItem>
      ))}
    </NavigationContainer>
  );
}; 