import { useTelegram } from "../../providers/telegram/telegram";
import { filterCasinoType } from "../../types/filterCasino";
import style from "./FilterList.module.scss";

interface FilterListProps {
  filteredData: filterCasinoType[];
}

function FilterList({ filteredData }: FilterListProps) {
  const { tg } = useTelegram();
  const handleLink = (link: string) => {
    tg.HapticFeedback.impactOccurred("medium");
    tg.openLink(link, { try_instant_view: true });
  };
  return (
    <ul className={style.list}>
      {filteredData.map((item) => (
        <li className={style.item} key={item.id}>
          <h1 className={style.title}>{item.title}</h1>
          <ul className={style.listCard}>
            {item.items.map((casino) => (
              <li
                onClick={() => handleLink(casino.url)}
                className={style.itemCard}
                key={casino.id}
              >
                <img
                  className={style.img}
                  src={`https://api.zerkalogm.online/${casino.logo_url}`}
                  alt=""
                />
                <p className={style.descr}>{casino.name}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default FilterList;
