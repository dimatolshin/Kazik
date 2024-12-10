import BgTopCasinoGreySvg from "../../assets/svg/BgTopCasinoGreySvg/BgTopCasinoGreySvg";
import StarRatingSvg from "../../assets/svg/StarRatingSvg/StarRatingSvg";
import style from "./TopCasino.module.scss";
import { Button } from "../../ui/Button";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import BgTopCasinoYellowSvg from "../../assets/svg/BgTopCasinoYellowSvg/BgTopCasinoYellowSvg";
import BgTopCasinoPurpleSvg from "../../assets/svg/BgTopCasinoPurpleSvg/BgTopCasinoPurpleSvg";
import BgTopCasinoBlueSvg from "../../assets/svg/BgTopCasinoBlueSvg/BgTopCasinoBlueSvg";
import { arrProps } from "../../pages/Casino";

interface TopCasinoProps {
    title: string;
    arr: arrProps[]
}

function TopCasino({title, arr}: TopCasinoProps) {
  return (
    <div className={style.box}>
      <h2 className={style.titleBox}>{title}</h2>
      <Swiper spaceBetween={7} slidesPerView={2.3} className={style.boxCard}>
        {arr.map((item, index) => (
          <SwiperSlide className={style.slide} key={item.id}>
            {index === 0 && <BgTopCasinoYellowSvg className={style.btSvg} />}
            {index === 1 && <BgTopCasinoBlueSvg className={style.btSvg} />}
            {index === 2 && <BgTopCasinoPurpleSvg className={style.btSvg} />}
            {index !== 0 && index !== 1 && index !== 2 && (
              <BgTopCasinoGreySvg className={style.btSvg} />
            )}
            <span className={style.numberCard}>{index + 1}</span>
            <div className={style.boxRating}>
              <StarRatingSvg className={style.ratingSvg} />
              <p className={style.descrSvg}>{item.rating}</p>
            </div>
            <img className={style.imgName} src={item.imgName} alt="" />
            <div className={style.boxName}>
              <h3 className={style.title}>{item.title}</h3>
              <p className={style.descr}>{item.descr}</p>
            </div>
            <Button className={style.btn}>Play</Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopCasino;
