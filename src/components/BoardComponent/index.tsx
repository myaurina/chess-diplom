import { Fragment, FC, useEffect, useState } from "react";
import { Board } from "../../models/Board";
import { Cell } from "../../models/Cell";
import { Player } from "../../models/Player";
import CellComponent from "../CellComponent";
import style from "./index.module.scss";
import { FigureNames } from "../../models/figures/Figure";
import { Colors } from "../../models/Colors";
import Button from "../Button";
import classNames from "classnames";

interface BoardProps {
  board: Board; // доска
  setBoard: (board: Board) => void; // функция для смены доски на новую (перерендер нового состояния доски)
  currentPlayer: Player | null; // текущий игрок
  swapPlayer: () => void; // функция длясмены текущего игрока
  restart: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
  restart,
}) => {


  // Состояние выбранной ячейки
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  // Состояние модального окна для выбора фигруы вместо пешки
  const [isOpenModalForChangePawn, setIsOpenModalForChangePawn] =
    useState<boolean>(false);
  // Состояние модального окна "Пат"
  const [isOpenModalStalemate, setIsOpenModalStalemate] =
    useState<boolean>(false);
  // Состояние модального окна "Мат"
  const [isOpenModalCheckmate, setIsOpenModalCheckmate] =
    useState<boolean>(false);
  // Фигура, которая будет выбрана вместо пешки, дошедшей до края
  const [figureInsteadOfPawn, setFigureInsteadOfPawn] =
    useState<FigureNames | null>(null);
  // Нужно запоминать последнюю поставленную фигуру для случая с заменой пешки
  const [lastFigureCell, setLastFigureCell] = useState<Cell | null>(null);

  // функция для нажатия по ячейке
  // (если ячейка выбрана, то смотрим куда можем сходить и делаем ход, иначе выбираем ячейку)
  function click(cell: Cell) {
    // Ход фигурой
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      setLastFigureCell(cell);
      // Если пешка дошла до противоположенного края. Выбираем фигуру из модалки.
      if (
        selectedCell.figure.name === FigureNames.PAWN &&
        ((cell.y === 0 && selectedCell.figure.color === Colors.WHITE) ||
          (cell.y === 7 && selectedCell.figure.color === Colors.BLACK))
      ) {
        setIsOpenModalForChangePawn(true);
        return;
      }
      // board.moveFigureEffect(selectedCell.figure.cell, cell);
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      // Меняем текущего игрока
      swapPlayer();
      board.updateFiguresAvailability();
      if (currentPlayer?.color)
        console.log(
          board.isKingInCheck(
            currentPlayer.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
          )
        );
    }
    // Если повторно нажали на ту же клетку
    else if (selectedCell && selectedCell === cell) {
      setSelectedCell(null);
    }
    // Если нажали на свою фигуру (выбор фигуры для хода)
    else if (cell.figure?.color === currentPlayer?.color) {
      setSelectedCell(cell);
    }
  }

  // для подсвечивания ячеек, которые доступны для хотьбы
  function hightlightCells() {
    // устанавливаем у тех ячеек, на которые возможно сделать ход
    // фигурой на выбранной ячейке в true (там в CellComponent появится зеленый кружок тогда при перерендере)
    board.hightlightCells(selectedCell);
    // Производим обновление и, как следствие, перерендер
    updateBoard();
  }

  // Обновление состояния доски (создаем новую ссылку на доску ->
  // для реакта меняется состояние и происходит перерендер)
  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  // useEffect для создания эффектов при изменении props`а доски (board)
  useEffect(() => {
    console.log("Состояние доски обновилось");
    // Просчитываем для каждой фигуры её допустимые ходы
    board.updateFiguresAvailability();

    // Условие на случай мата/пата для черных
    if (board.isCheckmateOrStalemate(Colors.BLACK)) {
      board.isCheckmateOrStalemate(Colors.BLACK) === "Мат"
        ? setIsOpenModalCheckmate(true)
        : setIsOpenModalStalemate(true);
    }
    // Условие на случай мата/пата для белых
    if (board.isCheckmateOrStalemate(Colors.WHITE)) {
      board.isCheckmateOrStalemate(Colors.WHITE) === "Мат"
        ? setIsOpenModalCheckmate(true)
        : setIsOpenModalStalemate(true);
    }
  }, [board]);

  // useEffect для подсвечивания ячеек для хода при выборе ячейки (selectedCell) с какой-либо фигуры
  useEffect(() => {
    hightlightCells();
  }, [selectedCell]);

  // useEffect, срабатывающий только при выборе того, на что заменить пешку
  useEffect(() => {
    // Если есть фигура для замены, выбранная ячейка и последняя поставленная фигура
    if (figureInsteadOfPawn && selectedCell && lastFigureCell) {
      // Задаём в класе Board переменную с именем фигуры, которая заменит текущую пешку
      lastFigureCell.board.setFigureInsteadOfPawn(figureInsteadOfPawn);
      selectedCell.moveFigure(lastFigureCell);
      setSelectedCell(null);
      // Меняем текущего игрока
      swapPlayer();
      // Просчитываем для каждой фигуры её допустимые ходы
      board.updateFiguresAvailability();
      setIsOpenModalForChangePawn(false);
      setFigureInsteadOfPawn(null);
    }
  }, [figureInsteadOfPawn]);

  return (
    <>
      <div className={style.boardWrapper}>
        <div className={style.board}>
          {/* для строк */}
          {board.cells.map((row, index) => (
            <Fragment key={index}>
              {/* для ячеек */}
              {row.map((cell, cellIndex) => (
                <CellComponent
                  key={cellIndex}
                  click={click}
                  cell={cell}
                  currentPlayer={currentPlayer}
                  selected={
                    cell.x === selectedCell?.x && cell.y === selectedCell?.y
                  }
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      {/* ТУТ ПРОСТО МОДАЛЬНЫЕ ОКНА: ВЫБОР ФИГУРЫ ВМЕСТО ПЕШКИ, ПАТ, МАТ */}
      {isOpenModalForChangePawn && (
        <div className={style.boardModalWrapper}>
          <div className={style.boardModal}>
            <h2 className={classNames("text-level-2", style.boardModalH2)}>
              Выберите фигуру
            </h2>
            <div className={style.boardModalFigures}>
              <Button
                onClick={() => setFigureInsteadOfPawn(FigureNames.QUEEN)}
                className={style.boardModalFigureButton}
              >
                {/* <img src="" alt="" /> */}
                <span className="text-level-4">Ферзь</span>
              </Button>
              <Button
                onClick={() => setFigureInsteadOfPawn(FigureNames.KNIGHT)}
                className={style.boardModalFigureButton}
              >
                {/* <img src="" alt="" /> */}
                <span className="text-level-4">Конь</span>
              </Button>
              <Button
                onClick={() => setFigureInsteadOfPawn(FigureNames.BISHOP)}
                className={style.boardModalFigureButton}
              >
                {/* <img src="" alt="" /> */}
                <span className="text-level-4">Слон</span>
              </Button>
              <Button
                onClick={() => setFigureInsteadOfPawn(FigureNames.ROOK)}
                className={style.boardModalFigureButton}
              >
                {/* <img src="" alt="" /> */}
                <span className="text-level-4">Ладья</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      {isOpenModalStalemate && (
        <div
          className={style.boardModalWrapper}
          onClick={() => {
            setIsOpenModalStalemate(false);
            restart();
          }}
        >
          <div className={style.boardModal}>
            <h2 className={classNames("text-level-2", style.boardModalH2)}>
              Пат
            </h2>
          </div>
        </div>
      )}
      {isOpenModalCheckmate && (
        <div
          className={style.boardModalWrapper}
          onClick={() => {
            setIsOpenModalCheckmate(false);
            restart();
          }}
        >
          <div className={style.boardModal}>
            <h2 className={classNames("text-level-2", style.boardModalH2)}>
              Мат
            </h2>
            <div className={classNames("text-level-4", style.boardModalText)}>
              {`Победил игрок
              ${
                currentPlayer?.color === Colors.BLACK
                  ? Colors.WHITE
                  : Colors.BLACK
              }`}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardComponent;
