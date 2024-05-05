import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

// ЛУЧШЕ ЧЕРЕЗ ДИНАМИЧЕСКИЙ ИМПОРТ ПЕРЕДЕЛАТЬ В БУДУЩЕМ
// Изображения фигур
import blackStandartLogo from "../../assets/chess/standart/black-queen.svg";
import whiteStandartLogo from "../../assets/chess/standart/white-queen.svg";
import blackStandartShadowLogo from "../../assets/chess/standart-shadow/black-queen.svg";
import whiteStandartShadowLogo from "../../assets/chess/standart-shadow/white-queen.svg";
import blackLegoLogo from "../../assets/chess/lego/black-queen.svg";
import whiteLegoLogo from "../../assets/chess/lego/white-queen.svg";

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

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureNames.QUEEN;
    this.logo = defineFigure(color, cell.board.figuresImageType);
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
    if (
      this.cell.isEmptyDiagonal(target) &&
      this.cell.board.isSafeMove(this, target)
    )
      return true;
    return false;
  }
}
