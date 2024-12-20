import { useQuery } from "@tanstack/react-query";
import { createEmptySlots } from "../../helpers/createEmptySlotsInventory";
import style from "./ItemsProfile.module.scss";
import { queryClient } from "../../api/queryClient";
import { inventoryUser } from "../../api/userInfo";
import { useTelegram } from "../../providers/telegram/telegram";
import { useEffect, useState } from "react";
import { InventoryType } from "../../types/InventoryType";
import Modal from "../../ui/Modal/Modal";
import InfoItem from "./InfoItem";
import imgEmpty from "../../assets/png/emptySlots.png";
import LoaderContent from "../../ui/Loader/LoaderContent/LoaderContent";

const ITEMS_COUNT = 12;
const MIN_EMPTY_SLOTS = 3;

function ItemsProfile() {
  const { tg_id, tg } = useTelegram();
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoItems, setInfoItems] = useState<InventoryType>();

  const inventoryQuery = useQuery(
    {
      queryFn: () => inventoryUser(tg_id),
      queryKey: ["inventory"],
    },
    queryClient
  );

  useEffect(() => {
    if (inventoryQuery.data) {
      setData(inventoryQuery.data);
    }
  }, [inventoryQuery.data]);
  const inventoryItems: InventoryType[] = data
    ? createEmptySlots(data, ITEMS_COUNT, MIN_EMPTY_SLOTS)
    : [];

  const handleOpen = (id: string | number) => {
    tg.HapticFeedback.impactOccurred("medium");
    setIsOpen(true);
    const items = inventoryItems.find((item) => item.id === id);
    setInfoItems(items);
  };

  const handleClose = () => {
    tg.HapticFeedback.impactOccurred("medium");
    setIsOpen(false);
    setInfoItems(undefined);
  };

  return (
    <>
      <div className={style.box}>
        <h2 className={style.title}>Предметы</h2>
        {inventoryQuery.isPending ? (
          <LoaderContent className={style.loader} />
        ) : (
          <ul className={style.list}>
            {inventoryItems.map((item) => (
              <li
                onClick={!item.filled ? () => handleOpen(item.id) : () => {}}
                className={style.item}
                key={item.id}
              >
                {item.image && (
                  <img
                    src={`https://api.zerkalogm.online/${item.image}`}
                    alt=""
                  />
                )}
                {item.filled && (
                  <img src={imgEmpty} className={style.emptySlots} />
                )}
                {!item.filled && <p className={style.descr}>{item.text}</p>}
                {!item.filled && (
                  <p className={style.descrInfo}>{item.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal isOpen={isOpen} isSpecial closeBtn onClose={handleClose}>
        {infoItems && <InfoItem item={infoItems} />}
      </Modal>
    </>
  );
}

export default ItemsProfile;
