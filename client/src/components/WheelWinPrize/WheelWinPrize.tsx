import { Link } from "react-router-dom";
import { WheelFortyneType } from "../../types/WheelFortune";
import { Button } from "../../ui/Button";
import style from "./WheelWinPrize.module.scss";
import { useTelegram } from "../../providers/telegram/telegram";

interface WheelWinPrizeProps {
  prize: WheelFortyneType;
  onClose: () => void;
}

function WheelWinPrize({ prize, onClose }: WheelWinPrizeProps) {
  const {tg} = useTelegram()
  const handleClose = () => {
    onClose()
    tg.HapticFeedback.impactOccurred("medium")
  }
  
  return (
    <div className={style.boxModalWinner}>
      <h2 className={style.titleWinner}>Поздравляем!</h2>
      <p className={style.descrWinner}>
        Ваш выйгрыш находится в личном кабинете
      </p>
      {prize && (
        <img
          className={style.imgWinner}
          src={`https://api.zerkalogm.online${prize.image_without_background_url}`}
          alt=""
        />
      )}
      <Link to={"/provile"}>
        <Button onClick={handleClose} className={style.btnWinner}>
          Перейти в профиль
        </Button>
      </Link>
    </div>
  );
}

export default WheelWinPrize;
