import { useId, type FC, SyntheticEvent } from "react";
import style from "./index.module.scss";

interface IInputProps {
  value: string;
  onInput: (e: SyntheticEvent) => void;
  label?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
}

const Input: FC<IInputProps> = ({
  value,
  onInput,
  label,
  name,
  id,
  type,
  placeholder,
  ...rest
}) => {
  const uniqueId = useId();
  return (
    <div className={style.inputWrapper}>
      {label && (
        <label className={style.label} htmlFor={id ?? `input-${uniqueId}`}>
          {label}
        </label>
      )}
      <input
        className={style.input}
        value={value}
        onInput={onInput}
        id={id ?? `input-${uniqueId}`}
        name={name ?? `name-${uniqueId}`}
        type={type ?? "text"}
        placeholder={placeholder ?? ""}
        {...rest}
      />
    </div>
  );
};

export default Input;
