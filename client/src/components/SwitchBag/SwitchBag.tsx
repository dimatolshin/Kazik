import { useState } from "react";
import style from "./SwitchBag.module.scss";
import SwitchBagOption from "../SwitchBagOption/SwitchBagOption";
import SwitchBox from "../SwitchBagOption/SwitchBox";
import ItemsProfile from "../ItemsProfile/ItemsProfile";
import TasksProfile from "../TasksProfile/TasksProfile";

type BagType = "infentory" | "tasks";

function SwitchBag() {
  const [bagType, setBagType] = useState<BagType>("infentory");

  return (
    <>
      <div className={style.switchBag}>
        <SwitchBox>
          <SwitchBagOption
            title="Inventory"
            isActive={bagType === "infentory"}
            onClick={() => setBagType("infentory")}
            className={style.infentory}
          />
          <SwitchBagOption
            title="Tasks"
            isActive={bagType === "tasks"}
            onClick={() => setBagType("tasks")}
            className={style.task}
          />
        </SwitchBox>
      </div>
      {bagType == "infentory" ? <ItemsProfile /> : <TasksProfile />}
    </>
  );
}

export default SwitchBag;
