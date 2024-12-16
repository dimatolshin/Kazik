import toast from "react-hot-toast";
import { InventoryType } from "../../types/InventoryType";
import { Button } from "../../ui/Button";
import style from "./ItemsProfile.module.scss";

const styles = {
  background: '#181c28',
  color: '#fff',
};

function InfoItem({ item }: { item: InventoryType }) {
    

  const copyToRefLink = async () => {
    try {
      if (item.promo_code) {
        await navigator.clipboard.writeText(item.promo_code);
        toast.success('Ссылка скопирована в буфер обмена', { style: styles })
      }
    } catch (err) {
        toast.error('Ошибка при копировании', { style: styles })
    }
  };

  return (
    <div className={style.boxInfo}>
      {/* <img
          className={style.imgWinner}
          src={`https://api.zerkalogm.online${item.image_without_background_url}`}
          alt=""
        /> */}
      <img
        className={style.imgWinner}
        src={`https://api.zerkalogm.online/${item.image}`}
        alt=""
      />
      <div onClick={copyToRefLink} className={style.boxCopy}>
        <h3 className={style.title}>Click to copy the code</h3>
      </div>
      <a target="_blank" className={style.link} href={item.url_product}>
       <Button className={style.btn}>Activate</Button>
      </a>
    </div>
  );
}

export default InfoItem;
