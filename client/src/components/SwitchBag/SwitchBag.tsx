import { useState } from "react";
import style from "./SwitchBag.module.scss";
import SwitchBagOption from "../SwitchBagOption/SwitchBagOption";
import SwitchBox from "../SwitchBagOption/SwitchBox";
import ItemsProfile from "../ItemsProfile/ItemsProfile";
import TasksProfile from "../TasksProfile/TasksProfile";
import LockSvg from "../../assets/svg/LockSvg/LockSvg";

type BagType = "infentory" | "tasks";

function SwitchBag() {
  const [bagType, setBagType] = useState<BagType>("infentory");

  return (
    <>
      <div className={style.switchBag}>
        <SwitchBox>
          <SwitchBagOption
            title="Инвентарь"
            isActive={bagType === "infentory"}
            onClick={() => setBagType("infentory")}
            className={style.infentory}
          />
          <SwitchBagOption
            title="Задания"
            isActive={bagType === "tasks"}
            onClick={() => setBagType("tasks")}
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
