import style from "./index.module.scss";
import { ChessRules, ProfileCard } from "../../components";

const Main = () => {
  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContent}>
        <ProfileCard />
        <ChessRules />
      </div>
    </div>
  );
};

export default Main;
