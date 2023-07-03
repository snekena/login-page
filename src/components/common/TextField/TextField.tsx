import { useEffect, useState, useRef } from 'react';
import clx from './TextField.module.css';

type Props = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  error?: string;
  label?: string;
  mutiline?: boolean;
  link?: {
    to: string;
    value: string;
  };
};
export const TextField = ({
  className,
  placeholder,
  mutiline,
  link,
  ...props
}: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const areaEl = useRef<HTMLTextAreaElement>(null);
  const areaHeight = useRef('');
  const handleChange = (
    ev:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(ev.currentTarget.value);
    resizeArea();
    if (props.onInput) props.onInput;
  };

  useEffect(() => {
    setError(props.error || '');
  }, [props.error]);

  useEffect(() => {
    const el = areaEl.current;
    if (el) {
      areaHeight.current = window.getComputedStyle(el).height;
      el.addEventListener('focusout', resetH);
    }
    function resetH() {
      setValue((v) => v.trim());
      resizeArea();
    }
  }, []);

  function resizeArea() {
    if (areaEl.current) {
      areaEl.current.style.height = `${areaHeight.current}`;
      areaEl.current.style.height = `${areaEl.current.scrollHeight}px`;
    }
  }

  return (
    <label
      className={`${clx.TextField} txt-sm ${
        error.trim() !== '' ? clx.asError : ''
      }`}>
      {props.label ||
        (link && (
          <div className={`${clx['TextField-label']} flex jcb`}>
            <span>{props.label}</span>
            {link && <a href={link.to}>{link.value}</a>}
          </div>
        ))}
      {!mutiline ? (
        <input
          className={`${clx['TextField-input']} ${className ? className : ''}`}
          onInput={handleChange}
          value={value}
          placeholder={props.required ? `${placeholder} *` : placeholder}
          {...props}
        />
      ) : (
        <textarea
          lang='none'
          ref={areaEl}
          className={`${clx['TextField-textarea']} ${
            className ? className : ''
          }`}
          onInput={handleChange}
          value={value}
          placeholder={props.required ? `${placeholder} *` : placeholder}
          autoFocus
          {...props}></textarea>
      )}
      {error.trim() !== '' && <p className={clx['TextField-error']}>{error}</p>}
    </label>
  );
};
