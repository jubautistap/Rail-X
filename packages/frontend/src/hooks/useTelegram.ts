import { useEffect, useState, useCallback } from 'react';
import type { TelegramWebApp } from '@/types';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface UseTelegramReturn {
  webApp: TelegramWebApp | null;
  user: TelegramUser | null;
  isReady: boolean;
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
  hapticFeedback: {
    light: () => void;
    medium: () => void;
    heavy: () => void;
    success: () => void;
    error: () => void;
    warning: () => void;
  };
  mainButton: {
    show: (text: string, callback: () => void) => void;
    hide: () => void;
    setText: (text: string) => void;
    enable: () => void;
    disable: () => void;
  };
  backButton: {
    show: (callback: () => void) => void;
    hide: () => void;
  };
  close: () => void;
  expand: () => void;
  ready: () => void;
  sendData: (data: string) => void;
}

export const useTelegram = (): UseTelegramReturn => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Проверяем, доступен ли Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      setWebApp(tg);
      
      // Инициализируем приложение
      tg.ready();
      tg.expand();
      
      // Устанавливаем цвет заголовка (если доступно)
      if ((tg as any).setHeaderColor) {
        (tg as any).setHeaderColor('#1e1e1e');
      }
      
      // Устанавливаем цвет фона (если доступно)
      if ((tg as any).setBackgroundColor) {
        (tg as any).setBackgroundColor('#1e1e1e');
      }
      
      setIsReady(true);
    } else {
      // Для разработки без Telegram
      console.warn('Telegram WebApp не доступен. Работаем в режиме разработки.');
      setIsReady(true);
    }
  }, []);

  // Получаем данные пользователя
  const user = webApp?.initDataUnsafe?.user || null;

  // Получаем цветовую схему
  const colorScheme = webApp?.colorScheme || 'dark';

  // Получаем параметры темы
  const themeParams = webApp?.themeParams || {};

  // Haptic Feedback
  const hapticFeedback = {
    light: useCallback(() => {
      webApp?.HapticFeedback?.impactOccurred('light');
    }, [webApp]),
    
    medium: useCallback(() => {
      webApp?.HapticFeedback?.impactOccurred('medium');
    }, [webApp]),
    
    heavy: useCallback(() => {
      webApp?.HapticFeedback?.impactOccurred('heavy');
    }, [webApp]),
    
    success: useCallback(() => {
      webApp?.HapticFeedback?.notificationOccurred('success');
    }, [webApp]),
    
    error: useCallback(() => {
      webApp?.HapticFeedback?.notificationOccurred('error');
    }, [webApp]),
    
    warning: useCallback(() => {
      webApp?.HapticFeedback?.notificationOccurred('warning');
    }, [webApp]),
  };

  // Main Button управление
  const mainButton = {
    show: useCallback((text: string, callback: () => void) => {
      if (webApp?.MainButton) {
        webApp.MainButton.setText(text);
        webApp.MainButton.color = '#64DDA0'; // Фирменный мятный цвет
        webApp.MainButton.textColor = '#ffffff';
        webApp.MainButton.onClick(callback);
        webApp.MainButton.show();
      }
    }, [webApp]),
    
    hide: useCallback(() => {
      if (webApp?.MainButton) {
        webApp.MainButton.hide();
      }
    }, [webApp]),
    
    setText: useCallback((text: string) => {
      if (webApp?.MainButton) {
        webApp.MainButton.setText(text);
      }
    }, [webApp]),
    
    enable: useCallback(() => {
      if (webApp?.MainButton) {
        (webApp.MainButton as any).enable?.();
      }
    }, [webApp]),
    
    disable: useCallback(() => {
      if (webApp?.MainButton) {
        (webApp.MainButton as any).disable?.();
      }
    }, [webApp]),
  };

  // Back Button управление
  const backButton = {
    show: useCallback((callback: () => void) => {
      if (webApp?.BackButton) {
        webApp.BackButton.onClick(callback);
        webApp.BackButton.show();
      }
    }, [webApp]),
    
    hide: useCallback(() => {
      if (webApp?.BackButton) {
        webApp.BackButton.hide();
      }
    }, [webApp]),
  };

  // Основные методы WebApp
  const close = useCallback(() => {
    webApp?.close();
  }, [webApp]);

  const expand = useCallback(() => {
    webApp?.expand();
  }, [webApp]);

  const ready = useCallback(() => {
    webApp?.ready();
  }, [webApp]);

  const sendData = useCallback((data: string) => {
    (webApp as any)?.sendData?.(data);
  }, [webApp]);

  return {
    webApp,
    user,
    isReady,
    colorScheme,
    themeParams,
    hapticFeedback,
    mainButton,
    backButton,
    close,
    expand,
    ready,
    sendData,
  };
};

// Хук для проверки, запущено ли приложение в Telegram
export const useIsTelegram = (): boolean => {
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    setIsTelegram(
      typeof window !== 'undefined' && 
      !!window.Telegram?.WebApp
    );
  }, []);

  return isTelegram;
};

// Хук для получения инициализационных данных
export const useTelegramInitData = () => {
  const { webApp } = useTelegram();
  
  return {
    initData: (webApp as any)?.initData || '',
    initDataUnsafe: webApp?.initDataUnsafe || {},
    hash: (webApp?.initDataUnsafe as any)?.hash || '',
  };
};

// Хук для работы с viewport
export const useTelegramViewport = () => {
  const { webApp } = useTelegram();
  const [viewport, setViewport] = useState({
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    stableHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    isExpanded: false,
  });

  useEffect(() => {
    if (!webApp) return;

    const updateViewport = () => {
      setViewport({
        height: (webApp as any).viewportHeight || window.innerHeight,
        stableHeight: (webApp as any).viewportStableHeight || window.innerHeight,
        isExpanded: (webApp as any).isExpanded || false,
      });
    };

    // Обновляем при изменении размеров
    window.addEventListener('resize', updateViewport);
    updateViewport();

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, [webApp]);

  return viewport;
}; 