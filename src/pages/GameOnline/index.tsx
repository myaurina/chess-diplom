import style from "./index.module.scss";
import classNames from "classnames";

const GameOnline = () => {
  return (
    <div>
      <h1 className={classNames("text-level-1", style.inDevelopmentH1)}>В разработке!</h1>
    </div>
  );
};

export default GameOnline;
