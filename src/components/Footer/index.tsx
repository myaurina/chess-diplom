import style from "./index.module.scss";
import Logo from "../../assets/logo-ivsu.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerInner}>
        <Link to="/" className={style.footerLogoWrapper}>
          <img src={Logo} alt="Шахматы ИвГУ" className={style.footerLogo} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
