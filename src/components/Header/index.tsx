import { useState } from "react";
import Logo from "../../assets/logo-ivsu.png";
import { Link } from "react-router-dom";
import style from "./index.module.scss";
import classNames from "classnames";

const Header = () => {
  // Состояние бургер-меню
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const onClickButtonBurger = () => {
    setIsActiveMenu((state) => !state);
  };

  // Ссылки в шапке
  const headerNavLinks = [
    {
      to: "/game-hotseat",
      text: "Играть вдвоём на одном устройстве",
    },
    {
      to: "/game-online",
      text: "Играть онлайн",
    },
    {
      to: "/profile",
      text: "Профиль",
    },
  ];

  return (
    <header className={style.header}>
      <div className={`${style.headerInner} container`}>
        <div className={style.headerLeft}>
          <button
            className={style.headerButtonBurger}
            onClick={onClickButtonBurger}
          >
            <div
              className={classNames(
                "text-level-3",
                style.headerBurger,
                !isActiveMenu && style.headerBurgerActive
              )}
            >
              <svg
                width="40"
                height="41"
                viewBox="0 0 40 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 20.5H35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 10.5H35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 30.5H35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={classNames(
                "text-level-3",
                style.headerBurgerX,
                isActiveMenu && style.headerBurgerXActive
              )}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 10L10 30"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 10L30 30"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
          <Link to="/" className={style.headerLogoWrapper}>
            <img src={Logo} alt="Шахматы ИвГУ" className={style.headerLogo} />
            <span className="text-level-3">
              Шахматы{" "}
              <span className={style.headerLogoUnivercityName}>ИвГУ</span>
            </span>
          </Link>
        </div>

        <div
          className={classNames(
            style.headerNavWrapper,
            isActiveMenu && style.headerNavWrapperActive
          )}
        >
          <nav className={style.headerNav}>
            <ul className={style.headerNavList}>
              {headerNavLinks.map((headerNavLink) => (
                <li
                  className={style.headerNavListItem}
                  key={headerNavLink.text}
                >
                  <Link
                    to={headerNavLink.to}
                    className={classNames("text-level-5", style.headerLink)}
                  >
                    {headerNavLink.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Link to="/login" className={style.headerLogin}>
          <div className={classNames("text-level-5", style.headerLoginLink)}>Войти</div>
          <svg
            x="0px"
            y="0px"
            width="708.631px"
            height="708.631px"
            viewBox="0 0 708.631 708.631"
            className={classNames("text-level-5", style.headerLoginLogo)}
          >
            <polygon fill="currentColor" points="177.158,499.264 177.158,708.631 660.315,708.631 660.315,0 177.158,0 177.158,209.369 209.368,209.369     209.368,32.21 628.104,32.21 628.104,676.422 209.368,676.422 209.368,499.264   " />
            <polygon fill="currentColor" points="48.315,370.357 459,370.357 370.421,515.369 402.631,515.369 499.263,354.316 402.631,193.263 370.421,193.263     459,338.21 48.315,338.21   " />
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default Header;
