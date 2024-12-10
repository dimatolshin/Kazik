import { Button } from "../../ui/Button";
import style from "./OffersWeek.module.scss";
import imgBg from "../../assets/png/bgtest.png";
import imgName from "../../assets/png/nameTest.png";
import ArrowSvg from "../../assets/svg/ArrowSvg/ArrowSvg";
import StarRatingSvg from "../../assets/svg/StarRatingSvg/StarRatingSvg";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";

const arr = [
  {
    id: "1",
    imgBg: imgBg,
    imgName: imgName,
    title: "1win",
    rating: 4.8,
    bonus: "400%",
    link: "",
  },
  {
    id: "2",
    imgBg: imgBg,
    imgName: imgName,
    title: "Fonbet",
    rating: 5,
    bonus: "400%",
    link: "",
  },
  {
    id: "3",
    imgBg: imgBg,
    imgName: imgName,
    title: "bet",
    rating: 4.9,
    bonus: "400%",
    link: "",
  },
];

function OffersWeek() {
  const is375 = useMediaQuery({
    query: "(max-width: 375)",
  });
  return (
    <div className={style.box}>
      <h2 className={style.title}>Offers of the week</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={is375 ? 1.3 : 1.1}
        className={style.boxCard}
      >
        {arr.map((item) => (
          <SwiperSlide className={style.slide} key={item.id}>
            <img className={style.img} src={item.imgBg} alt="" />
            <div className={style.boxInfoCard}>
              <div className={style.boxBonus}>
                <img className={style.imgCard} src={item.imgName} alt="" />
                <div className={style.boxName}>
                  <div className={style.boxInfo}>
                    <h3 className={style.nameTitle}>{item.title}</h3>
                    <StarRatingSvg className={style.imgInfo} />
                    <span className={style.span}>{item.rating}</span>
                  </div>
                  <p className={style.descr}>{item.bonus}</p>
                </div>
              </div>
              <Button className={style.btn} kind="secondary">
                <ArrowSvg />
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default OffersWeek;
