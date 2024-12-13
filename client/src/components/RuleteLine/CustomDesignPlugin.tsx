import { PrizeType, IDesignPlugin } from "react-roulette-pro";
import style from "./RuleteLine.module.scss";
import PrizeArrowSvg from "../../assets/svg/PrizeArrowSvg/PrizeArrowSvg";

const CustomDesignPlugin = (): IDesignPlugin => {
  return {
    topChildren: (
      <div className={style.prize}>
        <PrizeArrowSvg className={style.topArrow} />
      </div>
    ),
    bottomChildren: (
      <div className={style.prize}>
        <PrizeArrowSvg className={style.bottomArrow} />
      </div>
    ),
    prizeItemWidth: 117,
    prizeItemHeight: 140,
    prizeItemRenderFunction: (item: PrizeType) => (
      <div className={style.wrapper}>
        <img className={style.imgWrap} src={item.image} alt={item.text} />
        <p className={style.descrWrap}>{item.text}</p>
      </div>
    ),
    classes: {
      wrapper: "boxWrapper",
      prizeListWrapper: "listRulete",
      prizeItem: "itemRulete",
    },
  };
};

export default CustomDesignPlugin;
