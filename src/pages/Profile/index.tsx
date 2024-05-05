import style from "./index.module.scss";
import { ProfileCard } from "../../components";
import { ChangeEvent, useContext } from "react";
import ApplicationSettingsContext from "../../contexts/application-settings";
import Select from "../../components/Select";

const appThemes = [
  {
    label: "Тёмная",
    value: "dark",
  },
  {
    label: "Светлая",
    value: "light",
  },
];

const appSizes = [
  {
    label: "Большой",
    value: "big",
  },
  {
    label: "Стандарт",
    value: "standart",
  },
  {
    label: "Маленький",
    value: "small",
  },
];

const chessBoardThemes = [
  {
    label: "Бледно-розовый и бледно-голубой",
    value: "palePinkAndPaleBlue",
  },
  {
    label: "Коричневая",
    value: "brown",
  },
];

const chessBoardFiguresType = [
  {
    label: "Стандартный",
    value: "standart",
  },
  {
    label: "Стандартный (с тенью)",
    value: "standart-shadow",
  },
  {
    label: "Lego",
    value: "lego",
  },
];

const Profile = () => {
  const appSettings = useContext(ApplicationSettingsContext);

  const onChangeAppTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!appSettings) return;
    appSettings?.setAppTheme(e.target?.value);
  };
  const onChangeAppSize = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!appSettings) return;
    appSettings?.setAppSize(e.target?.value);
  };
  const onChangeChessBoardTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!appSettings) return;
    appSettings?.setChessBoardTheme(e.target?.value);
  };
  const onChangeFiguresImageType = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!appSettings) return;
    appSettings?.setFiguresImageType(e.target?.value);
  };

  return (
    <div className={style.profileWrapper}>
      <div className={style.profileContent}>
        <ProfileCard />
        <div className={style.appSettingsFields}>
          <Select
            onChange={onChangeAppTheme}
            value={appSettings?.appTheme || "light"}
            options={appThemes}
            label="Смена темы"
            id="appTheme"
            name="appTheme"
          />
          <Select
            onChange={onChangeChessBoardTheme}
            value={appSettings?.chessBoardTheme || "brown"}
            options={chessBoardThemes}
            label="Смена цвета доски"
            id="chessBoardTheme"
            name="chessBoardTheme"
          />
          <Select
            onChange={onChangeAppSize}
            value={appSettings?.appSize || "standart"}
            options={appSizes}
            label="Смена размера приложения"
            id="appSize"
            name="appSize"
          />
          <Select
            onChange={onChangeFiguresImageType}
            value={appSettings?.figuresImageType || "standart"}
            options={chessBoardFiguresType}
            label="Смена вида фигур"
            id="figuresImageType"
            name="figuresImageType"
          />
        </div>
        <h1 className={style.inDevelopmentH1}>В разработке!</h1>
      </div>
    </div>
  );
};

export default Profile;
