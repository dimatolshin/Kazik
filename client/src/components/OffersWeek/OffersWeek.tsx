import { Button } from "../../ui/Button";
import style from "./OffersWeek.module.scss";
import imgBg from "../../assets/png/bgtest.png";
import ArrowSvg from "../../assets/svg/ArrowSvg/ArrowSvg";
import StarRatingSvg from "../../assets/svg/StarRatingSvg/StarRatingSvg";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";

function OffersWeek() {
  const casino = useSelector(getCasino);
  const is375 = useMediaQuery({
    query: "(max-width: 375)",
  });
  return (
    <div className={style.box}>
      <h2 className={style.title}>Offers of the week</h2>
      {!casino?.offers_of_week ? (
        <div>Loader...</div>
      ) : (
        <Swiper
          spaceBetween={10}
          slidesPerView={is375 ? 1.3 : 1.1}
          className={style.boxCard}
        >
          {casino.offers_of_week.map((item, index) => (
            <SwiperSlide className={style.slide} key={index}>
              {/* <img className={style.img} src={`https://api.zerkalogm.online${item.banner_url}`} alt="" /> */}
              <img className={style.img} src={imgBg} alt="" />
              <div className={style.boxInfoCard}>
                <div className={style.boxBonus}>
                  <img
                    className={style.imgCard}
                    src={`https://api.zerkalogm.online${item.logo_url}`}
                    alt=""
                  />
                  <div className={style.boxName}>
                    <div className={style.boxInfo}>
                      <h3 className={style.nameTitle}>{item.name}</h3>
                      <StarRatingSvg className={style.imgInfo} />
                      <span className={style.span}>{item.rating}</span>
                    </div>
                    <div className={style.boxBonusInfo}>
                      <p className={style.descr}>{item.dep}%</p>
                      {item.free_spin && (
                        <p className={style.freespin}>{item.free_spin}FS</p>
                      )}
                    </div>
                  </div>
                </div>
                <a className={style.link} href={item.url} target="_blank">
                  <Button className={style.btn} kind="secondary">
                    <ArrowSvg />
                  </Button>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default OffersWeek;
