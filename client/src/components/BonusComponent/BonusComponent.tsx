import dailyImg from "../../assets/png/dailyBonus.png";
import wheelImg from "../../assets/png/wheelBonus.png";
import caseImg from "../../assets/png/freeCase.png";
import BonusDailySvg from "../../assets/svg/BonusDailySvg/BonusDailySvg";
import style from "./BonusComponent.module.scss";
import Modal from "../../ui/Modal/Modal";
import { useState } from "react";
import DailyBonus from "../DailyBonus/DailyBonus";
import { useTelegram } from "../../providers/telegram/telegram";
import { useNavigate } from "react-router-dom";

function BonusComponent() {
  const { tg } = useTelegram();

  const [dailyBonus, setDailyBonus] = useState(false);
  const navigate = useNavigate();

  const hanldeFreeCaseOpen = () => {
    tg.HapticFeedback.impactOccurred("medium");
    navigate("/case");
  };

  const hanldeWheelFortuneOpen = () => {
    tg.HapticFeedback.impactOccurred("medium");
    navigate("/wheel");
  };

  const hanldeDailyBonusOpen = () => {
    tg.HapticFeedback.impactOccurred("medium");
    setDailyBonus(true);
  };
  const hanldeDailyBonusClose = () => {
    setDailyBonus(false);
  };

  return (
    <>
      <div className={style.box}>
        <div
          onClick={hanldeDailyBonusOpen}
          style={{ marginBottom: "7px" }}
          className={style.boxBonus}
        >
          <span className={style.span}>Награды!</span>
          <img className={style.img} src={dailyImg} alt="" />
          <div className={style.daily}>
            <BonusDailySvg className={style.svg} />
            <p className={style.descrDaily}>
              Ежедневный <br /> бонус
            </p>
          </div>
        </div>
        <div className={style.boxBonusTwo}>
          <div
            onClick={hanldeWheelFortuneOpen}
            className={`${style.boxBonusMin} ${style.boxBonus}`}
          >
            <span className={style.span}>Достуно!</span>
            <img src={wheelImg} alt="" />
            <p className={style.descr}>
              Колесо <br /> фортуны
            </p>
          </div>
          <div
            onClick={hanldeFreeCaseOpen}
            className={`${style.boxBonusMin} ${style.boxBonus}`}
          >
            <span className={style.span}>Подарки!</span>
            <img src={caseImg} alt="" />
            <p className={style.descr}>
              Бесплатные <br /> подарки
            </p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={dailyBonus}
        onClose={hanldeDailyBonusClose}
        lazy
        hiddenClose
      >
        <DailyBonus />
      </Modal>
    </>
  );
}

export default BonusComponent;
