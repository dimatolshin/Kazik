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

function BonusComponent() {
  const arrCase = useSelector(getCase);

  const [freeCases, setFreeCase] = useState(false);
  const [wheelFortune, setWheelFortune] = useState(false);

  const hanldeFreeCaseOpen = () => {
    setFreeCase(true);
  };
  const hanldeFreeCaseClose = () => {
    setFreeCase(false);
  };

  const hanldeWheelFortuneOpen = () => {
    setWheelFortune(true);
  };
  const hanldeWheelFortuneClose = () => {
    setWheelFortune(false);
  };

  return (
    <>
      <div className={style.box}>
        <div style={{ marginBottom: "7px" }} className={style.boxBonus}>
          <span className={style.span}>Награды!</span>
          <img className={style.img} src={dailyImg} alt="" />
          <div className={style.daily}>
            <BonusDailySvg className={style.svg} />
            <p className={style.descrDaily}>
              Ежедневнный <br /> бонус
            </p>
          </div>
        </div>
        <div className={style.boxBonusTwo}>
          <div
            onClick={hanldeWheelFortuneOpen}
            className={`${style.boxBonusMin} ${style.boxBonus}`}
          >
            <span className={style.span}>Достуное!</span>
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
      <Modal isOpen={freeCases} onClose={hanldeFreeCaseClose} lazy hiddenClose>
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
        <FortuneBox />
      </Modal>
    </>
  );
}

export default BonusComponent;
