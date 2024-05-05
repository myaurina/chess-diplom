import { Board } from "./Board";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

// Здесь происходит кольцевая зависимость
// (доска знает про ячейки, которые на ней находятся, а ячейки знают про доску, на которой они находятся).
// Кольцевая зависимость не всегда плохо

// Класс для ячейки доски
export class Cell {
  readonly x: number; // координата x
  readonly y: number; // координата y
  readonly color: Colors; // цвет из перечисления цветов Colors (WHITE | BLACK)
  figure: Figure | null; // фигура, которая стоит на ячейке или null
  board: Board; // доска, где находится ячейка
  available: boolean; // Может сходить на эту ячейку или нет
  id: number; // Для react ключей

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.id = Math.random();
  }

  // Метод для проверки того имеется ли фигура врага на target клетке
  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  // Метод для проверки того имеется ли фигура на текущей/данной/this клетке
  isEmpty() {
    return this.figure === null;
  }

  // Проверяет на пустоту вертикаль
  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y); // вычисляем минимально возможную координату клетки по y
    const max = Math.max(this.y, target.y); // вычисляем максимально возможную координату клетки по y

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        // если ячейка не пуста
        return false;
      }
    }
    return true;
  }

  // Проверяет на пустоту горизонталь
  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x); // вычисляем минимально возможную координату клетки по x
    const max = Math.max(this.x, target.x); // вычисляем максимально возможную координату клетки по x
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        // если ячейка не пуста
        return false;
      }
    }
    return true;
  }

  // Проверяет на пустоту диагональ
  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absX !== absY) return false;

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }
    return true;
  }

  // Метод для установки фигуры вместо текущей
  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  // метод для добавления фигуры в массив съеденных
  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.board.lostBlackFigures.push(figure)
      : this.board.lostWhiteFigures.push(figure);
  }

  /*
  Метод castlingMove
  Этот метод отвечает за выполнение рокировки, если она допустима. Вот что он делает:

  Определяет корректные позиции короля и ладьи:
  - В зависимости от стартовых позиций, определяет, какой вариант рокировки будет использован.
  Перемещает короля и ладью в соответствии с выбранной рокировкой:
  - Если рокировка допустима, король и ладья перемещаются на новые позиции.
  - После перемещения они теряют право на рокировку (isFirstStep = false).
  Использует функцию-предикат для определения, где должны находиться король и ладья для выполнения рокировки:
  - Функция kingAndRookPositionCondition позволяет определить, находятся ли фигуры на правильных позициях для выполнения рокировки.
  */

  // Метод для выполнения рокировки короля и ладьи 
  // не путать с функцией checkAvailableCastling из класса Board, которая проверяет ВОЗМОЖНОСТЬ рокировки
  public castlingMove(target: Cell) {
    // Функция-предикат для узнавания нахождения короля/ладьи на нужных клетках
    const kingAndRookPositionCondition = (
      oldKingX: number,
      oldKingY: number,
      oldRookX: number,
      oldRookY: number
    ) => {
      return (
        this.figure!.cell.x === oldKingX &&
        this.figure!.cell.y === oldKingY &&
        target.figure!.cell.x === oldRookX &&
        target.figure!.cell.y === oldRookY
      );
    };
    // Функция для совершения  рокировки
    const castling = (
      newKingX: number,
      newKingY: number,
      newRookX: number,
      newRookY: number
    ) => {
      const newKing = new King(
        this.figure!.color,
        this.board.getCell(newKingX, newKingY)
      );
      newKing.isFirstStep = false;
      const newRook = new Rook(
        this.figure!.color,
        this.board.getCell(newRookX, newRookY)
      );
      newRook.isFirstStep = false;
      this.figure = null;
      target.figure = null;
    };
    
    if (
      this.figure &&
      this.figure?.canMove(target) &&
      this.figure.name === FigureNames.KING &&
      this.figure.isFirstStep &&
      target.figure?.name === FigureNames.ROOK &&
      target.figure.isFirstStep
    ) {
      if (kingAndRookPositionCondition(4, 7, 7, 7)) castling(6, 7, 5, 7);
      else if (kingAndRookPositionCondition(4, 0, 7, 0)) castling(6, 0, 5, 0);
      else if (kingAndRookPositionCondition(4, 7, 0, 7)) castling(2, 7, 3, 7);
      else if (kingAndRookPositionCondition(4, 0, 0, 0)) castling(2, 0, 3, 0);

      return;
    }
  }

  // Функция перемещения фигуры
  // target - ячейка, на которую мы хотим переместить фигуру
  moveFigure(target: Cell) {
    // Рокировка
    this.castlingMove(target);

    if (this.figure && this.figure?.canMove(target)) {
      this.figure?.moveFigure(target);
      if (target.figure) {
        this.addLostFigure(target.figure);
      }

      // Пешка может измениться
      if (
        this.figure.name === FigureNames.PAWN &&
        ((target.y === 0 && this.figure.color === Colors.WHITE) ||
          (target.y === 7 && this.figure.color === Colors.BLACK))
      ) {
        if (this.board.figureInsteadOfPawn === FigureNames.KNIGHT) {
          new Knight(this.figure.color, this.board.getCell(target.x, target.y));
        } else if (this.board.figureInsteadOfPawn === FigureNames.BISHOP) {
          new Bishop(this.figure.color, this.board.getCell(target.x, target.y));
        } else if (this.board.figureInsteadOfPawn === FigureNames.ROOK) {
          new Rook(this.figure.color, this.board.getCell(target.x, target.y));
        } else if (this.board.figureInsteadOfPawn === FigureNames.QUEEN) {
          new Queen(this.figure.color, this.board.getCell(target.x, target.y));
        }
        this.figure = null;
      } else {
        target.setFigure(this.figure);
        this.figure = null;
      }
    }
  }
}
