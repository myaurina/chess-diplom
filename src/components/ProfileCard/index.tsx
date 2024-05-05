import style from "./index.module.scss";
import classNames from "classnames";

const ProfileCard = () => {
  return (
    <div className={style.profileCard}>
      <div className={style.profileCardAvatar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="90px"
          width="90px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 60.671 60.671"
        >
          <g>
            <g>
              <ellipse
                style={{ fill: "var(--main-color)" }}
                cx="30.336"
                cy="12.097"
                rx="11.997"
                ry="12.097"
              />
              <path
                style={{ fill: "var(--main-color)" }}
                d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9    C48.354,35.818,42.661,30.079,35.64,30.079z"
              />
            </g>
          </g>
        </svg>
      </div>
      <div className={style.profileCardInfo}>
        <div className={classNames("text-level-1", style.profileCardName)}>
          <span className={style.profileCardFirstName}>Марина</span>
          <span className={style.profileCardLastName}>Теренская</span>
        </div>
        <div className={classNames("text-level-4", style.profileCardAge)}>22 года</div>
        <div className={classNames("text-level-3", style.profileCardDescription)}>
          Игрок в шахматы с почти нулевым опытом. Являюсь начинающим Frontend
          разработчиком с желанием ознакомиться с шахматами и веб-кодингом
          поближе, выучить различные техники написания Frontend приложений и
          игры в шахматы. На примере данного приложения хочу подготовить базу
          для возможности играть вдвоём с одного устройсвта, а также ввести
          онлайн режим для соревнований между другими игроками.
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
