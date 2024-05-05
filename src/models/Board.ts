import { Cell } from './Cell';
import { Colors } from './Colors';
import { Bishop } from './figures/Bishop';
import { Figure, FigureNames } from './figures/Figure';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { LostFigure } from './figures/LostFigure';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';

export const GAME_STATE_KEY = 'chessGameState';

interface IBoardConstructor {
  figuresImageType: string;
}

const createFigure = (
  color: Colors,
  cell: Cell,
  figureName: FigureNames,
  additionalOptions?: { isFirstStep: boolean },
) => {
  if (figureName === FigureNames.BISHOP) return new Bishop(color, cell);
  if (figureName === FigureNames.KING) return new King(color, cell, additionalOptions);
  if (figureName === FigureNames.KNIGHT) return new Knight(color, cell);
  if (figureName === FigureNames.PAWN) return new Pawn(color, cell, additionalOptions);
  if (figureName === FigureNames.QUEEN) return new Queen(color, cell);
  if (figureName === FigureNames.ROOK) return new Rook(color, cell, additionalOptions);
};

// Класс для доски
export class Board {
  // Ячейки (массив объектов от класса Cell
  cells: Cell[][] = [];
  // Съеденные черные фигуры
  lostBlackFigures: Figure[] = [];
  // Съеденные белые фигуры
  lostWhiteFigures: Figure[] = [];
  // Фигура, которая заменит пешку, дошедшую до противоположенного края
  figureInsteadOfPawn: FigureNames | null = null;

  figuresImageType: string = 'standart';

  constructor({ figuresImageType }: IBoardConstructor) {
    this.figuresImageType = figuresImageType;
  }

  // Метод для инициализации ячеек
  public initCells() {
    // Формируем строки
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      // Формируем строку
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          // доска, x координата, y координата, цвет и фигура (сначала null, то есть ничего не ставим)
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // Черные ячейки
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // Белые ячейки
        }
      }
      this.cells.push(row);
    }
  }

  // Создать новую доску на основе старой
  // (чтобы данные поменялись на те же, но из-за этого произойдет перерендер в шаблонах)
  public getCopyBoard(): Board {
    const newBoard = new Board({ figuresImageType: 'standart' });
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  // Метод для получения клетки доски по XY координатам
  public getCell(x: number, y: number): Cell {
    return this.cells[y][x];
  }

  // Метод для добавления пешек на доску
  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  // Метод для добавления королей на доску
  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }

  // Метод для добавления ферзей/королев на доску
  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  // Метод для добавления слонов на доску
  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  // Метод для добавления коней/рыцарей на доску
  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  // Метод для добавления ладей на доску
  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  // Метод для добавления всех фигур на доску
  public addFigures() {
    this.addPawns();
    this.addKnights();
    this.addKings();
    this.addBishops();
    this.addQueens();
    this.addRooks();
  }

  // Проверка на то, объявлен ли шах королю
  public isKingInCheck(color: Colors): boolean {
    // Найдите короля данного цвета
    let kingCell: Cell | null = null;
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        if (cell.figure?.name === FigureNames.KING && cell.figure.color === color) {
          kingCell = cell;
          break;
        }
      }
    }

    if (!kingCell) return false;

    // Проверьте, могут ли фигуры противника атаковать короля
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        if (cell.figure?.color !== color && cell.figure?.canMove(kingCell)) {
          return true;
        }
      }
    }

    return false;
  }

  // Метод, чтобы проверить, безопасно ли перемещать фигуру
  // (при данном перемещении оставить короля в безопасности)
  public isSafeMove(figure: Figure, target: Cell): boolean {
    const originalCell = figure.cell;
    const originalTargetFigure = target.figure;

    // Симулировать перемещение
    target.figure = figure; // Установите фигуру в целевую ячейку
    originalCell.figure = null; // Очистите исходную ячейку

    // Проверьте, создаёт ли это шах
    const isInCheck = this.isKingInCheck(figure.color);

    // Восстановите оригинальное состояние
    target.figure = originalTargetFigure; // Восстановите целевую ячейку
    originalCell.figure = figure; // Восстановите исходную ячейку

    return !isInCheck;
  }

  // Метод, который вызывает у каждой фигуры метод updateAvailability на проверку того, доступна ли данная фигура для текущего хода
  // это нужно для того, чтобы узнать надо ли ей добавлять прозрачность, а также, в случае если все фигуры не могут ходить,
  // то получается одна из двух ситуаций - пат или мат
  public updateFiguresAvailability() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        if (cell.figure) {
          cell.figure.updateAvailability();
        }
      });
    });
  }

  // Метод, который проверяет, есть ли мат или пат
  // (для окончания игры, надо проверять после каждого хода)
  public isCheckmateOrStalemate(color: Colors): string | null {
    const board = this;
    const kingInCheck = board.isKingInCheck(color);

    // Проходим по каждой ячейке на доске
    for (let i = 0; i < board.cells.length; i++) {
      for (let j = 0; j < board.cells[i].length; j++) {
        const cell = board.cells[i][j];
        const figure = cell.figure;

        if (figure && figure.color === color) {
          // Проверяем, может ли эта фигура сделать хоть один безопасный ход
          for (let x = 0; x < board.cells.length; x++) {
            for (let y = 0; y < board.cells[x].length; y++) {
              const targetCell = board.cells[x][y];

              if (figure.canMove(targetCell) && board.isSafeMove(figure, targetCell)) {
                // Если хотя бы один безопасный ход найден, нет ни пата, ни мата
                return null;
              }
            }
          }
        }
      }
    }

    // Если король в шахе и нет безопасных ходов, это мат
    if (kingInCheck) {
      return 'Мат';
    }

    // Если король не в шахе, но нет безопасных ходов, это пат
    return 'Пат';
  }

  // Метод для записи в поле figureInsteadOfPawn какой-либо фигуры
  public setFigureInsteadOfPawn(figureName: FigureNames) {
    this.figureInsteadOfPawn = figureName;
  }

  /*
    Что делает simulateCheck:
    - Симулирует перемещение короля на целевую ячейку.
    - Проверяет, будет ли король под шахом после этого перемещения.
    - Восстанавливает исходное состояние, чтобы не повлиять на игру.
    
    Этот подход обеспечивает более точную проверку всех условий рокировки, включая пустые ячейки, 
    предыдущее перемещение короля и ладьи, а также отсутствие шаха во время и после рокировки.
  */

  public simulateCheck(king: Figure, x: number, y: number): boolean {
    const board = king.cell.board;
    const originalCell = king.cell;
    const targetCell = board.getCell(x, y);

    // Симулируем перемещение короля
    targetCell.figure = king;
    originalCell.figure = null;

    const isInCheck = board.isKingInCheck(king.color);

    // Восстановление исходного состояния
    targetCell.figure = null;
    originalCell.figure = king;

    return isInCheck;
  }

  // Метод для проверки доступна ли рокировка
  public checkAvailableCastling(selectedCell: Cell, target: Cell): boolean {
    const board = selectedCell.board;

    // Убедимся, что король и ладья не двигались ранее
    if (
      selectedCell?.figure?.name === FigureNames.KING &&
      selectedCell?.figure.isFirstStep === true &&
      target.figure?.name === FigureNames.ROOK &&
      target.figure.isFirstStep === true
    ) {
      const king = selectedCell.figure;
      const rook = target.figure;

      // Проверим цвета
      if (king.color !== rook.color) {
        return false;
      }

      const y = selectedCell.y; // строка на доске (y-координата)

      // Позиции короля и ладьи
      const rookStartX = target.x; // исходная позиция ладьи

      // Проверяем ближайшую рокировку (короткая рокировка)
      if (rookStartX === 7) {
        // Убедимся, что между королём и ладьёй нет фигур
        if (board.getCell(5, y).isEmpty() && board.getCell(6, y).isEmpty()) {
          // Проверяем, что король не под шахом и не пересекает шах
          if (
            !board.isKingInCheck(king.color) &&
            !this.simulateCheck(king, 5, y) &&
            !this.simulateCheck(king, 6, y)
          ) {
            return true;
          }
        }
      }

      // Проверяем дальнюю рокировку (длинная рокировка)
      if (rookStartX === 0) {
        // Убедимся, что между королём и ладьёй нет фигур
        if (
          board.getCell(1, y).isEmpty() &&
          board.getCell(2, y).isEmpty() &&
          board.getCell(3, y).isEmpty()
        ) {
          // Проверяем, что король не под шахом и не пересекает шах
          if (
            !board.isKingInCheck(king.color) &&
            !this.simulateCheck(king, 3, y) &&
            !this.simulateCheck(king, 2, y)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Передаем выбранную клетку, подсвечиваем те, на которые можно будет сходить
  public hightlightCells(selectedCell: Cell | null) {
    // Проходимся по всем имеющимся на доске клеткам
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        // в поле available клетки нашей доски заносим boolean значение, и,
        // если фигура, которая в данный момент выбрана, может сделать на неё ход,
        // то устанавливаем true, иначе false
        target.available = !!selectedCell?.figure?.canMove(target);
        // Для роикровки
        // Если выбран король, король ещё не ходил и таргет фигура - это ладья, которая тоже ещё не ходила, то:
        if (selectedCell && this.checkAvailableCastling(selectedCell, target)) {
          target.available = true;
        }
      }
    }
  }

  // Загрузка состояния игры из localStorage
  public loadGameState(): null | GameState {
    const gameStateFromLS = localStorage.getItem(GAME_STATE_KEY);
    if (!gameStateFromLS) return null;

    const data: GameState = JSON.parse(gameStateFromLS);
    this.cells = [];
    this.lostBlackFigures = [];
    this.lostWhiteFigures = [];

    // Заполняем данные ячеек
    data.figures.forEach((row, rowInd) => {
      const _row: Cell[] = [];
      row.forEach((cell, cellInd) => {
        let _cell: Cell | null = null;
        if ((rowInd + cellInd) % 2 !== 0) {
          // доска, x координата, y координата, цвет и фигура (сначала null, то есть ничего не ставим)
          _cell = new Cell(this, cellInd, rowInd, Colors.BLACK, null); // Белые ячейки
        } else {
          // доска, x координата, y координата, цвет и фигура (сначала null, то есть ничего не ставим)
          _cell = new Cell(this, cellInd, rowInd, Colors.WHITE, null); // Белые ячейки
        }

        if (cell.x === cellInd && cell.y === rowInd && cell.figureName && cell.figureColor) {
          createFigure(cell.figureColor, _cell, cell.figureName, {
            isFirstStep: cell.isFirstStep,
          });
        }
        _row.push(_cell);
      });
      this.cells.push(_row);
    });

    // Заполняем съеденные чёрные фигуры
    const _lostBlackFigures = data.lostBlackFigures.map((figure) => {
      return new LostFigure(figure.figureColor, figure.figureName, this.figuresImageType);
    });
    this.lostBlackFigures = _lostBlackFigures as unknown as Figure[];
    // Вызываем метод загрузки логотипов
    this.lostBlackFigures.forEach(async (lostFigure) => {
      const _lostFigure = lostFigure as unknown as LostFigure;
      await _lostFigure.loadLogo();
    });

    // Заполняем съеденные белые фигуры
    const _lostWhiteFigures = data.lostWhiteFigures.map((figure) => {
      return new LostFigure(figure.figureColor, figure.figureName, this.figuresImageType);
    });
    this.lostWhiteFigures = _lostWhiteFigures as unknown as Figure[];
    // Вызываем метод загрузки логотипов
    this.lostWhiteFigures.forEach(async (lostFigure) => {
      const _lostFigure = lostFigure as unknown as LostFigure;
      await _lostFigure.loadLogo();
    });
    return data;
  }

  // Сохранение состояния игры в localStorage
  public saveGameState(currentPlayerColor: Colors): void {
    const figures = this.cells.map((row) => {
      return row.map((cell) => {
        return {
          x: cell.x,
          y: cell.y,
          isFirstStep: cell.figure?.isFirstStep ?? true,
          figureName: cell.figure?.name ?? null,
          figureColor: cell.figure?.color ?? null,
        };
      });
    });
    const lostBlackFigures = this.lostBlackFigures.map((figure) => {
      return {
        figureName: figure.name,
        figureColor: figure.color,
      };
    });
    const lostWhiteFigures = this.lostWhiteFigures.map((figure) => {
      return {
        figureName: figure.name,
        figureColor: figure.color,
      };
    });
    const result = {
      figures: figures,
      currentPlayerColor,
      lostBlackFigures,
      lostWhiteFigures,
    };
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(result));
  }
}

interface GameState {
  figures: {
    x: number;
    y: number;
    figureName: FigureNames | null;
    figureColor: Colors | null;
    isFirstStep: boolean;
  }[][];
  currentPlayerColor: Colors;
  lostBlackFigures: {
    figureName: FigureNames;
    figureColor: Colors;
  }[];
  lostWhiteFigures: {
    figureName: FigureNames;
    figureColor: Colors;
  }[];
}
