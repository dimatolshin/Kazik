import Banner from "../../components/Banner/Banner";
import OffersWeek from "../../components/OffersWeek/OffersWeek";
import BonusComponent from "../../components/BonusComponent/BonusComponent";
import TopCasino from "../../components/TopCasino/TopCasino";
import style from "./Casino.module.scss";
import PeopleTop from "../../components/PeopleTop/PeopleTop";
import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";

function Casino() {
  const casino = useSelector(getCasino);
  return (
    <div className={style.casino}>
      <Banner />
      <PeopleTop />
      <BonusComponent />
      <OffersWeek />
      <TopCasino title={"ТОП-10 Онлайн казино"} arr={casino ? casino.top_10_casino : []} />
    </div>
  );
}

export default Casino;
