import ProfileSvg from "../../assets/svg/ProfileSvg/ProfileSvg";
import SearchSvg from "../../assets/svg/SearchSvg/SearchSvg";
import SettingSvg from "../../assets/svg/SettingSvg/SettingSvg";
import { useTelegram } from "../../providers/telegram/telegram";
import { Button } from "../../ui/Button";
import style from "./HeaderSearch.module.scss";


function HeaderSearch() {
  const {photo} = useTelegram()
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
            {photo ? (
               <img className={style.imgAvatar} src={photo} alt="" /> 
            ) : (
              <ProfileSvg className={style.svg} />
            )}
        </div>
        <Button kind="secondary" className={style.btnSetting}>
          <SettingSvg className={style.svgSetting} />
        </Button>
      </div>
    </div>
  );
}

export default HeaderSearch;
