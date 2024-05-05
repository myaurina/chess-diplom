import { useId, type FC, ChangeEvent } from "react";
import style from "./index.module.scss";

interface ISelectProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  label?: string;
  name?: string;
  id?: string;
  placeholder?: string;
}

const Select: FC<ISelectProps> = ({
  value,
  onChange,
  options,
  label,
  name,
  id,
  placeholder,
  ...rest
}) => {
  const uniqueId = useId();

  return (
    <div className={style.selectWrapper}>
      {label && (
        <label className={style.label} htmlFor={id ?? `select-${uniqueId}`}>
          {label}
        </label>
      )}
      <select
        className={style.select}
        value={value}
        onChange={onChange}
        id={id ?? `select-${uniqueId}`}
        name={name ?? `name-${uniqueId}`}
        placeholder={placeholder ?? ""}
        {...rest}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
