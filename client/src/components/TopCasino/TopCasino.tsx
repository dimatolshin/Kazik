import BgTopCasinoGreySvg from "../../assets/svg/BgTopCasinoGreySvg/BgTopCasinoGreySvg";
import StarRatingSvg from "../../assets/svg/StarRatingSvg/StarRatingSvg";
import style from "./TopCasino.module.scss";
import { Button } from "../../ui/Button";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import BgTopCasinoYellowSvg from "../../assets/svg/BgTopCasinoYellowSvg/BgTopCasinoYellowSvg";
import BgTopCasinoPurpleSvg from "../../assets/svg/BgTopCasinoPurpleSvg/BgTopCasinoPurpleSvg";
import BgTopCasinoBlueSvg from "../../assets/svg/BgTopCasinoBlueSvg/BgTopCasinoBlueSvg";
import { CasinoCardType } from "../../types/CasinoType";

interface TopCasinoProps {
  title: string;
  arr: CasinoCardType[];
}

function TopCasino({ title, arr }: TopCasinoProps) {
  return (
    <div className={style.box}>
      <h2 className={style.titleBox}>{title}</h2>
      {arr.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Swiper spaceBetween={7} slidesPerView={2.4} className={style.boxCard}>
          {arr.map((item, index) => (
            <SwiperSlide className={style.slide} key={index}>
              <div className={style.boxSlide}>
                {index === 0 && (
                  <BgTopCasinoYellowSvg className={style.btSvg} />
                )}
                {index === 1 && <BgTopCasinoBlueSvg className={style.btSvg} />}
                {index === 2 && (
                  <BgTopCasinoPurpleSvg className={style.btSvg} />
                )}
                {index !== 0 && index !== 1 && index !== 2 && (
                  <BgTopCasinoGreySvg className={style.btSvg} />
                )}
                <span className={style.numberCard}>{index + 1}</span>
                <div className={style.boxRating}>
                  <StarRatingSvg className={style.ratingSvg} />
                  <p className={style.descrSvg}>{item.rating.toFixed(1)}</p>
                </div>
                <img
                  className={style.imgName}
                  src={`https://api.zerkalogm.online${item.logo_url}`}
                  alt=""
                />
                <div className={style.boxName}>
                  <h3 className={style.title}>{item.name}</h3>
                  {(item.dep && item.free_spin) && (
                    <p className={style.descr}>{item.dep}% {item.free_spin}FS</p>
                  )}
                </div>
                <a href={item.url} target="_blank">
                  <Button className={style.btn}>Играть</Button>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default TopCasino;
