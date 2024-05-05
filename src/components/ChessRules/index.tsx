import style from "./index.module.scss";
import classNames from "classnames";

const ChessRules = () => {
  return (
    <div className={style.chessRules}>
      <h2 className={classNames("text-level-2", style.chessRulesH2)}>Краткие правила игры в шахматы</h2>
      <p className={classNames("text-level-4", style.chessRulesParagraph)}>
        Шахматы - это стратегическая настольная игра для двух игроков, которая
        разыгрывается на 64-клеточной доске. Одна сторона играет белыми, а
        другая - чёрными. Вот основные правила и обозначения, включая
        дополнительные детали:
      </p>
      <ol className={style.chessRulesOrderedList} style={{ paddingLeft: 0 }}>
        <li className={style.chessRulesOrderedListItem}>
          <h3 className={classNames("text-level-3", style.chessRulesH3)}>1. Доска и Расстановка:</h3>
          <ul className={style.chessRulesUnorderedList}>
            <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
              Доска состоит из 64 квадратных клеток, разделенных на 8
              горизонтальных рядов и 8 вертикальных столбцов.
            </li>
            <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
              Каждая сторона начинает с 16 фигур: 1 король, 1 ферзь, 2 ладьи, 2
              коня, 2 слона и 8 пешек.
            </li>
          </ul>
        </li>
        <li className={style.chessRulesOrderedListItem}>
          <h3 className={classNames("text-level-3", style.chessRulesH3)}>2. Фигуры:</h3>
          <ul className={style.chessRulesUnorderedList}>
            <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
              K (King) - король
            </li>
            <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
              Q (Queen) - ферзь
            </li>
            <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
              R (Rook) - ладья
            </li>
            <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
              N (Knight) - конь
            </li>
            <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
              B (Bishop) - слон
            </li>
            <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
              P (Pawn) - пешка
            </li>
          </ul>
        </li>
        <li className={style.chessRulesOrderedListItem}>
          <h3 className={classNames("text-level-3", style.chessRulesH3)}>3. Движение фигур:</h3>
          <ul className={style.chessRulesUnorderedList}>
            <li className={style.chessRulesUnorderedListItem}>
              <h4 className={classNames("text-level-4", style.chessRulesH4)}>Король (K):</h4>
              <ul className={style.chessRulesUnorderedList}>
                <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
                  Может двигаться на одну клетку в любом направлении.
                </li>
                <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
                  Может сделать рокировку, специальный ход, включающий короля и
                  одну из ладей. Рокировка бывает короткой (на одну клетку) и
                  длинной (на две клетки).
                </li>
              </ul>
            </li>

            <li className={style.chessRulesUnorderedListItem}>
              <h4 className={classNames("text-level-4", style.chessRulesH4)}>Ферзь (Q):</h4>
              <p className={classNames("text-level-4")}>
                {" "}
                Может двигаться по горизонтали, вертикали и диагонали на любое
                количество клеток.
              </p>
            </li>

            <li className={style.chessRulesUnorderedListItem}>
              <h4 className={classNames("text-level-4", style.chessRulesH4)}>Ладья (R):</h4>
              <p className={classNames("text-level-4")}>
                Может двигаться по горизонтали и вертикали на любое количество
                клеток.
              </p>
            </li>

            <li className={style.chessRulesUnorderedListItem}>
              <h4 className={classNames("text-level-4", style.chessRulesH4)}>Конь (N):</h4>
              <p className={classNames("text-level-4")}>
                Двигается в форме буквы "L": две клетки в одном направлении и
                одна перпендикулярно этому направлению.
              </p>
            </li>

            <li className={style.chessRulesUnorderedListItem}>
              <h4 className={classNames("text-level-4", style.chessRulesH4)}>Слон (B): </h4>
              <p className={classNames("text-level-4")}>Может двигаться по диагонали на любое количество клеток.</p>
            </li>

            <li className={style.chessRulesUnorderedListItem}>
              <h4 className={classNames("text-level-3", style.chessRulesH4)}>Пешка (P):</h4>
              <ul className={style.chessRulesUnorderedList}>
                <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
                  Может двигаться вперёд на одну клетку, но делает первый ход с
                  возможностью движения на две клетки.
                </li>
                <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
                  Бьет противника по диагонали, но двигается вперёд только
                  вертикально.
                </li>
                <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
                  При достижении последнего ряда пешка может превратиться в
                  любую другую фигуру (кроме короля) на выбор игрока.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className={style.chessRulesOrderedListItem}>
          <h3 className={classNames("text-level-3", style.chessRulesH3)}>4. Шах и мат:</h3>
          <ul className={style.chessRulesUnorderedList}>
            <li className={style.chessRulesUnorderedListItem}>
              <h4 className={classNames("text-level-4",style.chessRulesH4)}>Шах:</h4>
              <p className={classNames("text-level-4")}>
                Когда король одного игрока находится под угрозой захвата фигурой
                противника. Игрок, у которого король под шахом, должен
                предпринять меры для защиты.
              </p>
            </li>
            <li className={style.chessRulesUnorderedListItem}>
              <h4 className={classNames("text-level-4", style.chessRulesH4)}>Мат:</h4>
              <p className={classNames("text-level-4")}>
                Когда король одного игрока находится под шахом, и нет ходов,
                которые могли бы предотвратить захват короля. Игрок, у которого
                король мат, проигрывает партию.
              </p>
            </li>
          </ul>
        </li>
        <li className={style.chessRulesOrderedListItem}>
          <h3 className={classNames("text-level-3", style.chessRulesH3)}>5. Цель игры:</h3>
          <ul className={style.chessRulesUnorderedList}>
            <li className={classNames("text-level-4", style.chessRulesUnorderedListItem)}>
              Основная цель - поставить короля противника под шах и мат.
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default ChessRules;
