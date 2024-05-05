import { useEffect, useState, useContext } from "react";
import { BoardComponent } from "../../components";
import { Board, GAME_STATE_KEY } from "../../models/Board";
import { Player } from "../../models/Player";
import { Colors } from "../../models/Colors";
import LostFigures from "../../components/LostFigures";
import { Button } from "../../components";
import style from "./index.module.scss";
import classNames from "classnames";
import ApplicationSettingsContext from "../../contexts/application-settings";

const GameHotSeat = () => {
  // Достаём из контекста значение настроек приложения
  const appSettings = useContext(ApplicationSettingsContext);
  // состояние доски шахмат
  const [board, setBoard] = useState(
    new Board({ figuresImageType: appSettings?.figuresImageType || "standart" })
  );
  const [whitePlayer, _setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, _setBlackPlayer] = useState(new Player(Colors.BLACK));
  // Состояние текущего игрока
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  // Функция смены игрока
  function swapPlayer() {
    if (currentPlayer?.color) {
      // Сохраняем текущие данные в LocalStorage браузера
      board.saveGameState(
        currentPlayer?.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
      );
    }
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  function restart() {
    // содаём доску
    const newBoard = new Board({
      figuresImageType: appSettings?.figuresImageType || "standart",
    });
    // инициализируем ячейки
    newBoard.initCells();
    // расставляем базовые фигуры
    newBoard.addFigures();
    // обновляем данные о том, какие фигуры могут сделать ход, а какие нет
    newBoard.updateFiguresAvailability();
    // записываем результат в состояние доски
    setCurrentPlayer(whitePlayer);
    // Сохраняем текущие данные в LocalStorage браузера
    newBoard.saveGameState(Colors.WHITE);
    setBoard(newBoard);
  }

  // При создании компонента проверяем есть ли в localStorage состояние предыдущей игры, и,
  // если есть, то загружаем его с помощью создаём игру с помощью loadGameState, иначе созадеём
  // новое с помощью функции restart, так же устанавливаем текущего игрока
  useEffect(() => {
    try {
      if (localStorage.getItem(GAME_STATE_KEY)) {
        const gameState = board.loadGameState();
        setCurrentPlayer(
          gameState?.currentPlayerColor === Colors.BLACK
            ? blackPlayer
            : whitePlayer
        );
      } else {
        restart();
        setCurrentPlayer(whitePlayer);
      }
    } catch (error) {
      console.log(error);

      localStorage.removeItem(GAME_STATE_KEY);
    }
  }, []);

  return (
    <div className={style.gameHotseatWrapper}>
      <h1 className={classNames("text-level-1", style.gameHotseatTitle)}>
        Текущий игрок {currentPlayer?.color}
      </h1>
      <div className={style.gameHotseatInner}>
        {board.cells.length > 0 && (
          <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            swapPlayer={swapPlayer}
            restart={restart}
          />
        )}
        <div className={style.gameHotseatInfo}>
          <div className={style.lostFiguresWrapper}>
            <LostFigures
              title={"Черные фигуры"}
              figures={board.lostBlackFigures}
            />
            <LostFigures
              title={"Белые фигуры"}
              figures={board.lostWhiteFigures}
            />
          </div>
          <Button
            className={style.restartButton}
            onClick={() => {
              restart();
            }}
          >
            <span className="text-level-3">Начать заново</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameHotSeat;
