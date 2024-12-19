import { Link } from "react-router-dom";
import style from "./RuleteLine.module.scss";
import { Button } from "../../ui/Button";
import { FreeCaseType } from "../../types/FreeCase";
import { useTelegram } from "../../providers/telegram/telegram";

interface WinnerPrizeProps {
  onClose: () => void;
  prize: FreeCaseType;
  clearPrize: () => void
}

function WinnerPrize({ onClose, prize, clearPrize }: WinnerPrizeProps) {
  const {tg} = useTelegram()
  const handleClose = () => {
    onClose();
    clearPrize();
    tg.HapticFeedback.impactOccurred("medium")
  };

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

export default WinnerPrize;
