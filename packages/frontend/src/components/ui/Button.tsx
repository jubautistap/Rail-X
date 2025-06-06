import styled from '@emotion/styled';
import { theme } from '@/utils/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.bodyMedium.fontFamily};
  font-weight: ${theme.typography.bodyMedium.fontWeight};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  outline: none;
  position: relative;
  overflow: hidden;
  
  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          height: 40px;
          padding: 0 ${theme.spacing.md};
          font-size: 14px;
        `;
      case 'large':
        return `
          height: 56px;
          padding: 0 ${theme.spacing.lg};
          font-size: 18px;
        `;
      default:
        return `
          height: 48px;
          padding: 0 ${theme.spacing.md};
          font-size: 16px;
        `;
    }
  }}
  
  /* Variant styles */
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${theme.colors.cardBackground};
          color: ${theme.colors.textPrimary};
          border: 1px solid ${theme.colors.border};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.border};
            transform: translateY(-1px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.accent};
          border: 1px solid ${theme.colors.accent};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.accentAlpha[10]};
            transform: translateY(-1px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.textSecondary};
          border: none;
          
          &:hover:not(:disabled) {
            background: ${theme.colors.whiteAlpha[10]};
            color: ${theme.colors.textPrimary};
          }
        `;
      default: // primary
        return `
          background: ${theme.colors.accentGradient};
          color: #ffffff;
          border: none;
          box-shadow: ${theme.shadows.button};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.cardHover};
          }
          
          &:active {
            transform: translateY(0);
            box-shadow: ${theme.shadows.button};
          }
        `;
    }
  }}
  
  /* Full width */
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
  
  /* Loading state */
  ${({ loading }) => loading && `
    color: transparent !important;
    pointer-events: none;
  `}
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.whiteAlpha[30]};
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  children,
  className,
  type = 'button',
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      loading={loading}
      onClick={onClick}
      className={className}
      type={type}
    >
      {loading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
}; 