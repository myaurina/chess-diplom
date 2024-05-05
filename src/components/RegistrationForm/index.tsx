import { SyntheticEvent, useState } from "react";
import style from "./index.module.scss";
import Input from "../Input";
import { Button } from "..";
import { Link } from "react-router-dom";
import classNames from "classnames";

const RegistrationForm = () => {
  const [registrationState, setRegistrationState] = useState<string>("");
  const [passwordState, setPasswordState] = useState<string>("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  const onInputRegistration = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setRegistrationState(target.value);
  };

  const onInputPassword = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPasswordState(target.value);
  };

  return (
    <div className={style.registrationForm}>
      <form onSubmit={onSubmit} className={style.registrationFormInner}>
        <h1 className={classNames("text-level-1",style.registrationFormH1)}>Регистрация</h1>
        <div className={style.registrationFormFormControl}>
          <Input
            value={registrationState}
            onInput={onInputRegistration}
            type="email"
            label="Email"
            name="registration"
            id="registration"
            placeholder="Введите email"
          />
        </div>
        <div className={style.registrationFormFormControl}>
          <Input
            value={passwordState}
            onInput={onInputPassword}
            type="text"
            label="Фамилия"
            name="lastName"
            id="lastName"
            placeholder="Введите фамилию"
          />
        </div>
        <div className={style.registrationFormFormControl}>
          <Input
            value={passwordState}
            onInput={onInputPassword}
            type="text"
            label="Имя"
            name="firstName"
            id="firstName"
            placeholder="Введите имя"
          />
        </div>
        <div className={style.registrationFormFormControl}>
          <Input
            value={passwordState}
            onInput={onInputPassword}
            type="password"
            label="Пароль"
            name="password"
            id="password"
            placeholder="Введите пароль"
          />
        </div>
        <div className={style.registrationFormFormControl}>
          <Button className={style.registrationFormFormButton} type="submit">
            <span className="text-level-3">Зарегистрироваться</span>
          </Button>
        </div>
        <Link to="/login" className={classNames("text-level-5", style.registrationFormLink)}>
          Уже есть аккаунт?
        </Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
