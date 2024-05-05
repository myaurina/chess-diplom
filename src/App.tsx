import "./App.css";
import { Routes, Route } from "react-router-dom";
// pages
import {
  GameHotSeat,
  GameOnline,
  Login,
  Main,
  Profile,
  Registration,
  NotFound,
} from "./pages";
// components
import { Header, Footer } from "./components";
import ApplicationSettingsContext from "./contexts/application-settings";
import classNames from "classnames";
import { useContext } from "react";

function App() {
  const appSettings = useContext(ApplicationSettingsContext);
  return (
    <div
      className={classNames(
        "app",
        appSettings?.appTheme ? `theme-${appSettings?.appTheme}` : null,
        appSettings?.appSize ? `appSize-${appSettings?.appSize}` : null
      )}
      id="app"
    >
      <div className="appInner">
        <Header />
        <div className="container pageContainer">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/game-hotseat" element={<GameHotSeat />} />
            <Route path="/game-online" element={<GameOnline />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
