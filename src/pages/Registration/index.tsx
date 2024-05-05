import style from "./index.module.scss";
import { RegistrationForm } from "../../components";

const Registration = () => {
  return (
    <div className={style.registrationPage}>
      <RegistrationForm />
    </div>
  );
};

export default Registration;
