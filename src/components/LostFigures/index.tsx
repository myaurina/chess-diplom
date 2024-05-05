import { FC } from "react";
import { Figure } from "../../models/figures/Figure";
import style from "./index.module.scss";
import classNames from "classnames";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className={style.lostFigures}>
      <h3 className={classNames("text-level-4", style.lostFiguresTitle)}>{title}</h3>
      <div className={style.lostFiguresFigures}>
        {figures.map((figure) => (
          <div key={figure.id} className={style.lostFiguresFigure}>
            <span className="text-level-5">{figure.name}</span>
            {figure.logo && (
              <img width={20} height={20} src={figure.logo} alt={figure.name} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostFigures;
