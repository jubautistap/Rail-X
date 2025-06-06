import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { ProfilePage } from './pages/ProfilePage';
import { BottomNavigation } from './components/navigation/BottomNavigation';
import { TelegramProvider } from './providers/TelegramProvider';

export const App = () => {
  return (
    <TelegramProvider>
      <Router>
        <GlobalStyles />
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#1e1e1e',
          paddingBottom: '80px' // Space for bottom navigation
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/search" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<CatalogPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <BottomNavigation />
        </div>
      </Router>
    </TelegramProvider>
  );
}; 