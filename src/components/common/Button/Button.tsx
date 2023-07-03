import { useRef } from 'react';
import clx from './Button.module.css';

type Props = React.PropsWithChildren<{
  variant?: 'contained' | 'outlined' | 'text';
  color?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'default';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  size?: 'small' | 'middle' | 'large';
  onClick?: (event: React.MouseEvent) => void;
}>;

export const Button = (props: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const button = buttonRef.current;
    const ripple = document.createElement('span');
    ripple.className = clx.ripple;
    button.appendChild(ripple);

    const buttonRect = button.getBoundingClientRect();
    const diameter = Math.max(buttonRect.width, buttonRect.height);
    const offsetTop = event.pageY - buttonRect.top - diameter / 2;
    const offsetLeft = event.pageX - buttonRect.left - diameter / 2;

    ripple.style.top = offsetTop + 'px';
    ripple.style.left = offsetLeft + 'px';
    ripple.style.width = diameter + 'px';
    ripple.style.height = diameter + 'px';

    props.onClick && props.onClick(event);
    const intV = setInterval(() => {
      button.removeChild(ripple);
      clearInterval(intV);
    }, 1000);
  };

  const className = `${clx.button}
        ${props.variant ? clx[props.variant] : ''}
        ${props.color ? clx[props.color] : ''}
        ${props.size ? clx[props.size] : ''}
        ${props.fullWidth ? clx.wFull : ''}
    `;

  return (
    <button
      ref={buttonRef}
      className={`${className} ${props.className ? props.className : ''}`}
      onClick={handleClick}
      disabled={props.disabled}
      type={props.type ? props.type : 'button'}>
      {props.children}
    </button>
  );
};
