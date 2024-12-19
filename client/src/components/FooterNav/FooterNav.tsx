import { Link, useLocation } from "react-router-dom";
import style from "./FooterNav.module.scss";
import CasionoSvg from "../../assets/svg/CasionoSvg/CasionoSvg";
import BettingSvg from "../../assets/svg/BettingSvg/BettingSvg";
import PokerSvg from "../../assets/svg/PokerSvg/PokerSvg";

const nav = [
  {
    id: "1",
    title: "Казино",
    path: "/",
    img: <CasionoSvg className={style.svg} />,
  },
  {
    id: "2",
    title: "Ставки",
    path: "/betting",
    img: <BettingSvg className={style.svg} />,
  },
  {
    id: "3",
    title: "Покер",
    path: "/poker",
    img: <PokerSvg className={style.svgPoker} />,
  },
];

function FooterNav() {
  const location = useLocation();
  return (
    <div className={style.box}>
      <ul className={style.list}>
        {nav.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            className={`${style.link} ${
              location.pathname === item.path && style.active
            }`}
          >
            <li className={style.item}>
              <div className={style.img}>{item.img}</div>
              <p className={style.descr}>{item.title}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default FooterNav;
