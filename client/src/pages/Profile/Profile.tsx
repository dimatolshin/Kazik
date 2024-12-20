import { useEffect, useState } from "react";
import InfoUser from "../../components/InfoUser/InfoUser";
import SwitchBag from "../../components/SwitchBag/SwitchBag";
import style from "./Profile.module.scss";

function Profile() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`${style.profile} ${isLoaded ? style.fade : ""}`}>
      <InfoUser />
      <SwitchBag />
    </div>
  );
}

export default Profile;
