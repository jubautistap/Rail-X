// Дизайн-система Rail-X согласно ТЗ
export const theme = {
  colors: {
    // Основные цвета
    background: '#1e1e1e',        // матовый черный
    accent: '#64DDA0',            // фирменный мятный
    textPrimary: '#ffffff',       // белый
    textSecondary: '#b0b0b0',     // серый
    cardBackground: '#2a2a2a',    // темно-серый
    border: '#3a3a3a',            // средне-серый
    error: '#ff4757',             // красный
    success: '#64DDA0',           // мятный
    warning: '#ffa726',           // оранжевый
    
    // Градиенты
    accentGradient: 'linear-gradient(135deg, #64DDA0 0%, #4ECDC4 100%)',
    
    // Opacity variants
    accentAlpha: {
      10: 'rgba(100, 221, 160, 0.1)',
      20: 'rgba(100, 221, 160, 0.2)',
      30: 'rgba(100, 221, 160, 0.3)',
      50: 'rgba(100, 221, 160, 0.5)',
    },
    
    blackAlpha: {
      10: 'rgba(0, 0, 0, 0.1)',
      20: 'rgba(0, 0, 0, 0.2)',
      30: 'rgba(0, 0, 0, 0.3)',
      50: 'rgba(0, 0, 0, 0.5)',
      70: 'rgba(0, 0, 0, 0.7)',
    },
    
    whiteAlpha: {
      10: 'rgba(255, 255, 255, 0.1)',
      20: 'rgba(255, 255, 255, 0.2)',
      30: 'rgba(255, 255, 255, 0.3)',
      50: 'rgba(255, 255, 255, 0.5)',
    }
  },
  
  typography: {
    // Заголовки
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '38px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '30px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '26px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    h4: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '24px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    
    // Основной текст
    body: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '22px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    bodyMedium: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '22px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    
    // Мелкий текст
    small: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '18px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    smallMedium: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '18px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    
    // Микро текст
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    
    // Цены
    price: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '30px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#64DDA0',
    },
    priceSmall: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '24px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#64DDA0',
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '50%',
  },
  
  shadows: {
    card: '0 4px 12px rgba(0, 0, 0, 0.3)',
    cardHover: '0 8px 24px rgba(0, 0, 0, 0.4)',
    button: '0 2px 8px rgba(100, 221, 160, 0.3)',
    modal: '0 16px 48px rgba(0, 0, 0, 0.6)',
  },
  
  transitions: {
    fast: 'all 0.15s ease-out',
    normal: 'all 0.3s ease-out',
    slow: 'all 0.5s ease-out',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    tooltip: 1400,
    notification: 1500,
  },
  
  breakpoints: {
    mobile: '375px',
    mobileLarge: '428px',
    tablet: '768px',
    desktop: '1200px',
  },
  
  // Компонентные стили
  components: {
    button: {
      height: '48px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 600,
      transition: 'all 0.15s ease-out',
    },
    
    input: {
      height: '48px',
      borderRadius: '12px',
      fontSize: '16px',
      padding: '0 16px',
      background: '#2a2a2a',
      border: '1px solid #3a3a3a',
      transition: 'all 0.15s ease-out',
    },
    
    card: {
      borderRadius: '16px',
      background: '#2a2a2a',
      border: '1px solid #3a3a3a',
      padding: '16px',
      transition: 'all 0.15s ease-out',
    },
  }
} as const;

// Utility functions
export const rgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getSpacing = (size: keyof typeof theme.spacing): string => {
  return theme.spacing[size];
};

export const getColor = (color: string): string => {
  const keys = color.split('.');
  let value: any = theme.colors;
  
  for (const key of keys) {
    value = value[key];
    if (!value) return color;
  }
  
  return value;
};

// Media query helpers
export const media = {
  mobile: `@media (max-width: ${theme.breakpoints.mobile})`,
  mobileLarge: `@media (max-width: ${theme.breakpoints.mobileLarge})`,
  tablet: `@media (max-width: ${theme.breakpoints.tablet})`,
  desktop: `@media (min-width: ${theme.breakpoints.desktop})`,
  hover: '@media (hover: hover)',
} as const; 