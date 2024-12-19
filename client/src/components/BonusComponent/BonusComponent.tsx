import dailyImg from "../../assets/png/dailyBonus.png";
import wheelImg from "../../assets/png/wheelBonus.png";
import caseImg from "../../assets/png/freeCase.png";
import BonusDailySvg from "../../assets/svg/BonusDailySvg/BonusDailySvg";
import style from "./BonusComponent.module.scss";
import Modal from "../../ui/Modal/Modal";
import { useState } from "react";
import FreeCase from "../FreeCase/FreeCase";
import { useSelector } from "react-redux";
import { getCase } from "../../providers/StoreProvider/selectors/getCase";
import FortuneBox from "../FortuneBox/FortuneBox";
import DailyBonus from "../DailyBonus/DailyBonus";
import { useTelegram } from "../../providers/telegram/telegram";

function BonusComponent() {
  const arrCase = useSelector(getCase);
  const {tg} = useTelegram()
  const [freeCases, setFreeCase] = useState(false);
  const [wheelFortune, setWheelFortune] = useState(false);
  const [dailyBonus, setDailyBonus] = useState(false);

  const hanldeFreeCaseOpen = () => {
    tg.HapticFeedback.impactOccurred("medium")
    setFreeCase(true);
  };
  const hanldeFreeCaseClose = () => {
    setFreeCase(false);
  };

  const hanldeWheelFortuneOpen = () => {
    tg.HapticFeedback.impactOccurred("medium")
    setWheelFortune(true);
  };
  const hanldeWheelFortuneClose = () => {
    setWheelFortune(false);
  };

  const hanldeDailyBonusOpen = () => {
    tg.HapticFeedback.impactOccurred("medium")
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
        isOpen={freeCases} 
        onClose={hanldeFreeCaseClose} 
        lazy 
        hiddenClose
      >
        {arrCase && (
          <FreeCase onCloseModal={hanldeFreeCaseClose} arrCase={arrCase} />
        )}
      </Modal>
      <Modal
        isOpen={wheelFortune}
        onClose={hanldeWheelFortuneClose}
        lazy
        hiddenClose
        classNameContent={style.contentBg}
      >
        <FortuneBox onClose={hanldeWheelFortuneClose} />
      </Modal>
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
