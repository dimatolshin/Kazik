import style from "./FortuneBox.module.scss";
import imgBg from "../../assets/png/fortuneWheel.png";
import WheelFortune from "../WheelFortune/WheelFortune";
import { useSelector } from "react-redux";
import { getWheel } from "../../providers/StoreProvider/selectors/getWheel";

function FortuneBox() {
    const arrWheel = useSelector(getWheel)
  return (
    <div className={style.box}>
      <div className={style.boxTitle}>
        <img className={style.imgTitle} src={imgBg} alt="" />
        <h2 className={style.title}>Free case</h2>
      </div>
      {arrWheel && (
        <WheelFortune arrWheel={arrWheel} />
      )}
    </div>
  );
}

export default FortuneBox;
