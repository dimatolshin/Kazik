import img from "../../assets/png/Image.png";
import { Button } from "../../ui/Button";
import style from "./Banner.module.scss";

function Banner() {
  return (
    <div className={style.box}>
      <div className={style.boxBanner}>
        <img className={style.img} src={img} alt="" />
        <Button className={style.btn}>Join now</Button>
      </div>
    </div>
  );
}

export default Banner;
