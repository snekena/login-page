import clx from './Form.module.css';

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  error?: string;
  label?: string;
  mutiline?: boolean;
  image?: string;
  imageSize?: number;
};

export const Form = ({
  className,
  children,
  image,
  imageSize,
  ...props
}: Props) => {
  const imageCss = {
    height: imageSize,
    width: imageSize,
  };

  return (
    <form
      className={`${clx.Form} ${className || ''}`}
      action=''
      {...props}>
      {image && (
        <img
          className={`${clx['Form-img']}`}
          src={image}
          style={imageCss}
        />
      )}
      {props.title && <h1 className='txt-xl'>{props.title}</h1>}
      {children}
    </form>
  );
};
