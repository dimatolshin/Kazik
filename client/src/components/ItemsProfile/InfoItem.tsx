import toast from "react-hot-toast";
import { InventoryType } from "../../types/InventoryType";
import { Button } from "../../ui/Button";
import style from "./ItemsProfile.module.scss";
import { useTelegram } from "../../providers/telegram/telegram";
import CopySvg from "../../assets/svg/CopySvg/CopySvg";

const styles = {
  background: "#181c28",
  color: "#fff",
};

function InfoItem({ item }: { item: InventoryType }) {
  const { tg } = useTelegram();
  const swapLink = (link: string | undefined) => {
    tg.HapticFeedback.impactOccurred("medium")
    tg.openLink(link, { try_instant_view: true });
  };
  const copyToRefLink = async () => {
    tg.HapticFeedback.impactOccurred("medium")
    try {
      if (item.promo_code) {
        await navigator.clipboard.writeText(item.promo_code);
        toast.success("Ссылка скопирована в буфер обмена", { style: styles });
      }
    } catch (err) {
      toast.error("Ошибка при копировании", { style: styles });
    }
  };

  return (
    <div className={style.boxInfo}>
      <img
        className={style.imgWinner}
        src={`https://api.zerkalogm.online/${item.image_without_background_url}`}
        alt=""
      />
      {item.promo_code !== "" && (
        <Button onClick={copyToRefLink} className={style.boxCopy}>
          <h3 className={style.title}>Скопировать код</h3>
          <CopySvg />
        </Button>
      )}
      <Button onClick={() => swapLink(item.url_product)} className={style.btn}>
        Активировать
      </Button>
    </div>
  );
}

export default InfoItem;
