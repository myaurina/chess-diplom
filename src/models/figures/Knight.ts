import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

// ЛУЧШЕ ЧЕРЕЗ ДИНАМИЧЕСКИЙ ИМПОРТ ПЕРЕДЕЛАТЬ В БУДУЩЕМ
// Изображения фигур
import blackStandartLogo from "../../assets/chess/standart/black-knight.svg";
import whiteStandartLogo from "../../assets/chess/standart/white-knight.svg";
import blackStandartShadowLogo from "../../assets/chess/standart-shadow/black-knight.svg";
import whiteStandartShadowLogo from "../../assets/chess/standart-shadow/white-knight.svg";
import blackLegoLogo from "../../assets/chess/lego/black-knight.svg";
import whiteLegoLogo from "../../assets/chess/lego/white-knight.svg";

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

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureNames.KNIGHT;
    this.logo = defineFigure(color, cell.board.figuresImageType);
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    return (
      ((dx === 1 && dy === 2) || (dx === 2 && dy === 1)) &&
      this.cell.board.isSafeMove(this, target)
    );
  }
}
