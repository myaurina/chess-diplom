import { SyntheticEvent, useState } from "react";
import style from "./index.module.scss";
import Input from "../Input";
import { Button } from "..";
import { Link } from "react-router-dom";
import classNames from "classnames";

const LoginForm = () => {
  const [loginState, setLoginState] = useState<string>("");
  const [passwordState, setPasswordState] = useState<string>("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  const onInputLogin = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setLoginState(target.value);
  };

  const onInputPassword = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPasswordState(target.value);
  };

  return (
    <div className={style.loginForm}>
      <form onSubmit={onSubmit} className={style.loginFormInner}>
        <h1 className={classNames("text-level-1", style.loginFormH1)}>Войти</h1>
        <div className={style.loginFormFormControl}>
          <Input
            value={loginState}
            onInput={onInputLogin}
            type="email"
            label="Email"
            name="login"
            id="login"
            placeholder="Введите email"
          />
        </div>
        <div className={style.loginFormFormControl}>
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
        <div className={style.loginFormFormControl}>
          <Button className={style.loginFormFormButton} type="submit">
            <span className="text-level-3">Войти</span>
          </Button>
        </div>
        <Link to="/registration" className={classNames("text-level-5", style.loginFormLink)}>
          Зарегистрироваться
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
