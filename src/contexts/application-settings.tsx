import React, { useState, useMemo } from "react";

// Интерфейс объекта, который будет зашит в value контекста
interface ApplicationSettingsContextType {
  appTheme: string;
  setAppTheme: (theme: string) => void;
  appSize: string;
  setAppSize: (theme: string) => void;
  chessBoardTheme: string;
  setChessBoardTheme: (chessBoardTheme: string) => void;
  figuresImageType: string;
  setFiguresImageType: (figuresImageType: string) => void;
}

// Ключ для хранения состояния темы в LocalStorage
const APP_THEME_KEY = "appThemeState";
// Ключ для хранения состояния размера эл-тов в приложении в LocalStorage
const APP_SIZE_KEY = "appSizeState";
// Ключ для хранения состояния внешнего вида поля шахмат в LocalStorage
const CHESS_BOARD_THEME_KEY = "chessBoardThemeState";
// Ключ для хранения состояния внешнего вида шахматных фигур в LocalStorage
const CHESS_FIGURES_IMAGE_TYPE_KEY = "chessFiguresImageTypeState";

// Функция, которая возвращает тему из localStorage или дефолтную (light)
const getAppThemeFromLS = () => {
  const appThemeFromLS = localStorage.getItem(APP_THEME_KEY);
  if (
    appThemeFromLS &&
    (appThemeFromLS === "dark" || appThemeFromLS === "light")
  )
    return appThemeFromLS;
  else return "light";
};

// Функция, которая возвращает размер шрифта из localStorage или дефолтный
const getAppSizeFromLS = () => {
  const appSizeFromLS = localStorage.getItem(APP_SIZE_KEY);
  if (
    appSizeFromLS &&
    (appSizeFromLS === "big" || appSizeFromLS === "standart" || appSizeFromLS === "small")
  )
    return appSizeFromLS;
  else return "standart";
};

// Функция, которая возвращает тему доски из localStorage или дефолтную
const getChessBoardThemeFromLS = () => {
  const chessBoardThemeFromLS = localStorage.getItem(CHESS_BOARD_THEME_KEY);
  if (
    chessBoardThemeFromLS &&
    (chessBoardThemeFromLS === "brown" ||
      chessBoardThemeFromLS === "palePinkAndPaleBlue")
  )
    return chessBoardThemeFromLS;
  else return "brown";
};

// Функция, которая возвращает тип изображений шахматных фигур из localStorage или дефолтный
const getFiguresImageTypeFromLS = () => {
  const appFiguresTypeImageFromLS = localStorage.getItem(CHESS_FIGURES_IMAGE_TYPE_KEY);
  if (
    appFiguresTypeImageFromLS &&
    (appFiguresTypeImageFromLS === "standart" || appFiguresTypeImageFromLS === "standart-shadow" || appFiguresTypeImageFromLS === "lego")
  )
    return appFiguresTypeImageFromLS;
  else return "standart";
};

// Создаём контекст
const ApplicationSettingsContext =
  React.createContext<ApplicationSettingsContextType | null>(null);

// Провайдер (подробнее: https://react.dev/reference/react/createContext#provider)
const ApplicationSettingsProvider = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) => {
  // состояние темы и функция изменения темы
  const [appTheme, setAppTheme] = useState(getAppThemeFromLS());
  const [appSize, setAppSize] = useState(getAppSizeFromLS());
  const [chessBoardTheme, setChessBoardTheme] = useState(
    getChessBoardThemeFromLS()
  );
  const [figuresImageType, setFiguresImageType] = useState(
    getFiguresImageTypeFromLS()
  );
  // useMemo для оптимизации и минимизации перерендреров
  const appSettings = useMemo(
    () => ({
      appTheme,
      setAppTheme: (_theme: string) => {
        setAppTheme(_theme);
        localStorage.setItem(APP_THEME_KEY, _theme);
      },
      appSize,
      setAppSize: (_theme: string) => {
        setAppSize(_theme);
        localStorage.setItem(APP_SIZE_KEY, _theme);
      },
      chessBoardTheme,
      setChessBoardTheme: (_chessBoardTheme: string) => {
        setChessBoardTheme(_chessBoardTheme);
        localStorage.setItem(CHESS_BOARD_THEME_KEY, _chessBoardTheme);
      },
      figuresImageType,
      setFiguresImageType: (_figuresImageType: string) => {
        setFiguresImageType(_figuresImageType);
        localStorage.setItem(CHESS_FIGURES_IMAGE_TYPE_KEY, _figuresImageType);
      },
    }),
    [appTheme, appSize, chessBoardTheme, figuresImageType]
  );

  return (
    <ApplicationSettingsContext.Provider value={appSettings}>
      {children}
    </ApplicationSettingsContext.Provider>
  );
};

export { ApplicationSettingsProvider };
export default ApplicationSettingsContext;
