import { Button } from "../../ui/Button";
import style from "./Banner.module.scss";
import img from "../../assets/png/banner.png";
import { useTelegram } from "../../providers/telegram/telegram";

function Banner() {
  const { tg } = useTelegram();
  const swapLink = (link: string) => {
    tg.openLink(link, { try_instant_view: true });
  };
  return (
    <div className={style.box}>
      <img className={style.img} src={img} alt="" />
      <div className={style.boxBanner}>
        <h1 className={style.title}>
          Бонус на депозит <br /> до 500%
        </h1>
        <p className={style.descr}>
          Получайте до 500% от депозита <br /> на бонусные счета казино и ставок
        </p>
        <div className={style.boxBtn}>
          <Button
            onClick={() =>
              swapLink("https://igtrack.xyz/click?key=ff1ce163844ce90bfefa")
            }
            className={style.btn}
          >
            Получить бонус
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
