import Banner from "../../components/Banner/Banner";
import OffersWeek from "../../components/OffersWeek/OffersWeek";
import RouletteBonus from "../../components/RouletteBonus/RouletteBonus";
import TopCasino from "../../components/TopCasino/TopCasino";
import style from "./Casino.module.scss";
import img from "../../assets/png/nameTest.png";
import PeopleTop from "../../components/PeopleTop/PeopleTop";

export interface arrProps {
  id: string;
  rating: number;
  imgName: string;
  title: string;
  descr: string;
  link: string;
}

const arr = [
  {
    id: "1",
    rating: 5.0,
    imgName: img,
    title: "1win",
    descr: "До 5$ бесплатно",
    link: "",
  },
  {
    id: "2",
    rating: 5.0,
    imgName: img,
    title: "1win",
    descr: "До 5$ бесплатно",
    link: "",
  },
  {
    id: "3",
    rating: 5.0,
    imgName: img,
    title: "1win",
    descr: "До 5$ бесплатно",
    link: "",
  },
  {
    id: "4",
    rating: 5.0,
    imgName: img,
    title: "1win",
    descr: "До 5$ бесплатно",
    link: "",
  },
  {
    id: "5",
    rating: 5.0,
    imgName: img,
    title: "1win",
    descr: "До 5$ бесплатно",
    link: "",
  },
];

function Casino() {
  return (
    <div className={style.casino}>
      <Banner />
      <PeopleTop />
      <RouletteBonus />
      <OffersWeek />
      <TopCasino title={"TOP-10 Online casino"} arr={arr} />
    </div>
  );
}

export default Casino;
