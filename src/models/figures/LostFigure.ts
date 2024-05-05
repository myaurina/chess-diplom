import { Colors } from "../Colors";

type ImportResult = { default: string };

const transformFigureNameForFile = (name: FigureNames): string => {
  if (name === FigureNames.KING) {
    return "king";
  } else if (name === FigureNames.KNIGHT) {
    return "knight";
  } else if (name === FigureNames.PAWN) {
    return "pawn";
  } else if (name === FigureNames.QUEEN) {
    return "queen";
  } else if (name === FigureNames.ROOK) {
    return "rook";
  } else if (name === FigureNames.BISHOP) {
    return "bishop";
  } else {
    return "";
  }
};

const pathToLogo = async (
  figureName: FigureNames,
  figureColor: Colors,
  figuresImageType: string = "standard"
): Promise<string> => {
  const figureFileName = transformFigureNameForFile(figureName);
  const figureFileColor = figureColor === Colors.BLACK ? "black" : "white";

  const logo = (await import(
    `../../assets/chess/${figuresImageType}/${figureFileColor}-${figureFileName}.svg`
  )) as ImportResult;
  return logo.default;
};

// Перечисление возможных фигур
export enum FigureNames {
  FIGURE = "Фигура",
  KING = "Король",
  KNIGHT = "Конь",
  PAWN = "Пешка",
  QUEEN = "Ферзь",
  ROOK = "Ладья",
  BISHOP = "Слон",
}

// Здесь происходит кольцевая зависимость
// (фигура знает про ячейку, на которой она находится, а ячейка знают про фигуру, котороя на ней находится).
// Кольцевая зависимость не всегда плохо

// Класс самой фигуры
export class LostFigure {
  color: Colors; // цвет фигруы
  logo: string; // логотип фигуры
  name: FigureNames; // имя фигуры
  id: number;
  figuresImageType: string;

  constructor(
    color: Colors,
    figureName: FigureNames,
    figuresImageType: string
  ) {
    this.color = color;
    this.name = figureName;
    this.logo = "";
    this.figuresImageType = figuresImageType;
    this.id = Math.random();
  }

  public async loadLogo() {
    this.logo = await pathToLogo(this.name, this.color, this.figuresImageType);
  }
}
