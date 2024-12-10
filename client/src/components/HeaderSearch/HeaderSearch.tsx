import ProfileSvg from "../../assets/svg/ProfileSvg/ProfileSvg";
import SearchSvg from "../../assets/svg/SearchSvg/SearchSvg";
import SettingSvg from "../../assets/svg/SettingSvg/SettingSvg";
import { Button } from "../../ui/Button";
import style from "./HeaderSearch.module.scss";
// import imgTest from '../../assets/png/Rectangle 41623.png'

function HeaderSearch() {
  return (
    <div className={style.box}>
      <div className={style.boxSearch}>
        <div className={style.boxSvg}>
          <SearchSvg className={style.svgSearch} />
        </div>
        <input placeholder="Casino, games, bonuses" className={style.input} type="text" />
      </div>
      <div className={style.boxSetting}>
        <div className={style.boxAvatar}>
            <ProfileSvg className={style.svg} />
            {/* <img src={imgTest} alt="" /> */}
        </div>
        <Button kind="secondary" className={style.btnSetting}>
          <SettingSvg className={style.svgSetting} />
        </Button>
      </div>
    </div>
  );
}

export default HeaderSearch;
