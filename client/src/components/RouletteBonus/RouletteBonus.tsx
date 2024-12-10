import dailyImg from "../../assets/png/dailyBonus.png";
import wheelImg from "../../assets/png/wheelBonus.png";
import caseImg from "../../assets/png/freeCase.png";
import BonusDailySvg from "../../assets/svg/BonusDailySvg/BonusDailySvg";
import style from "./RouletteBonus.module.scss";

function RouletteBonus() {
  return (
    <div className={style.box}>
      <div style={{ marginBottom: "7px" }} className={style.boxBonus}>
        <span className={style.span}>Reward!</span>
        <img className={style.img} src={dailyImg} alt="" />
        <div className={style.daily}>
          <BonusDailySvg className={style.svg} />
          <p className={style.descrDaily}>Daily <br /> bonus</p>
        </div>
      </div>
      <div className={style.boxBonusTwo}>
        <div className={style.boxBonus}>
          <span className={style.span}>Available</span>
          <img src={wheelImg} alt="" />
          <p className={style.descr}>
            Wheel <br /> of Fortune
          </p>
        </div>
        <div className={style.boxBonus}>
          <span className={style.span}>Gift!</span>
          <img src={caseImg} alt="" />
          <p className={style.descr}>
            Free <br /> case
          </p>
        </div>
      </div>
    </div>
  );
}

export default RouletteBonus;
