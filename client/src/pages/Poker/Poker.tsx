import { useSelector } from "react-redux";
import Banner from "../../components/Banner/Banner";
import TopCasino from "../../components/TopCasino/TopCasino";
import style from "./Poker.module.scss";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import BonusComponent from "../../components/BonusComponent/BonusComponent";

function Poker() {
  const casino = useSelector(getCasino);
  return (
    <div className={style.poker}>
      <Banner />
      <TopCasino
        title={"ТОП-10 Покерных-комнат"}
        arr={casino ? casino.top_10_casino : []}
      />
      <BonusComponent />
      <TopCasino
        title={"Эксклюзивный бонус"}
        arr={casino ? casino.top_10_casino : []}
      />
      <TopCasino
        title={"Крипто казино"}
        arr={casino ? casino.top_10_casino : []}
      />
    </div>
  );
}

export default Poker;
