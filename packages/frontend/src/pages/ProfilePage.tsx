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

const UserInfo = styled.div`
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: #64DDA0;
  border-radius: 50%;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const UserName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
`;

const MenuItem = styled.div`
  background-color: #2a2a2a;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const MenuText = styled.span`
  font-size: 16px;
  color: #ffffff;
`;

const MenuIcon = styled.span`
  color: #b0b0b0;
`;

export const ProfilePage: React.FC = () => {
  return (
    <Container>
      <Title>Профиль</Title>
      
      <UserInfo>
        <Avatar>👤</Avatar>
        <UserName>Пользователь</UserName>
      </UserInfo>

      <MenuItem>
        <MenuText>📦 История заказов</MenuText>
        <MenuIcon>›</MenuIcon>
      </MenuItem>

      <MenuItem>
        <MenuText>❤️ Избранное</MenuText>
        <MenuIcon>›</MenuIcon>
      </MenuItem>

      <MenuItem>
        <MenuText>📍 Адреса доставки</MenuText>
        <MenuIcon>›</MenuIcon>
      </MenuItem>

      <MenuItem>
        <MenuText>🔔 Уведомления</MenuText>
        <MenuIcon>›</MenuIcon>
      </MenuItem>

      <MenuItem>
        <MenuText>🆘 Поддержка</MenuText>
        <MenuIcon>›</MenuIcon>
      </MenuItem>
    </Container>
  );
}; 