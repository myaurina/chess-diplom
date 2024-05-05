import { FC, useContext } from "react";
import { Cell } from "../../models/Cell";
import { Player } from "../../models/Player";
import style from "./index.module.scss";
import classNames from "classnames";
import ApplicationSettingsContext from "../../contexts/application-settings";

interface CellProps {
  cell: Cell; // объект ячейки
  selected: boolean; // Выбрана ли данная ячейка
  click: (cell: Cell) => void; // функция кликам по ячейке
  currentPlayer: Player | null; // текущий игрок
}

const CellComponent: FC<CellProps> = ({
  cell,
  selected,
  click,
  currentPlayer,
}) => {
  // Значения из глобального контекст appSettings
  const appSettings = useContext(ApplicationSettingsContext);
  //
  // Вычисление стилей для ячейки
  const styleCellColor = cell.color === "white" ? style.white : style.black;
  const styleCellSelected = selected ? style.selected : "";
  const styleCellAvailableEnemy =
    cell.figure && cell.available && currentPlayer?.color !== cell.figure.color
      ? style.availableEnemy
      : "";
  const styleCellAvailableCastling =
    cell.figure && cell.available && currentPlayer?.color === cell.figure.color
      ? style.availableCastling
      : "";
  //
  return (
    <div
      className={classNames(
        style.cell,
        styleCellColor,
        styleCellSelected,
        styleCellAvailableEnemy,
        styleCellAvailableCastling,
        appSettings?.chessBoardTheme
          ? style?.[`chessBoardTheme-${appSettings?.chessBoardTheme}`]
          : null
      )}
      onClick={() => click(cell)}
    >
      <span className={style.cellPosition}>
        {cell.y}:{cell.x}
      </span>
      {!cell.figure && cell.available && (
        <div className={style.available}></div>
      )}
      {cell.figure?.logo && (
        <img
          src={cell.figure.logo}
          alt=""
          className={classNames({
            [style.cellNotAvailableFigureLogo]: !(
              currentPlayer?.color === cell.figure.color &&
              cell.figure?.isAvailable
            ),
          })}
        />
      )}
    </div>
  );
};

export default CellComponent;
