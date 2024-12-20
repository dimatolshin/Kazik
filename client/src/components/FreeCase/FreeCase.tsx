import imgBg from "../../assets/png/bgFreeCase.png";
import { FreeCaseType } from "../../types/FreeCase";
import RuleteLine from "../RuleteLine/RuleteLine";
import style from "./FreeCase.module.scss";

interface FreeCaseProps {
  arrCase: FreeCaseType[];
}

function FreeCase({ arrCase }: FreeCaseProps) {
  return (
    <div className={style.box}>
      <div className={style.boxTitle}>
        <img className={style.imgTitle} src={imgBg} alt="" />
        <h2 className={style.title}>Бесплатные <br/> подарки</h2>
      </div>
      <div className={style.boxRoulet}>
        <RuleteLine arrPrize={arrCase} />
      </div>
      <div className={style.boxList}>
        <h3 className={style.titleList}>Список призов:</h3>
        {arrCase ? (
          <ul className={style.list}>
            {arrCase.map((item) => (
              <li key={item.id} className={style.item}>
                <img
                  className={style.img}
                  src={`https://api.zerkalogm.online${item.image}`}
                  alt=""
                />
                <p className={style.descr}>{item.text}</p>
                <p className={style.descrInfo}>{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div>Loader...</div>
        )}
      </div>
    </div>
  );
}

export default FreeCase;
