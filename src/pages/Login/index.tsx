import style from "./index.module.scss";
import { LoginForm } from "../../components";

const Login = () => {
  return (
    <div className={style.loginPage}>
      <LoginForm />
    </div>
  );
};

export default Login;
