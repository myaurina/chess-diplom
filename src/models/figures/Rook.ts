import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

// ЛУЧШЕ ЧЕРЕЗ ДИНАМИЧЕСКИЙ ИМПОРТ ПЕРЕДЕЛАТЬ В БУДУЩЕМ
// Изображения фигур
import blackStandartLogo from "../../assets/chess/standart/black-rook.svg";
import whiteStandartLogo from "../../assets/chess/standart/white-rook.svg";
import blackStandartShadowLogo from "../../assets/chess/standart-shadow/black-rook.svg";
import whiteStandartShadowLogo from "../../assets/chess/standart-shadow/white-rook.svg";
import blackLegoLogo from "../../assets/chess/lego/black-rook.svg";
import whiteLegoLogo from "../../assets/chess/lego/white-rook.svg";

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

export class Rook extends Figure {
  isFirstStep: boolean = true;

  constructor(
    color: Colors,
    cell: Cell,
    additionalOptions?: { isFirstStep?: boolean }
  ) {
    super(color, cell);
    this.name = FigureNames.ROOK;
    this.logo = defineFigure(color, cell.board.figuresImageType);
    if (typeof additionalOptions?.isFirstStep === "boolean") {
      this.isFirstStep = additionalOptions?.isFirstStep;
    }
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (
      this.cell.isEmptyVertical(target) &&
      this.cell.board.isSafeMove(this, target)
    )
      return true;
    if (
      this.cell.isEmptyHorizontal(target) &&
      this.cell.board.isSafeMove(this, target)
    )
      return true;
    return false;
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
