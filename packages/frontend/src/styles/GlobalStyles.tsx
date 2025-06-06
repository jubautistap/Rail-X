import { Global, css } from '@emotion/react';
import { theme } from '@/utils/theme';

export const GlobalStyles = () => (
  <Global
    styles={css`
      /* Reset */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-size: 16px;
        -webkit-text-size-adjust: 100%;
      }

      body {
        font-family: ${theme.typography.body.fontFamily};
        font-size: ${theme.typography.body.fontSize};
        line-height: ${theme.typography.body.lineHeight};
        color: ${theme.colors.textPrimary};
        background-color: ${theme.colors.background};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
      }

      #root {
        min-height: 100vh;
        position: relative;
      }

      /* Scrollbar styling */
      ::-webkit-scrollbar {
        width: 4px;
      }

      ::-webkit-scrollbar-track {
        background: ${theme.colors.cardBackground};
      }

      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.accent};
        border-radius: 2px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.accent};
        opacity: 0.8;
      }

      /* Typography */
      h1 {
        font-family: ${theme.typography.h1.fontFamily};
        font-size: ${theme.typography.h1.fontSize};
        font-weight: ${theme.typography.h1.fontWeight};
        line-height: ${theme.typography.h1.lineHeight};
        color: ${theme.colors.textPrimary};
      }

      h2 {
        font-family: ${theme.typography.h2.fontFamily};
        font-size: ${theme.typography.h2.fontSize};
        font-weight: ${theme.typography.h2.fontWeight};
        line-height: ${theme.typography.h2.lineHeight};
        color: ${theme.colors.textPrimary};
      }

      h3 {
        font-family: ${theme.typography.h3.fontFamily};
        font-size: ${theme.typography.h3.fontSize};
        font-weight: ${theme.typography.h3.fontWeight};
        line-height: ${theme.typography.h3.lineHeight};
        color: ${theme.colors.textPrimary};
      }

      h4 {
        font-family: ${theme.typography.h4.fontFamily};
        font-size: ${theme.typography.h4.fontSize};
        font-weight: ${theme.typography.h4.fontWeight};
        line-height: ${theme.typography.h4.lineHeight};
        color: ${theme.colors.textPrimary};
      }

      p {
        margin-bottom: ${theme.spacing.md};
      }

      /* Links */
      a {
        color: ${theme.colors.accent};
        text-decoration: none;
        transition: ${theme.transitions.fast};

        &:hover {
          opacity: 0.8;
        }
      }

      /* Images */
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }

      /* Form elements */
      button {
        font-family: inherit;
        cursor: pointer;
      }

      input, textarea, select {
        font-family: inherit;
      }

      /* Utilities */
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      /* Container */
      .container {
        width: 100%;
        max-width: 100%;
        padding: 0 ${theme.spacing.md};
        margin: 0 auto;
      }

      /* Safe area for mobile */
      .safe-area-bottom {
        padding-bottom: env(safe-area-inset-bottom);
      }

      .safe-area-top {
        padding-top: env(safe-area-inset-top);
      }

      /* Telegram-specific styles */
      .telegram-viewport {
        min-height: 100vh;
        min-height: 100svh; /* Small viewport height for mobile */
      }

      /* Loading animation */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .fade-in {
        animation: fadeIn 0.3s ease-out;
      }

      /* Shimmer effect for loading */
      @keyframes shimmer {
        0% {
          background-position: -468px 0;
        }
        100% {
          background-position: 468px 0;
        }
      }

      .shimmer {
        background: linear-gradient(
          90deg,
          ${theme.colors.cardBackground} 0%,
          ${theme.colors.border} 50%,
          ${theme.colors.cardBackground} 100%
        );
        background-size: 400% 100%;
        animation: shimmer 1.2s ease-in-out infinite;
      }

      /* Price styling */
      .price {
        color: ${theme.colors.accent};
        font-weight: 700;
      }

      .price-old {
        text-decoration: line-through;
        color: ${theme.colors.textSecondary};
        font-weight: 400;
      }

      /* Badge */
      .badge {
        display: inline-flex;
        align-items: center;
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        border-radius: ${theme.borderRadius.sm};
        font-size: ${theme.typography.caption.fontSize};
        font-weight: 500;
        background: ${theme.colors.accentAlpha[20]};
        color: ${theme.colors.accent};
      }

      .badge-success {
        background: ${theme.colors.success}20;
        color: ${theme.colors.success};
      }

      .badge-error {
        background: ${theme.colors.error}20;
        color: ${theme.colors.error};
      }

      /* Focus styles */
      *:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
      }

      /* Text selection */
      ::selection {
        background: ${theme.colors.accentAlpha[30]};
        color: ${theme.colors.textPrimary};
      }

      /* Responsive typography */
      @media (max-width: ${theme.breakpoints.mobile}) {
        html {
          font-size: 14px;
        }
      }

      /* Dark theme adjustments */
      @media (prefers-color-scheme: dark) {
        body {
          color-scheme: dark;
        }
      }
    `}
  />
); 