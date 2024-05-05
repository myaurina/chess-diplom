import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

// ЛУЧШЕ ЧЕРЕЗ ДИНАМИЧЕСКИЙ ИМПОРТ ПЕРЕДЕЛАТЬ В БУДУЩЕМ
// Изображения фигур
import blackStandartLogo from "../../assets/chess/standart/black-bishop.svg";
import whiteStandartLogo from "../../assets/chess/standart/white-bishop.svg";
import blackStandartShadowLogo from "../../assets/chess/standart-shadow/black-bishop.svg";
import whiteStandartShadowLogo from "../../assets/chess/standart-shadow/white-bishop.svg";
import blackLegoLogo from "../../assets/chess/lego/black-bishop.svg";
import whiteLegoLogo from "../../assets/chess/lego/white-bishop.svg";

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

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    // Вызов конструктора родительского класса
    super(color, cell);
    this.name = FigureNames.BISHOP;
    this.logo = defineFigure(color, cell.board.figuresImageType);
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (
      this.cell.isEmptyDiagonal(target) &&
      this.cell.board.isSafeMove(this, target)
    )
      return true;
    return false;
  }
}
