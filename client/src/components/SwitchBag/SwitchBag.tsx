import { useState } from "react";
import style from "./SwitchBag.module.scss";
import SwitchBagOption from "../SwitchBagOption/SwitchBagOption";
import SwitchBox from "../SwitchBagOption/SwitchBox";
import ItemsProfile from "../ItemsProfile/ItemsProfile";
import TasksProfile from "../TasksProfile/TasksProfile";
import LockSvg from "../../assets/svg/LockSvg/LockSvg";
import { useTelegram } from "../../providers/telegram/telegram";

type BagType = "infentory" | "tasks";

function SwitchBag() {
  const [bagType, setBagType] = useState<BagType>("infentory");
  const { tg } = useTelegram();
  return (
    <>
      <div className={style.switchBag}>
        <SwitchBox>
          <SwitchBagOption
            title="Инвентарь"
            isActive={bagType === "infentory"}
            onClick={() => {
              tg.HapticFeedback.impactOccurred("medium");
              setBagType("infentory");
            }}
            className={style.infentory}
          />
          <SwitchBagOption
            title="Задания"
            isActive={bagType === "tasks"}
            onClick={() => {
              tg.HapticFeedback.impactOccurred("medium");
              setBagType("tasks");
            }}
            className={style.task}
            isDisabled={true}
            img={<LockSvg className={style.lockSvg} />}
          />
        </SwitchBox>
      </div>
      {bagType == "infentory" ? <ItemsProfile /> : <TasksProfile />}
    </>
  );
}

export default SwitchBag;
