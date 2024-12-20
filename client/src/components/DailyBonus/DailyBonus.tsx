import style from "./DailyBonus.module.scss";
import imgBg from "../../assets/png/dailyBonus.png";
import LockSvg from "../../assets/svg/LockSvg/LockSvg";
import { data } from "./data";
import img from "../../assets/png/boxBonusSpins.png";
import imgBgPrize from "../../assets/png/bgDaily.png";
import ComplitedDaySvg from "../../assets/svg/ComplitedDaySvg/ComplitedDaySvg";
import imgBgComplit from '../../assets/png/bgDailyComplit.png'
import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import { useSelector } from "react-redux";
import { getDay, getTakeDay } from "../../providers/StoreProvider/selectors/getDaily";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { addDailyBonus } from "../../api/RouletBonus";
import { useTelegram } from "../../providers/telegram/telegram";

function DailyBonus() {
  const {tg_id, tg} = useTelegram()
  const dayBonus = useSelector(getDay)
  const btnActive = useSelector(getTakeDay)
  const [isActive, setIsActive] = useState(false)
  const [currentDay, setCurrentDay] = useState<number>(0)
  const day = data.find((item) => item.day === currentDay)
  const [dayInfo, setDaiInfo] = useState(day)

  useEffect(() => {
    if(btnActive !== undefined && btnActive !== null) {
      setIsActive(btnActive.can_get_daly_bonus)
    }
  }, [btnActive])

  useEffect(() => {
    if(dayBonus) {
      setCurrentDay(dayBonus.day)
    }
  }, [dayBonus])

  useEffect(() => {
    if(day) {
      setDaiInfo(day)
    }
  }, [day])

  const handleDay = (id: string) => {
    const day = data.find((item) => item.id === id)
    setDaiInfo(day)
  }

  const mutateDailyBonus = useMutation({
    mutationFn: (data:{tg_id: string}) => addDailyBonus(data.tg_id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["dailyBonus"]})
      queryClient.invalidateQueries({queryKey: ["freeCase"]})
    },
    onError: () => {

    }
  }, queryClient)

  const handleBonus = () => {
    mutateDailyBonus.mutate({tg_id})
    tg.HapticFeedback.impactOccurred("medium")
  }

  return (
    <div className={style.box}>
      <div className={style.boxTitle}>
        <img className={style.imgTitle} src={imgBg} alt="" />
        <h2 className={style.title}>
          Ежедневный <br /> бонус
        </h2>
      </div>
      <ul className={style.list}>
        {data.map((item) => (
          <li onClick={() => handleDay(item.id)} className={style.item} key={item.id}>
            {currentDay <= item.day ? (
              <img className={style.imgBg} src={imgBgPrize} alt="" />
            ) : (
              <img className={style.imgBg} src={imgBgComplit} alt="" />
            )}
            <div className={style.boxInfo} style={currentDay <= item.day ? {
              top: '48%'
            }: {}}>
              <h2 className={style.titleInfo}>{item.day}</h2>
              <p className={style.descrInfo}>День</p>

              <div className={style.boxImg}>
                {currentDay <= item.day ? (
                  <>
                    <img className={style.imgPrize} src={img} alt="" />
                    <span className={style.countInfo}>x{item.count}</span>
                  </>
                ) : (
                  <ComplitedDaySvg className={style.svg} />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={style.boxMesseg}>
        <p className={style.descrMesseg}>Уведомления</p>
        <LockSvg />
      </div>
      {dayInfo && (
        <div className={style.infoDay}>
          <div className={style.boxTitle}>
           <h1 className={style.titleNumber}>{dayInfo.day}</h1>
           <h2 className={style.titleDay}>День</h2>
          </div>
          <div className={style.boxImgDay}>
            <img className={style.imgDay} src={img} alt="" />
            <span className={style.spanDay}>x{dayInfo.count}</span>
          </div>
          <Button onClick={handleBonus} className={style.btn} isDisabled={currentDay !== dayInfo.day || !isActive || mutateDailyBonus.isPending}>
            Забрать награду
          </Button>
        </div>
      )}
    </div>
  );
}

export default DailyBonus;
