import style from "./PeopleTop.module.scss";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import StarRatingSvg from "../../assets/svg/StarRatingSvg/StarRatingSvg";
import { Button } from "../../ui/Button";
import { useSelector } from "react-redux";
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino";
import { CasinoCardType } from "../../types/CasinoType";

function PeopleTop() {
  const casino = useSelector(getCasino);

  const chunkArray = (array: CasinoCardType[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const twoDimensionalArr = casino?.peoples_top
    ? chunkArray(casino.peoples_top, 3)
    : [];
  return (
    <div className={style.box}>
      <h2 className={style.title}>People's Top</h2>
      {twoDimensionalArr.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Swiper spaceBetween={7} slidesPerView={1.1} className={style.swiper}>
          {twoDimensionalArr.map((gtoup, groupIndex) => (
            <SwiperSlide className={style.slide} key={groupIndex}>
              {gtoup.map((item, index) => (
                <div key={index} className={style.boxInfoCard}>
                  <div className={style.boxBonus}>
                    <div className={style.boxImg}>
                      <img
                        className={style.imgCard}
                        src={`https://api.zerkalogm.online${item.logo_url}`}
                        alt=""
                      />
                      <span
                        style={
                          groupIndex * 3 + index + 1 === 1
                            ? {
                                backgroundColor: "#c9c000",
                              }
                            : {}
                        }
                        className={style.numberValue}
                      >
                        {groupIndex * 3 + index + 1}
                      </span>
                    </div>
                    <div className={style.boxName}>
                      <div className={style.boxInfo}>
                        <h3 className={style.nameTitle}>{item.name}</h3>
                      </div>
                      <div className={style.boxBonusInfo}>
                        <StarRatingSvg className={style.imgInfo} />
                        <span className={style.span}>
                          {item.rating.toFixed(1)}
                        </span>
                        {item.dep && <p className={style.descr}>{item.dep}%</p>}
                        {item.free_spin && (
                          <p className={style.freespin}>{item.free_spin}FS</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <a className={style.link} href={item.url} target="_blank">
                    <Button className={style.btn}>Play</Button>
                  </a>
                </div>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default PeopleTop;
