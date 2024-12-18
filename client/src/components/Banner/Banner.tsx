import { Button } from "../../ui/Button";
import style from "./Banner.module.scss";
import img from '../../assets/png/banner.png'

function Banner() {
  return (
    <div className={style.box}>
      <img className={style.img} src={img} alt="" />
      <div className={style.boxBanner}>
        <h1 className={style.title}>Бонус на депозит <br/> до 500%</h1>
        <p className={style.descr}>Получайте до 500% от депозита <br/> на бонусные счета казино и ставок</p>
        <div className={style.boxBtn}>
          <Button className={style.btn}>Получить бонус</Button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
