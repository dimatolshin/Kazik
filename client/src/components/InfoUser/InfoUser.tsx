import ProfileSvg from "../../assets/svg/ProfileSvg/ProfileSvg";
import { useTelegram } from "../../providers/telegram/telegram";
import style from "./InfoUser.module.scss";

function InfoUser() {
  const { firstName, userName, photo } = useTelegram();
  return (
    <div className={style.box}>
      {photo ? (
        <img className={style.img} src={photo} alt="" />
      ) : (
        <ProfileSvg className={style.img} />
      )}
      <div className={style.boxName}>
        <h2 className={style.title}>{firstName}</h2>
        <p className={style.descr}>@{userName}</p>
      </div>
    </div>
  );
}

export default InfoUser;
