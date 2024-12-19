import { Button } from "../../ui/Button";
import style from "./OffersWeek.module.scss";
// import imgBg from "../../assets/png/bgtest.png";
import ArrowSvg from "../../assets/svg/ArrowSvg/ArrowSvg";
import StarRatingSvg from "../../assets/svg/StarRatingSvg/StarRatingSvg";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import { useTelegram } from "../../providers/telegram/telegram";

function OffersWeek() {
  const casino = useSelector(getCasino);
  const { tg } = useTelegram();
  const swapLink = (link: string) => {
    tg.openLink(link, { try_instant_view: true });
  };
  return (
    <div className={style.box}>
      <h2 className={style.title}>Предложения недели</h2>
      {!casino?.offers_of_week ? (
        <div>Loader...</div>
      ) : (
        <Swiper
          onSlideChange={() => tg.HapticFeedback.impactOccurred("medium")}
          spaceBetween={10}
          slidesPerView={1.1}
          className={style.boxCard}
        >
          {casino.offers_of_week.map((item, index) => (
            <SwiperSlide className={style.slide} key={index}>
              <div className={style.boxSlide}>
                <img
                  className={style.img}
                  src={`https://api.zerkalogm.online${item.banner_url}`}
                  alt=""
                />
                {/* <img className={style.img} src={imgBg} alt="" /> */}
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
                        <span className={style.span}>
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                      <div className={style.boxBonusInfo}>
                        {item.dep && <p className={style.descr}>{item.dep}%</p>}
                        {item.free_spin && (
                          <p className={style.freespin}>{item.free_spin}FS</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => swapLink(item.url)}
                    className={style.btn}
                    kind="secondary"
                  >
                    <ArrowSvg />
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default OffersWeek;
