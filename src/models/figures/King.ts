import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

// ЛУЧШЕ ЧЕРЕЗ ДИНАМИЧЕСКИЙ ИМПОРТ ПЕРЕДЕЛАТЬ В БУДУЩЕМ
// Изображения фигур
import blackStandartLogo from "../../assets/chess/standart/black-king.svg";
import whiteStandartLogo from "../../assets/chess/standart/white-king.svg";
import blackStandartShadowLogo from "../../assets/chess/standart-shadow/black-king.svg";
import whiteStandartShadowLogo from "../../assets/chess/standart-shadow/white-king.svg";
import blackLegoLogo from "../../assets/chess/lego/black-king.svg";
import whiteLegoLogo from "../../assets/chess/lego/white-king.svg";

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

export class King extends Figure {
  public isFirstStep: boolean = true;

  constructor(
    color: Colors,
    cell: Cell,
    additionalOptions?: { isFirstStep?: boolean }
  ) {
    super(color, cell);
    this.logo = defineFigure(color, cell.board.figuresImageType);
    this.name = FigureNames.KING;
    if (typeof additionalOptions?.isFirstStep === "boolean") {
      this.isFirstStep = additionalOptions?.isFirstStep;
    }
  }

  canMove(target: Cell): boolean {
    if (this.cell.board.checkAvailableCastling(this.cell, target)) {
      return true;
    }
    if (!super.canMove(target)) return false;
    const distX = Math.abs(target.x - this.cell.x) > 1;
    const distY = Math.abs(target.y - this.cell.y) > 1;
    if (distX || distY) return false;
    return this.cell.board.isSafeMove(this, target);
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
