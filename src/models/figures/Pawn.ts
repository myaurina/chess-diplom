import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

// ЛУЧШЕ ЧЕРЕЗ ДИНАМИЧЕСКИЙ ИМПОРТ ПЕРЕДЕЛАТЬ В БУДУЩЕМ
// Изображения фигур
import blackStandartLogo from "../../assets/chess/standart/black-pawn.svg";
import whiteStandartLogo from "../../assets/chess/standart/white-pawn.svg";
import blackStandartShadowLogo from "../../assets/chess/standart-shadow/black-pawn.svg";
import whiteStandartShadowLogo from "../../assets/chess/standart-shadow/white-pawn.svg";
import blackLegoLogo from "../../assets/chess/lego/black-pawn.svg";
import whiteLegoLogo from "../../assets/chess/lego/white-pawn.svg";

// Функция для определения того, какое изображение фигуры необходимо подставить
const defineFigure = (color: Colors, figuresImageType: string) => {
  if (color === Colors.BLACK) {
    if (figuresImageType === "standart-shadow") return blackStandartShadowLogo;
    if (figuresImageType === "lego") return blackLegoLogo;
    else return blackStandartLogo;
  } else {
    if (figuresImageType === "standart-shadow") return whiteStandartShadowLogo;
    if (figuresImageType === "lego") return whiteLegoLogo;
    else return whiteStandartLogo;
  }
};

export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(
    color: Colors,
    cell: Cell,
    additionalOptions?: { isFirstStep?: boolean }
  ) {
    super(color, cell);
    this.name = FigureNames.PAWN;
    this.logo = defineFigure(color, cell.board.figuresImageType);
    if (typeof additionalOptions?.isFirstStep === "boolean") {
      this.isFirstStep = additionalOptions?.isFirstStep;
    }
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    // Проверка движения на две клетки
    if (this.isFirstStep) {
      const intermediateCell = this.cell.board.getCell(
        this.cell.x,
        this.cell.y + direction
      );
      if (
        target.y === this.cell.y + firstStepDirection &&
        target.x === this.cell.x &&
        intermediateCell.isEmpty() && // должен быть пустой путь
        target.isEmpty() && // целевая ячейка должна быть пуста
        this.cell.board.isSafeMove(this, target) // безопасность короля
      ) {
        return true;
      }
    }

    // Проверка движения на одну клетку вперед
    if (
      target.y === this.cell.y + direction &&
      target.x === this.cell.x &&
      target.isEmpty() && // целевая ячейка должна быть пуста
      this.cell.board.isSafeMove(this, target) // безопасность короля
    ) {
      return true;
    }

    // Проверка взятия вражеской фигуры
    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target) &&
      this.cell.board.isSafeMove(this, target)
    ) {
      return true;
    }

    return false;
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
