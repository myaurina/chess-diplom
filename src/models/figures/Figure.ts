import { Colors } from '../Colors';
import logo from '../../assets/chess/black-king.png';
import { Cell } from '../Cell';

// Перечисление возможных фигур
export enum FigureNames {
  FIGURE = 'Фигура',
  KING = 'Король',
  KNIGHT = 'Конь',
  PAWN = 'Пешка',
  QUEEN = 'Ферзь',
  ROOK = 'Ладья',
  BISHOP = 'Слон',
}

// Здесь происходит кольцевая зависимость
// (фигура знает про ячейку, на которой она находится, а ячейка знают про фигуру, котороя на ней находится).
// Кольцевая зависимость не всегда плохо

// Класс самой фигуры
export class Figure {
  color: Colors; // цвет фигруы
  logo: typeof logo | null; // логотип фигуры
  cell: Cell; // ячейка, на которой стоит фигура
  name: FigureNames; // имя фигуры
  id: number;
  isFirstStep?: boolean;
  isAvailable: boolean = true; // добавляем флаг доступности

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this; // на ячейку сразу добавляем фигуры (удобство кольцевой зависимости)
    this.logo = null; // логотип фигуры
    this.name = FigureNames.FIGURE; // имя фигуры
    this.id = Math.random();
  }

  // Метод, определяющиций можно ли переместить фигуру на target ячейку
  canMove(target: Cell): boolean {
    // нельзя жрать своих
    if (target.figure?.color === this.color) return false;
    // в остальных случаях можно :-)
    // (но не стоит забывать, что данный метод есть и у дочерних классов,
    // а именно этот вызывается из super())
    return true;
  }

  // Метод для перемещения фигуры
  moveFigure(target: Cell) {
    console.log(target);
  }

  // Обновляем доступность фигуры (может ли данная фигура делать сходиться в данный ход) в зависимости от шаха
  updateAvailability() {
    const board = this.cell.board;
    const originalCell = this.cell;

    // Предположим, что фигура перемещается на новую позицию
    for (let i = 0; i < board.cells.length; i++) {
      for (let j = 0; j < board.cells[i].length; j++) {
        const targetCell = board.cells[i][j];

        // Проверяем, можно ли двигаться на целевую ячейку
        if (this.canMove(targetCell)) {
          const originalFigure = targetCell.figure;

          // Симулируем перемещение
          originalCell.figure = null; // удаляем фигуру из текущей ячейки
          targetCell.figure = this; // добавляем в целевую

          // Проверяем, находится ли король в шахе после перемещения
          const isInCheck = board.isKingInCheck(this.color);

          // Восстанавливаем оригинальное состояние
          originalCell.figure = this; // возвращаем обратно
          targetCell.figure = originalFigure; // восстанавливаем оригинальное состояние

          if (!isInCheck) {
            this.isAvailable = true; // если не шах, то фигура доступна
            return; // если нашли хоть один допустимый ход, то выходим
          }
        }
      }
    }

    this.isAvailable = false;
  }
}
