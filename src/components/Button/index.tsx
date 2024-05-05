import { FC } from "react";
import style from "./index.module.scss";
import classNames from "classnames";


interface IButtonProps {
  onClick?: () => void;
  id?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  children: string | JSX.Element | JSX.Element[];
}

const Button: FC<IButtonProps> = ({
  onClick,
  id,
  type,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={classNames(className, style.button)}
      onClick={onClick}
      id={id}
      type={type ?? "button"}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
