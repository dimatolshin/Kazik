import style from "./PeopleTop.module.scss";
import imgName from "../../assets/png/nameTest.png";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import StarRatingSvg from "../../assets/svg/StarRatingSvg/StarRatingSvg";
import { Button } from "../../ui/Button";

interface arrProps {
  id: string;
  title: string;
  rating: string;
  freespin: string;
  bonus: string;
  img: string;
  link: string;
}

const arr = [
  {
    id: "1",
    title: "Название",
    rating: "5",
    freespin: "50",
    bonus: "400",
    img: imgName,
    link: "",
  },
  {
    id: "2",
    title: "Название",
    rating: "4",
    freespin: "100",
    bonus: "400",
    img: imgName,
    link: "",
  },
  {
    id: "3",
    title: "Название",
    rating: "3",
    freespin: "100",
    bonus: "400",
    img: imgName,
    link: "",
  },

  {
    id: "4",
    title: "",
    rating: "",
    freespin: "",
    bonus: "",
    img: imgName,
    link: "",
  },
  {
    id: "5",
    title: "",
    rating: "",
    freespin: "",
    bonus: "",
    img: imgName,
    link: "",
  },
  {
    id: "6",
    title: "",
    rating: "",
    freespin: "",
    bonus: "",
    img: imgName,
    link: "",
  },

  {
    id: "7",
    title: "",
    rating: "",
    freespin: "",
    bonus: "",
    img: imgName,
    link: "",
  },
  {
    id: "8",
    title: "",
    rating: "",
    freespin: "",
    bonus: "",
    img: imgName,
    link: "",
  },
  {
    id: "9",
    title: "",
    rating: "",
    freespin: "",
    bonus: "",
    img: imgName,
    link: "",
  },
];

function PeopleTop() {
  const chunkArray = (array: arrProps[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };
  const twoDimensionalArr = chunkArray(arr, 3);
  return (
    <div className={style.box}>
      <h2 className={style.title}>People's Top</h2>
      <Swiper spaceBetween={7} slidesPerView={1.1} className={style.swiper}>
        {twoDimensionalArr.map((gtoup, groupIndex) => (
          <SwiperSlide className={style.slide} key={groupIndex}>
            {gtoup.map((item, index) => (
              <div key={item.id} className={style.boxInfoCard}>
                <div className={style.boxBonus}>
                  <div className={style.boxImg}>
                    <img className={style.imgCard} src={item.img} alt="" />
                    <span
                      style={
                        groupIndex * 3 + index + 1 === 1 ? {
                          backgroundColor: "#c9c000",
                        } : {}
                      }
                      className={style.numberValue}
                    >
                      {groupIndex * 3 + index + 1}
                    </span>
                  </div>
                  <div className={style.boxName}>
                    <div className={style.boxInfo}>
                      <h3 className={style.nameTitle}>{item.title}</h3>
                      <StarRatingSvg className={style.imgInfo} />
                      <span className={style.span}>{item.rating}</span>
                    </div>
                    <div className={style.boxBonusInfo}>
                      <p className={style.descr}>{item.bonus}%</p>
                      <p className={style.freespin}>{item.freespin}FS</p>
                    </div>
                  </div>
                </div>
                <Button className={style.btn}>Play</Button>
              </div>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PeopleTop;
